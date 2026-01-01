// STOFFGARAGE - Product Configurator
// Handles product filtering, selection, and configurator functionality

class ProductConfigurator {
  constructor(category) {
    this.category = category;
    this.currentProducts = products[category] || [];
    this.selectedQuality = null;
    this.selectedSize = null;
    this.selectedVehicleType = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadFromURL();
    this.renderProducts();
    this.updatePreview();
  }

  setupEventListeners() {
    // Quality selection
    const qualityInputs = document.querySelectorAll('input[name="quality"]');
    qualityInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        this.selectedQuality = e.target.value;
        this.updateSelection();
      });
    });

    // Size selection
    const sizeSelect = document.getElementById('size-select');
    if (sizeSelect) {
      sizeSelect.addEventListener('change', (e) => {
        this.selectedSize = e.target.value;
        this.updateSelection();
      });
    }

    // Vehicle type selection (for hagelschutz)
    const vehicleTypeSelect = document.getElementById('vehicle-type-select');
    if (vehicleTypeSelect) {
      vehicleTypeSelect.addEventListener('change', (e) => {
        this.selectedVehicleType = e.target.value;
        this.updateSelection();
      });
    }

    // Request button
    const requestButton = document.getElementById('request-product');
    if (requestButton) {
      requestButton.addEventListener('click', () => {
        this.handleProductRequest();
      });
    }
  }

  loadFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('quality')) {
      this.selectedQuality = urlParams.get('quality');
      const qualityInput = document.querySelector(`input[name="quality"][value="${this.selectedQuality}"]`);
      if (qualityInput) {
        qualityInput.checked = true;
      }
    }

    if (urlParams.has('size')) {
      this.selectedSize = urlParams.get('size');
      const sizeSelect = document.getElementById('size-select');
      if (sizeSelect) {
        sizeSelect.value = this.selectedSize;
      }
    }

    if (urlParams.has('vehicleType')) {
      this.selectedVehicleType = urlParams.get('vehicleType');
      const vehicleTypeSelect = document.getElementById('vehicle-type-select');
      if (vehicleTypeSelect) {
        vehicleTypeSelect.value = this.selectedVehicleType;
      }
    }
  }

  updateSelection() {
    this.renderProducts();
    this.updatePreview();
    this.updateURL();
  }

  updateURL() {
    const params = new URLSearchParams();

    if (this.selectedQuality) params.set('quality', this.selectedQuality);
    if (this.selectedSize) params.set('size', this.selectedSize);
    if (this.selectedVehicleType) params.set('vehicleType', this.selectedVehicleType);

    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newURL);
  }

  filterProducts() {
    let filtered = this.currentProducts;

    if (this.selectedQuality) {
      filtered = filtered.filter(p => p.quality === this.selectedQuality);
    }

    if (this.selectedSize) {
      filtered = filtered.filter(p => p.size === this.selectedSize);
    }

    if (this.selectedVehicleType) {
      filtered = filtered.filter(p => p.vehicleType === this.selectedVehicleType);
    }

    return filtered;
  }

  renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    const filtered = this.filterProducts();

    // Clear existing products
    productsGrid.innerHTML = '';

    // Show all products if no filters applied
    const productsToShow = filtered.length > 0 ? filtered : this.currentProducts;

    if (productsToShow.length === 0) {
      productsGrid.innerHTML = '<p class="text-center" style="grid-column: 1/-1; color: var(--text-secondary);">Keine Produkte gefunden. Bitte ändern Sie Ihre Filterauswahl.</p>';
      return;
    }

    productsToShow.forEach(product => {
      const card = this.createProductCard(product);
      productsGrid.appendChild(card);
    });

    // Highlight selected product
    this.highlightSelectedProduct();
  }

  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    card.dataset.quality = product.quality;
    card.dataset.size = product.size;

    // Build features HTML
    const featuresHTML = product.features.map(feature => {
      const iconPath = featureIcons[feature] || featureIcons['wasserdicht'];
      return `
        <div class="feature-badge">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${iconPath}
          </svg>
          <span>${this.getFeatureLabel(feature)}</span>
        </div>
      `;
    }).join('');

    card.innerHTML = `
      <div class="product-image">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${this.getCategoryIcon()}
        </svg>
        <div class="product-badge">${product.quality}</div>
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.quality}</h3>
        <p class="product-size">${product.size}</p>
        <div class="product-features">
          ${featuresHTML}
        </div>
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem;">
          ${product.description}
        </p>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">
          <strong>Material:</strong> ${product.material}
        </p>
        <button class="btn btn-primary" onclick="selectProduct('${product.id}')">
          Jetzt anfragen
        </button>
      </div>
    `;

    return card;
  }

  getCategoryIcon() {
    const icons = {
      auto: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>',
      van: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
      pickup: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>',
      wohnmobil: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
      hagelschutz: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>'
    };

    return icons[this.category] || icons.auto;
  }

  getFeatureLabel(feature) {
    const labels = {
      'wasserdicht': 'Wasserdicht',
      'uv-schutz': 'UV-Schutz',
      'atmungsaktiv': 'Atmungsaktiv',
      'kratzfest': 'Kratzfest',
      'elastisch': 'Elastisch',
      'softtouch': 'Soft Touch',
      'premium-finish': 'Premium',
      'seitliche-oeffnung': 'Seitliche Öffnung',
      'hagelschutz-klasse-3': 'Klasse 3'
    };

    return labels[feature] || feature;
  }

  highlightSelectedProduct() {
    const allCards = document.querySelectorAll('.product-card');

    allCards.forEach(card => {
      card.classList.remove('selected');

      const matchesQuality = !this.selectedQuality || card.dataset.quality === this.selectedQuality;
      const matchesSize = !this.selectedSize || card.dataset.size === this.selectedSize;

      if (matchesQuality && matchesSize && (this.selectedQuality || this.selectedSize)) {
        card.classList.add('selected');
      }
    });
  }

  updatePreview() {
    const preview = document.getElementById('configurator-preview');
    if (!preview) return;

    const quality = this.selectedQuality || 'Nicht ausgewählt';
    const size = this.selectedSize || 'Nicht ausgewählt';
    const vehicleType = this.selectedVehicleType || '';

    let html = `
      <div class="preview-item">
        <span>Qualität:</span>
        <strong>${quality}</strong>
      </div>
      <div class="preview-item">
        <span>Größe:</span>
        <strong>${size}</strong>
      </div>
    `;

    if (vehicleType) {
      html = `
        <div class="preview-item">
          <span>Fahrzeugtyp:</span>
          <strong>${vehicleType}</strong>
        </div>
      ` + html;
    }

    preview.innerHTML = html;

    // Enable/disable request button
    const requestButton = document.getElementById('request-product');
    if (requestButton) {
      const isValid = this.selectedQuality && this.selectedSize;
      requestButton.disabled = !isValid;
      requestButton.classList.toggle('btn-secondary', !isValid);
      requestButton.classList.toggle('btn-primary', isValid);
    }
  }

  handleProductRequest() {
    if (!this.selectedQuality || !this.selectedSize) {
      alert('Bitte wählen Sie zuerst eine Qualität und Größe aus.');
      return;
    }

    // Find the selected product
    const selectedProduct = this.currentProducts.find(p =>
      p.quality === this.selectedQuality && p.size === this.selectedSize
    );

    if (!selectedProduct) {
      alert('Produkt nicht gefunden.');
      return;
    }

    // Build product info string
    const productInfo = `${selectedProduct.quality} - ${selectedProduct.size}`;

    // Redirect to contact page with pre-filled data
    const params = new URLSearchParams({
      product: productInfo,
      category: this.category,
      vehicle: this.selectedVehicleType || ''
    });

    window.location.href = `kontakt.html?${params.toString()}`;
  }

  // Get unique qualities from current products
  getUniqueQualities() {
    return [...new Set(this.currentProducts.map(p => p.quality))];
  }

  // Get unique sizes from current products
  getUniqueSizes() {
    return [...new Set(this.currentProducts.map(p => p.size))];
  }
}

// Global function to select a product
function selectProduct(productId) {
  // Find product in all categories
  let selectedProduct = null;

  for (const category in products) {
    const product = products[category].find(p => p.id === productId);
    if (product) {
      selectedProduct = product;
      break;
    }
  }

  if (!selectedProduct) return;

  // Build product info
  const productInfo = `${selectedProduct.quality} - ${selectedProduct.size}`;
  const category = document.body.dataset.category || '';

  // Redirect to contact page
  const params = new URLSearchParams({
    product: productInfo,
    category: category
  });

  window.location.href = `kontakt.html?${params.toString()}`;
}

// Global filter function for filter buttons
function filterProducts(filterType, filterValue) {
  if (window.configurator) {
    if (filterType === 'quality') {
      window.configurator.selectedQuality = filterValue === 'all' ? null : filterValue;

      // Update radio button
      const qualityInput = document.querySelector(`input[name="quality"][value="${filterValue}"]`);
      if (qualityInput) {
        qualityInput.checked = true;
      }
    } else if (filterType === 'size') {
      window.configurator.selectedSize = filterValue === 'all' ? null : filterValue;

      // Update select
      const sizeSelect = document.getElementById('size-select');
      if (sizeSelect) {
        sizeSelect.value = filterValue === 'all' ? '' : filterValue;
      }
    }

    window.configurator.updateSelection();
  }
}

// Export for global use
window.ProductConfigurator = ProductConfigurator;
window.selectProduct = selectProduct;
window.filterProducts = filterProducts;
