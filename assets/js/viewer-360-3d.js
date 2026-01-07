// STOFFGARAGE - Interactive 3D Car Viewer with Three.js
// Shows realistic 3D car models with cover overlay

class Viewer3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      modelPath: options.modelPath || 'assets/models/cars/',
      coverPath: options.coverPath || 'assets/models/covers/',
      autoRotate: options.autoRotate !== undefined ? options.autoRotate : true,
      autoRotateSpeed: options.autoRotateSpeed || 0.5,
      enableZoom: options.enableZoom !== undefined ? options.enableZoom : true,
      ...options
    };

    // Current state
    this.selectedCar = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.carModel = null;
    this.coverModel = null;
    this.isLoading = false;
    this.showCover = true;

    this.init();
  }

  async init() {
    this.createContainer();
    this.createCarSelector();
    await this.loadThreeJS();
    this.setupScene();
    this.setupLighting();
    this.setupControls();
    this.animate();
  }

  createContainer() {
    this.container.innerHTML = `
      <div class="viewer-3d-wrapper">
        <!-- Car Selection -->
        <div class="viewer-3d-selector">
          <div class="selector-header">
            <h3>FAHRZEUG WÄHLEN</h3>
            <p style="color:var(--text-secondary);font-size:0.875rem;">Sehen Sie wie die Abdeckung auf Ihrem Auto aussieht</p>
          </div>
          <div class="selector-search">
            <input
              type="text"
              id="viewer-car-search"
              class="car-search-input"
              placeholder="AUTO SUCHEN..."
              autocomplete="off"
            />
            <div id="viewer-car-results" class="car-search-results"></div>
          </div>
          <div id="viewer-selected-car" class="selected-car-info"></div>
        </div>

        <!-- 3D Canvas -->
        <div class="viewer-3d-canvas-container">
          <canvas id="viewer-3d-canvas"></canvas>
          <div class="viewer-3d-loading" id="viewer-3d-loading">
            <div class="spinner"></div>
            <p style="color:var(--text-secondary);margin-top:1rem;text-transform:uppercase;letter-spacing:0.05em;">3D-MODELL LÄDT...</p>
          </div>
          <div class="viewer-3d-hint" id="viewer-3d-hint">
            <p style="color:var(--text-muted);font-size:0.75rem;text-transform:uppercase;">
              ZIEHEN ZUM DREHEN • SCROLLEN ZUM ZOOMEN
            </p>
          </div>
        </div>

        <!-- Controls -->
        <div class="viewer-3d-controls">
          <button class="viewer-btn" id="toggle-cover" title="Abdeckung ein/aus">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:20px;height:20px;">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <span style="margin-left:0.5rem;">ABDECKUNG</span>
          </button>
          <button class="viewer-btn" id="reset-view" title="Ansicht zurücksetzen">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:20px;height:20px;">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span style="margin-left:0.5rem;">RESET</span>
          </button>
          <button class="viewer-btn" id="toggle-rotation" title="Auto-Rotation">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:20px;height:20px;">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span style="margin-left:0.5rem;">AUTO-DREHEN</span>
          </button>
        </div>
      </div>
    `;

    this.canvas = document.getElementById('viewer-3d-canvas');
    this.loadingIndicator = document.getElementById('viewer-3d-loading');
    this.hint = document.getElementById('viewer-3d-hint');
  }

  createCarSelector() {
    const searchInput = document.getElementById('viewer-car-search');
    const resultsContainer = document.getElementById('viewer-car-results');

    if (!searchInput || !resultsContainer) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();

      if (query.length < 2) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        return;
      }

      if (typeof searchModels === 'function') {
        const results = searchModels(query);
        this.displaySearchResults(results, resultsContainer);
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.style.display = 'none';
      }
    });
  }

  displaySearchResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<div style="padding:1rem;color:var(--text-muted);">Kein Fahrzeug gefunden</div>';
      container.style.display = 'block';
      return;
    }

    let html = '';
    results.forEach(group => {
      group.models.forEach(model => {
        const bodyType = model.bodyType || 'sedan';
        html += `
          <div class="search-result-item viewer-car-option"
               data-make="${model.make}"
               data-model="${model.model}"
               data-length="${model.length}"
               data-bodytype="${bodyType}"
               data-size="${group.size}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <div style="font-weight:700;color:var(--text-primary);">${model.make} ${model.model}</div>
                <div style="font-size:0.875rem;color:var(--text-secondary);">
                  ${model.length}cm • ${group.size} • ${this.getBodyTypeLabel(bodyType)}
                </div>
              </div>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:20px;height:20px;color:var(--accent-primary);">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        `;
      });
    });

    container.innerHTML = html;
    container.style.display = 'block';

    // Add click handlers
    container.querySelectorAll('.viewer-car-option').forEach(item => {
      item.addEventListener('click', () => {
        this.selectCar({
          make: item.dataset.make,
          model: item.dataset.model,
          length: parseInt(item.dataset.length),
          bodyType: item.dataset.bodytype,
          size: item.dataset.size
        });
        container.style.display = 'none';
      });
    });
  }

  getBodyTypeLabel(bodyType) {
    const labels = {
      'sedan': 'Limousine',
      'hatchback': 'Kleinwagen',
      'wagon': 'Kombi',
      'suv': 'SUV',
      'van': 'Van',
      'pickup': 'Pickup'
    };
    return labels[bodyType] || bodyType.toUpperCase();
  }

  async selectCar(car) {
    this.selectedCar = car;

    // Update UI
    document.getElementById('viewer-car-search').value = `${car.make} ${car.model}`;
    const selectedInfo = document.getElementById('viewer-selected-car');
    selectedInfo.innerHTML = `
      <div style="padding:1rem;background:var(--bg-secondary);border:2px solid var(--accent-primary);margin-top:1rem;">
        <div style="font-weight:700;margin-bottom:0.5rem;color:var(--accent-primary);text-transform:uppercase;font-size:0.875rem;">
          AUSGEWÄHLTES FAHRZEUG
        </div>
        <div style="color:var(--text-primary);font-size:1.125rem;font-weight:700;margin-bottom:0.25rem;">
          ${car.make} ${car.model}
        </div>
        <div style="color:var(--text-secondary);font-size:0.875rem;">
          ${car.length}cm • Empfohlene Größe: ${car.size}
        </div>
      </div>
    `;

    // Load 3D model
    await this.load3DModel(car.bodyType);
  }

  async loadThreeJS() {
    return new Promise((resolve, reject) => {
      if (window.THREE) {
        resolve();
        return;
      }

      // Load Three.js from CDN
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
      script.type = 'module';
      script.onload = () => {
        // Also load OrbitControls and GLTFLoader
        import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js')
          .then(module => {
            window.OrbitControls = module.OrbitControls;
            return import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js');
          })
          .then(module => {
            window.GLTFLoader = module.GLTFLoader;
            resolve();
          })
          .catch(reject);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async setupScene() {
    // Dynamic import of Three.js
    const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
    window.THREE = THREE;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    // Camera
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(5, 2, 5);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;

    // Handle resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  setupLighting() {
    const THREE = window.THREE;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Additional fill lights
    const fillLight1 = new THREE.DirectionalLight(0x6b6b6b, 0.4);
    fillLight1.position.set(-5, 5, -5);
    this.scene.add(fillLight1);

    const fillLight2 = new THREE.DirectionalLight(0x8a8a8a, 0.3);
    fillLight2.position.set(0, -5, 0);
    this.scene.add(fillLight2);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  async setupControls() {
    const { OrbitControls } = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js');

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = this.options.enableZoom;
    this.controls.autoRotate = this.options.autoRotate;
    this.controls.autoRotateSpeed = this.options.autoRotateSpeed;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 15;
    this.controls.maxPolarAngle = Math.PI / 2;

    // Setup control buttons
    document.getElementById('toggle-cover')?.addEventListener('click', () => this.toggleCover());
    document.getElementById('reset-view')?.addEventListener('click', () => this.resetView());
    document.getElementById('toggle-rotation')?.addEventListener('click', () => this.toggleRotation());
  }

  async load3DModel(bodyType) {
    if (this.isLoading) return;

    this.isLoading = true;
    this.showLoading();

    try {
      const { GLTFLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js');
      const loader = new GLTFLoader();

      // Remove existing models
      if (this.carModel) {
        this.scene.remove(this.carModel);
        this.carModel = null;
      }
      if (this.coverModel) {
        this.scene.remove(this.coverModel);
        this.coverModel = null;
      }

      // Determine model file
      const modelFile = `${bodyType}.glb`; // e.g., sedan.glb, suv.glb
      const modelPath = this.options.modelPath + modelFile;

      // Load car model (with fallback to placeholder if file doesn't exist)
      try {
        const gltf = await this.loadGLTF(loader, modelPath);
        this.carModel = gltf.scene;
        this.carModel.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        this.scene.add(this.carModel);
      } catch (error) {
        console.warn('3D model not found, using placeholder:', error);
        this.createPlaceholderCar(bodyType);
      }

      // Load cover model
      this.createCoverOverlay();

      this.hideLoading();
      this.isLoading = false;

    } catch (error) {
      console.error('Error loading 3D model:', error);
      this.createPlaceholderCar(bodyType);
      this.hideLoading();
      this.isLoading = false;
    }
  }

  loadGLTF(loader, path) {
    return new Promise((resolve, reject) => {
      loader.load(
        path,
        (gltf) => resolve(gltf),
        (progress) => console.log('Loading:', (progress.loaded / progress.total * 100) + '%'),
        (error) => reject(error)
      );
    });
  }

  createPlaceholderCar(bodyType) {
    const THREE = window.THREE;

    // Create a simple car placeholder based on body type
    const group = new THREE.Group();

    // Car body
    const bodyGeometry = bodyType === 'suv' || bodyType === 'van' || bodyType === 'pickup'
      ? new THREE.BoxGeometry(2, 1.2, 4)
      : new THREE.BoxGeometry(1.8, 0.8, 4);

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x6b6b6b,
      metalness: 0.7,
      roughness: 0.3
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Windows (roof)
    const windowHeight = bodyType === 'suv' || bodyType === 'van' ? 0.8 : 0.6;
    const windowGeometry = new THREE.BoxGeometry(1.6, windowHeight, 2);
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.1,
      opacity: 0.3,
      transparent: true
    });
    const windows = new THREE.Mesh(windowGeometry, windowMaterial);
    windows.position.y = bodyType === 'suv' || bodyType === 'van' ? 1.1 : 0.9;
    windows.position.z = 0.5;
    group.add(windows);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.5,
      roughness: 0.7
    });

    const positions = [
      { x: -1.1, z: -1.3 },
      { x: 1.1, z: -1.3 },
      { x: -1.1, z: 1.3 },
      { x: 1.1, z: 1.3 }
    ];

    positions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos.x, 0.35, pos.z);
      wheel.castShadow = true;
      group.add(wheel);
    });

    this.carModel = group;
    this.scene.add(this.carModel);
  }

  createCoverOverlay() {
    const THREE = window.THREE;

    if (!this.carModel) return;

    // Create a semi-transparent cover over the car
    const coverGeometry = new THREE.BoxGeometry(2.2, 1.5, 4.5);
    const coverMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a8a8a,
      metalness: 0.2,
      roughness: 0.8,
      opacity: 0.7,
      transparent: true,
      side: THREE.DoubleSide
    });

    this.coverModel = new THREE.Mesh(coverGeometry, coverMaterial);
    this.coverModel.position.y = 0.7;
    this.coverModel.visible = this.showCover;
    this.scene.add(this.coverModel);
  }

  toggleCover() {
    this.showCover = !this.showCover;
    if (this.coverModel) {
      this.coverModel.visible = this.showCover;
    }
    const btn = document.getElementById('toggle-cover');
    if (btn) {
      btn.style.background = this.showCover ? 'var(--accent-primary)' : 'var(--bg-card)';
    }
  }

  resetView() {
    this.camera.position.set(5, 2, 5);
    this.camera.lookAt(0, 0, 0);
    if (this.controls) {
      this.controls.reset();
    }
  }

  toggleRotation() {
    if (this.controls) {
      this.controls.autoRotate = !this.controls.autoRotate;
      const btn = document.getElementById('toggle-rotation');
      if (btn) {
        btn.style.background = this.controls.autoRotate ? 'var(--accent-primary)' : 'var(--bg-card)';
      }
    }
  }

  showLoading() {
    if (this.loadingIndicator) {
      this.loadingIndicator.style.display = 'flex';
    }
    if (this.hint) {
      this.hint.style.display = 'none';
    }
  }

  hideLoading() {
    if (this.loadingIndicator) {
      this.loadingIndicator.style.display = 'none';
    }
    if (this.hint) {
      this.hint.style.display = 'block';
    }
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;

    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.controls) {
      this.controls.update();
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.controls) {
      this.controls.dispose();
    }
    this.container.innerHTML = '';
  }
}

// Export for global use
window.Viewer3D = Viewer3D;
