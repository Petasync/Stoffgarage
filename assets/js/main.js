// STOFFGARAGE - Main JavaScript File
// Handles global functionality, navigation, and UI interactions

document.addEventListener('DOMContentLoaded', function() {

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');

      // Toggle menu icon
      const isActive = navMenu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== Smooth Scroll for Internal Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== Back to Top Button =====
  const backToTopButton = document.getElementById('backToTop');

  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== FAQ Accordion =====
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function() {
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });

  // ===== Contact Form Handling (EmailJS) =====
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      // Show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Wird gesendet...';
      submitButton.classList.add('loading');

      // Get form data
      const formData = {
        name: this.querySelector('[name="name"]').value,
        email: this.querySelector('[name="email"]').value,
        phone: this.querySelector('[name="phone"]').value,
        vehicle: this.querySelector('[name="vehicle"]').value,
        message: this.querySelector('[name="message"]').value
      };

      // Check if pre-filled from configurator
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('product')) {
        formData.message = `Produktanfrage: ${urlParams.get('product')}\n\n${formData.message}`;
      }

      try {
        // EmailJS Integration (configure with your credentials)
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);

        // Simulate success for now
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        showNotification('Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.', 'success');
        this.reset();

      } catch (error) {
        console.error('Error sending form:', error);
        showNotification('Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut.', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.classList.remove('loading');
      }
    });
  }

  // ===== Notification System =====
  function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background-color: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--accent-primary)'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideIn 0.3s ease;
      max-width: 400px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Add notification animations to CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ===== Cookie Banner =====
  const cookieBanner = document.querySelector('.cookie-banner');
  const cookieAcceptBtn = document.getElementById('acceptCookies');
  const cookieDeclineBtn = document.getElementById('declineCookies');

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem('cookieChoice');

  if (!cookieChoice && cookieBanner) {
    cookieBanner.classList.add('show');
  }

  if (cookieAcceptBtn) {
    cookieAcceptBtn.addEventListener('click', function() {
      localStorage.setItem('cookieChoice', 'accepted');
      cookieBanner.classList.remove('show');

      // Initialize analytics if accepted
      initializeAnalytics();
    });
  }

  if (cookieDeclineBtn) {
    cookieDeclineBtn.addEventListener('click', function() {
      localStorage.setItem('cookieChoice', 'declined');
      cookieBanner.classList.remove('show');
    });
  }

  // If cookies were previously accepted, initialize analytics
  if (cookieChoice === 'accepted') {
    initializeAnalytics();
  }

  // ===== Analytics Initialization =====
  function initializeAnalytics() {
    // Google Analytics (replace with your tracking ID)
    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
    */

    // Microsoft Clarity (replace with your project ID)
    /*
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
    */
  }

  // ===== Recently Viewed Products (LocalStorage) =====
  function addToRecentlyViewed(productId, productData) {
    let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(item => item.id !== productId);

    // Add to beginning
    recentlyViewed.unshift({ id: productId, ...productData, timestamp: Date.now() });

    // Keep only last 10
    recentlyViewed = recentlyViewed.slice(0, 10);

    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }

  function getRecentlyViewed() {
    return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  }

  // ===== Product Card Click Tracking =====
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
      const productId = this.dataset.productId;
      if (productId) {
        addToRecentlyViewed(productId, {
          title: this.querySelector('.product-title')?.textContent,
          size: this.querySelector('.product-size')?.textContent
        });
      }
    });
  });

  // ===== Filter Buttons =====
  const filterButtons = document.querySelectorAll('.filter-button');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Trigger filter logic (handled by configurator.js on product pages)
      const filterType = this.dataset.filter;
      const filterValue = this.dataset.value;

      if (window.filterProducts) {
        window.filterProducts(filterType, filterValue);
      }
    });
  });

  // ===== Dynamic Year in Footer =====
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ===== Lazy Loading Images =====
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===== Header Scroll Effect =====
  let lastScroll = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // ===== Newsletter Form (if exists) =====
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = this.querySelector('[name="email"]').value;

      // Simulate newsletter signup
      showNotification('Vielen Dank für Ihre Anmeldung!', 'success');
      this.reset();
    });
  }

  // ===== Initialize Page =====
  console.log('STOFFGARAGE - Website loaded successfully');
});

// Export functions for global use
window.showNotification = function(message, type = 'info') {
  const event = new CustomEvent('showNotification', { detail: { message, type } });
  document.dispatchEvent(event);
};
