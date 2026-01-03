// STOFFGARAGE - Enhanced Product Configurator
// With car model search and size recommendation

class ProductConfigurator {
  constructor(category) {
    this.category = category;
    this.currentProducts = products[category] || [];
    this.selectedQuality = null;
    this.selectedSize = null;
    this.selectedVehicleType = null;
    this.selectedCarModel = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupCarSearch();
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

  // New: Car Model Search
  setupCarSearch() {
    const searchInput = document.getElementById('car-search');
    const searchResults = document.getElementById('car-search-results');

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();

      if (query.length < 2) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        return;
      }

      // Search in car models database
      if (typeof searchModels === 'function') {
        const results = searchModels(query);
        this.displaySearchResults(results, searchResults);
      }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
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
        html += `
          <div class="search-result-item" data-size="${group.size}" data-make="${model.make}" data-model="${model.model}">
            <div style="font-weight:700;color:var(--text-primary);">${model.make} ${model.model}</div>
            <div style="font-size:0.875rem;color:var(--text-secondary);">Länge: ${model.length}cm → Größe ${group.size}</div>
          </div>
        `;
      });
    });

    container.innerHTML = html;
    container.style.display = 'block';

    // Add click handlers
    container.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const size = item.dataset.size;
        const make = item.dataset.make;
        const model = item.dataset.model;

        this.selectCarModel(make, model, size);
        container.style.display = 'none';
      });
    });
  }

  selectCarModel(make, model, size) {
    this.selectedCarModel = `${make} ${model}`;
    this.selectedSize = size;

    // Update UI
    const searchInput = document.getElementById('car-search');
    if (searchInput) {
      searchInput.value = `${make} ${model}`;
    }

    const sizeSelect = document.getElementById('size-select');
    if (sizeSelect) {
      sizeSelect.value = size;
    }

    // Show recommendation message
    this.showRecommendation(make, model, size);

    this.updateSelection();
  }

  showRecommendation(make, model, size) {
    const recommendationDiv = document.getElementById('size-recommendation');
    if (recommendationDiv) {
      recommendationDiv.innerHTML = `
        <div style="padding:1rem;background:var(--bg-secondary);border:2px solid var(--accent-primary);margin-top:1rem;">
          <div style="font-weight:700;margin-bottom:0.5rem;color:var(--accent-primary);text-transform:uppercase;font-size:0.875rem;">
            EMPFEHLUNG
          </div>
          <div style="color:var(--text-primary);">
            Für Ihren <strong>${make} ${model}</strong> empfehlen wir Größe <strong>${size}</strong>
          </div>
        </div>
      `;
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
    if (this.selectedCarModel) params.set('car', this.selectedCarModel);

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
      productsGrid.innerHTML = '<p class="text-center" style="grid-column: 1/-1; color: var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;">Keine Produkte gefunden</p>';
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
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem;line-height:1.6;">
          ${product.description}
        </p>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;text-transform:uppercase;">
          <strong style="color:var(--text-primary);">MATERIAL:</strong> ${product.material}
        </p>
        <button class="btn btn-primary" style="width:100%;" onclick="selectProduct('${product.id}')">
          JETZT ANFRAGEN
        </button>
      </div>
    `;

    return card;
  }

  getCategoryIcon() {
    const icons = {
      auto: '<path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>',
      van: '<rect x="4" y="6" width="16" height="12" stroke-width="2" /><path stroke-width="2" d="M8 12h8M4 18h16"/>',
      pickup: '<path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>',
      wohnmobil: '<path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
      hagelschutz: '<circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-width="2" d="M12 6v6l4 2"/>'
    };

    return icons[this.category] || icons.auto;
  }

  getFeatureLabel(feature) {
    const labels = {
      'wasserdicht': 'WASSERDICHT',
      'uv-schutz': 'UV-SCHUTZ',
      'atmungsaktiv': 'ATMUNGSAKTIV',
      'kratzfest': 'KRATZFEST',
      'elastisch': 'ELASTISCH',
      'softtouch': 'SOFT TOUCH',
      'premium-finish': 'PREMIUM',
      'seitliche-oeffnung': 'SEITENZUGANG',
      'hagelschutz-klasse-3': 'KLASSE 3'
    };

    return labels[feature] || feature.toUpperCase();
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

    const quality = this.selectedQuality || 'NICHT AUSGEWÄHLT';
    const size = this.selectedSize || 'NICHT AUSGEWÄHLT';
    const car = this.selectedCarModel || '';
    const vehicleType = this.selectedVehicleType || '';

    let html = '';

    if (car) {
      html += `
        <div class="preview-item">
          <span>FAHRZEUG:</span>
          <strong>${car}</strong>
        </div>
      `;
    }

    if (vehicleType) {
      html += `
        <div class="preview-item">
          <span>TYP:</span>
          <strong>${vehicleType}</strong>
        </div>
      `;
    }

    html += `
      <div class="preview-item">
        <span>QUALITÄT:</span>
        <strong>${quality}</strong>
      </div>
      <div class="preview-item">
        <span>GRÖSSE:</span>
        <strong>${size}</strong>
      </div>
    `;

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
    let productInfo = `${selectedProduct.quality} - ${selectedProduct.size}`;
    if (this.selectedCarModel) {
      productInfo = `${this.selectedCarModel} - ` + productInfo;
    }

    // Redirect to contact page with pre-filled data
    const params = new URLSearchParams({
      product: productInfo,
      category: this.category,
      vehicle: this.selectedVehicleType || this.selectedCarModel || ''
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
