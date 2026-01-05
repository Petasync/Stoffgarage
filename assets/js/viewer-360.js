// STOFFGARAGE - 360 Degree Product Viewer
// Interactive 360-degree product rotation

class Viewer360 {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      frameCount: options.frameCount || 36, // Number of frames in 360 rotation
      autoRotate: options.autoRotate || false,
      autoRotateSpeed: options.autoRotateSpeed || 50,
      imagePath: options.imagePath || 'assets/images/360/',
      imagePrefix: options.imagePrefix || 'frame-',
      imageExtension: options.imageExtension || '.svg',
      ...options
    };

    this.currentFrame = 0;
    this.isRotating = false;
    this.isDragging = false;
    this.startX = 0;
    this.rotation = 0;
    this.autoRotateInterval = null;

    this.init();
  }

  init() {
    this.createViewer();
    this.preloadImages();
    this.setupEventListeners();

    if (this.options.autoRotate) {
      this.startAutoRotate();
    }
  }

  createViewer() {
    this.container.innerHTML = `
      <div class="viewer-360-container">
        <div class="viewer-360-canvas" id="canvas-${this.container.id}">
          <div class="viewer-360-frame" id="frame-${this.container.id}"></div>
          <div class="viewer-360-loading">
            <div class="spinner"></div>
            <p style="color:var(--text-secondary);margin-top:1rem;text-transform:uppercase;letter-spacing:0.05em;">LÄDT...</p>
          </div>
        </div>
        <div class="viewer-controls">
          <button class="viewer-btn" id="rotate-left-${this.container.id}" title="Links drehen">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:20px;height:20px;">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button class="viewer-btn" id="auto-rotate-${this.container.id}" title="Auto-Rotation">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:20px;height:20px;">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
          <button class="viewer-btn" id="rotate-right-${this.container.id}" title="Rechts drehen">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:20px;height:20px;">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          <button class="viewer-btn" id="fullscreen-${this.container.id}" title="Vollbild">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:20px;height:20px;">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
            </svg>
          </button>
        </div>
        <div class="viewer-info">
          <span style="color:var(--text-muted);font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;">
            ZIEHEN ZUM DREHEN • FRAME <span id="frame-counter-${this.container.id}">1</span>/${this.options.frameCount}
          </span>
        </div>
      </div>
    `;

    this.canvas = document.getElementById(`canvas-${this.container.id}`);
    this.frameDisplay = document.getElementById(`frame-${this.container.id}`);
    this.loadingIndicator = this.canvas.querySelector('.viewer-360-loading');
    this.frameCounter = document.getElementById(`frame-counter-${this.container.id}`);
  }

  preloadImages() {
    // For demo, we'll generate SVG frames dynamically
    this.updateFrame(0);
    this.hideLoading();
  }

  hideLoading() {
    if (this.loadingIndicator) {
      this.loadingIndicator.style.display = 'none';
    }
  }

  setupEventListeners() {
    // Mouse events
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));

    // Touch events
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    document.addEventListener('touchmove', this.handleTouchMove.bind(this));
    document.addEventListener('touchend', this.handleMouseUp.bind(this));

    // Control buttons
    const rotateLeft = document.getElementById(`rotate-left-${this.container.id}`);
    const rotateRight = document.getElementById(`rotate-right-${this.container.id}`);
    const autoRotate = document.getElementById(`auto-rotate-${this.container.id}`);
    const fullscreen = document.getElementById(`fullscreen-${this.container.id}`);

    if (rotateLeft) rotateLeft.addEventListener('click', () => this.rotateBy(-1));
    if (rotateRight) rotateRight.addEventListener('click', () => this.rotateBy(1));
    if (autoRotate) autoRotate.addEventListener('click', () => this.toggleAutoRotate());
    if (fullscreen) fullscreen.addEventListener('click', () => this.toggleFullscreen());
  }

  handleMouseDown(e) {
    this.isDragging = true;
    this.startX = e.clientX;
    this.canvas.style.cursor = 'grabbing';
    this.stopAutoRotate();
  }

  handleMouseMove(e) {
    if (!this.isDragging) return;

    const deltaX = e.clientX - this.startX;
    const sensitivity = 5; // Pixels per frame

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      this.rotateBy(direction);
      this.startX = e.clientX;
    }
  }

  handleMouseUp() {
    this.isDragging = false;
    this.canvas.style.cursor = 'grab';
  }

  handleTouchStart(e) {
    this.isDragging = true;
    this.startX = e.touches[0].clientX;
    this.stopAutoRotate();
  }

  handleTouchMove(e) {
    if (!this.isDragging) return;

    const deltaX = e.touches[0].clientX - this.startX;
    const sensitivity = 5;

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      this.rotateBy(direction);
      this.startX = e.touches[0].clientX;
    }
  }

  rotateBy(direction) {
    this.currentFrame = (this.currentFrame + direction + this.options.frameCount) % this.options.frameCount;
    this.updateFrame(this.currentFrame);
  }

  updateFrame(frameIndex) {
    // Calculate rotation angle
    const angle = (frameIndex / this.options.frameCount) * 360;

    // Generate or display frame
    this.frameDisplay.innerHTML = this.generateCarSVG(angle);

    // Update counter
    if (this.frameCounter) {
      this.frameCounter.textContent = frameIndex + 1;
    }
  }

  generateCarSVG(angle) {
    // Generate a simple car SVG that rotates
    // This is a simplified version - in production, you'd use actual 360° images
    const rotation = angle;
    const perspective = Math.cos((angle * Math.PI) / 180);
    const scaleX = 0.3 + Math.abs(perspective) * 0.7;

    return `
      <svg viewBox="0 0 200 100" style="width:100%;height:100%;transform:rotateY(${rotation}deg);transform-style:preserve-3d;">
        <defs>
          <linearGradient id="carGradient-${angle}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:var(--accent-primary);stop-opacity:1" />
            <stop offset="100%" style="stop-color:var(--accent-dark);stop-opacity:1" />
          </linearGradient>
        </defs>

        <!-- Car body -->
        <g transform="translate(100, 50) scale(${scaleX}, 1)">
          <!-- Main body -->
          <rect x="-40" y="-15" width="80" height="25" fill="url(#carGradient-${angle})" stroke="var(--border-color)" stroke-width="2"/>

          <!-- Roof -->
          <path d="M -20 -15 L -10 -30 L 20 -30 L 30 -15 Z" fill="var(--accent-dark)" stroke="var(--border-color)" stroke-width="2"/>

          <!-- Windows -->
          <rect x="-15" y="-28" width="15" height="12" fill="var(--bg-primary)" opacity="0.7"/>
          <rect x="5" y="-28" width="20" height="12" fill="var(--bg-primary)" opacity="0.7"/>

          <!-- Wheels -->
          <circle cx="-25" cy="10" r="8" fill="var(--bg-primary)" stroke="var(--border-color)" stroke-width="2"/>
          <circle cx="25" cy="10" r="8" fill="var(--bg-primary)" stroke="var(--border-color)" stroke-width="2"/>
          <circle cx="-25" cy="10" r="4" fill="var(--accent-primary)"/>
          <circle cx="25" cy="10" r="4" fill="var(--accent-primary)"/>

          <!-- Details -->
          <rect x="-42" y="-5" width="8" height="3" fill="var(--warning)" opacity="0.8"/>
          <rect x="34" y="-5" width="8" height="3" fill="var(--error)" opacity="0.8"/>

          <!-- Side panels -->
          <line x1="-15" y1="-15" x2="-15" y2="10" stroke="var(--border-color)" stroke-width="1"/>
          <line x1="10" y1="-15" x2="10" y2="10" stroke="var(--border-color)" stroke-width="1"/>
        </g>

        <!-- Shadow -->
        <ellipse cx="100" cy="65" rx="${50 * scaleX}" ry="5" fill="rgba(0,0,0,0.3)"/>
      </svg>
    `;
  }

  startAutoRotate() {
    if (this.autoRotateInterval) return;

    this.autoRotateInterval = setInterval(() => {
      this.rotateBy(1);
    }, this.options.autoRotateSpeed);

    const autoRotateBtn = document.getElementById(`auto-rotate-${this.container.id}`);
    if (autoRotateBtn) {
      autoRotateBtn.style.background = 'var(--accent-primary)';
    }
  }

  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;

      const autoRotateBtn = document.getElementById(`auto-rotate-${this.container.id}`);
      if (autoRotateBtn) {
        autoRotateBtn.style.background = 'var(--bg-card)';
      }
    }
  }

  toggleAutoRotate() {
    if (this.autoRotateInterval) {
      this.stopAutoRotate();
    } else {
      this.startAutoRotate();
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen().catch(err => {
        console.error('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }

  destroy() {
    this.stopAutoRotate();
    this.container.innerHTML = '';
  }
}

// Export for global use
window.Viewer360 = Viewer360;
