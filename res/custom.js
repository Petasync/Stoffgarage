/**
 * Custom JavaScript to replace x5engine.js functionality
 * Handles menus, hamburger toggle, and basic interactions
 */

/**
 * Browser compatibility check (stub function)
 * This replaces the x5engine checkBrowserCompatibility function
 */
function checkBrowserCompatibility(errorTitle, warningTitle, updateMessage, updateUrl) {
    // Modern browsers support everything needed, so we'll just do a basic check
    // This is a simplified version - the original x5engine function was more complex
    var isCompatible = true;

    // Check for basic required features
    if (!document.querySelector || !window.addEventListener) {
        isCompatible = false;
    }

    // Only show warning if browser is truly incompatible (very rare nowadays)
    if (!isCompatible) {
        console.warn('Browser compatibility warning:', warningTitle);
    }
}

(function($) {
    'use strict';

    $(document).ready(function() {

        // Initialize hamburger menu toggle
        initHamburgerMenu();

        // Initialize dropdown menus
        initDropdownMenus();

        // Initialize search form
        initSearchForm();

        // Initialize back to top button (if exists)
        initBackToTop();

    });

    /**
     * Hamburger menu toggle functionality
     */
    function initHamburgerMenu() {
        $('.hamburger-button, .hamburger-component').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var $menu = $('#imHeaderBg, .imMnMnFirst');
            var $hamburger = $(this);

            if ($menu.is(':visible')) {
                $menu.slideUp(300);
                $hamburger.removeClass('open');
            } else {
                $menu.slideDown(300);
                $hamburger.addClass('open');
            }
        });

        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('#imHeaderBg, .hamburger-button, .hamburger-component').length) {
                $('#imHeaderBg, .imMnMnFirst').slideUp(300);
                $('.hamburger-button, .hamburger-component').removeClass('open');
            }
        });
    }

    /**
     * Initialize dropdown menu functionality
     */
    function initDropdownMenus() {
        $('.imMnMn li.imPage').hover(
            function() {
                $(this).find('> ul').stop(true, true).slideDown(200);
            },
            function() {
                $(this).find('> ul').stop(true, true).slideUp(200);
            }
        );
    }

    /**
     * Initialize search form
     */
    function initSearchForm() {
        $('#imHeaderObjects form[action="imsearch.php"]').on('submit', function(e) {
            var searchValue = $(this).find('input[name="search"]').val();
            if (!searchValue || searchValue.trim() === '') {
                e.preventDefault();
                alert('Bitte geben Sie einen Suchbegriff ein.');
                return false;
            }
        });
    }

    /**
     * Initialize back to top button
     */
    function initBackToTop() {
        var $backToTop = $('<a></a>')
            .attr('id', 'backToTop')
            .attr('href', '#')
            .html('&uarr;')
            .css({
                'position': 'fixed',
                'bottom': '20px',
                'right': '20px',
                'display': 'none',
                'background': '#333',
                'color': '#fff',
                'padding': '10px 15px',
                'border-radius': '5px',
                'text-decoration': 'none',
                'z-index': '9999'
            });

        $('body').append($backToTop);

        $(window).scroll(function() {
            if ($(this).scrollTop() > 200) {
                $backToTop.fadeIn();
            } else {
                $backToTop.fadeOut();
            }
        });

        $backToTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 600);
        });
    }

})(jQuery);
