// Financial Education Platform - Client-side JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page components
    initializeSearchAutocomplete();
    initializeCalculators();
    initializeTooltips();
    initializeAnimations();
});

// Search Autocomplete
function initializeSearchAutocomplete() {
    const searchInput = document.querySelector('input[name="search"]');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            }
        });
    }
}

// Perform search with live results
function performSearch(query) {
    const currentCountry = new URLSearchParams(window.location.search).get('country') || 'IN';
    
    fetch(`/api/countries/${currentCountry}/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            showSearchSuggestions(data);
        })
        .catch(error => {
            console.log('Search error:', error);
        });
}

// Show search suggestions
function showSearchSuggestions(results) {
    // Create or update search suggestions dropdown
    let suggestionsDiv = document.getElementById('search-suggestions');
    if (!suggestionsDiv) {
        suggestionsDiv = document.createElement('div');
        suggestionsDiv.id = 'search-suggestions';
        suggestionsDiv.className = 'position-absolute bg-white border rounded shadow-lg mt-1 w-100';
        suggestionsDiv.style.zIndex = '1000';
        
        const searchInput = document.querySelector('input[name="search"]');
        searchInput.parentNode.appendChild(suggestionsDiv);
    }
    
    // Populate suggestions
    let suggestions = [];
    
    if (results.instruments && results.instruments.length > 0) {
        suggestions.push(`<div class="p-2 fw-bold text-muted small">INSTRUMENTS</div>`);
        results.instruments.slice(0, 3).forEach(item => {
            suggestions.push(`<div class="p-2 search-suggestion" data-type="instruments">${item.name}</div>`);
        });
    }
    
    if (results.schemes && results.schemes.length > 0) {
        suggestions.push(`<div class="p-2 fw-bold text-muted small">SAVINGS SCHEMES</div>`);
        results.schemes.slice(0, 3).forEach(item => {
            suggestions.push(`<div class="p-2 search-suggestion" data-type="savings">${item.name}</div>`);
        });
    }
    
    if (results.regulations && results.regulations.length > 0) {
        suggestions.push(`<div class="p-2 fw-bold text-muted small">TAX REGULATIONS</div>`);
        results.regulations.slice(0, 2).forEach(item => {
            suggestions.push(`<div class="p-2 search-suggestion" data-type="tax">${item.regime} Regime</div>`);
        });
    }
    
    if (suggestions.length === 0) {
        suggestions.push(`<div class="p-3 text-muted text-center">No results found</div>`);
    }
    
    suggestionsDiv.innerHTML = suggestions.join('');
    
    // Add click handlers for suggestions
    document.querySelectorAll('.search-suggestion').forEach(suggestion => {
        suggestion.style.cursor = 'pointer';
        suggestion.addEventListener('mouseenter', function() {
            this.classList.add('bg-light');
        });
        suggestion.addEventListener('mouseleave', function() {
            this.classList.remove('bg-light');
        });
        suggestion.addEventListener('click', function() {
            const type = this.dataset.type;
            const currentCountry = new URLSearchParams(window.location.search).get('country') || 'IN';
            const searchTerm = this.textContent;
            
            // Navigate to the appropriate section with search
            window.location.href = `/?country=${currentCountry}&section=${type}&search=${encodeURIComponent(searchTerm)}`;
        });
    });
}

// Hide search suggestions when clicking outside
document.addEventListener('click', function(e) {
    const suggestionsDiv = document.getElementById('search-suggestions');
    const searchInput = document.querySelector('input[name="search"]');
    
    if (suggestionsDiv && !suggestionsDiv.contains(e.target) && e.target !== searchInput) {
        suggestionsDiv.remove();
    }
});

// Initialize calculators
function initializeCalculators() {
    // Enhanced tax calculator
    const taxForm = document.getElementById('taxCalculatorForm');
    if (taxForm) {
        taxForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateTax();
        });
    }
    
    // Enhanced savings calculator
    const savingsForm = document.getElementById('calculatorForm');
    if (savingsForm) {
        savingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateRecommendations();
        });
    }
}

// Enhanced tax calculation with real logic
function calculateTax() {
    const income = parseFloat(document.getElementById('annual-income').value);
    const age = document.getElementById('age-group').value;
    const investments = parseFloat(document.getElementById('investments').value) || 0;
    
    if (!income) {
        showAlert('Please enter your annual income to calculate tax.', 'warning');
        return;
    }
    
    // Simple tax calculation for demonstration
    // This would use actual tax slab data in production
    let newRegimeTax = calculateNewRegimeTax(income);
    let oldRegimeTax = calculateOldRegimeTax(income, investments);
    let savings = Math.max(0, oldRegimeTax - newRegimeTax);
    
    // Display results
    const currencySymbol = document.querySelector('[data-currency]')?.dataset.currency || '₹';
    document.getElementById('newRegimeTax').textContent = `${currencySymbol}${formatNumber(newRegimeTax)}`;
    document.getElementById('oldRegimeTax').textContent = `${currencySymbol}${formatNumber(oldRegimeTax)}`;
    document.getElementById('taxSavings').textContent = `${currencySymbol}${formatNumber(savings)}`;
    
    document.getElementById('taxResults').classList.remove('d-none');
}

// Simple tax calculations (India-specific example)
function calculateNewRegimeTax(income) {
    let tax = 0;
    
    if (income > 400000) tax += Math.min(income - 400000, 400000) * 0.05;
    if (income > 800000) tax += Math.min(income - 800000, 400000) * 0.10;
    if (income > 1200000) tax += Math.min(income - 1200000, 400000) * 0.15;
    if (income > 1600000) tax += Math.min(income - 1600000, 400000) * 0.20;
    if (income > 2000000) tax += Math.min(income - 2000000, 400000) * 0.25;
    if (income > 2400000) tax += (income - 2400000) * 0.30;
    
    return Math.round(tax);
}

function calculateOldRegimeTax(income, investments) {
    const deduction = Math.min(investments, 150000); // 80C limit
    const taxableIncome = Math.max(0, income - 250000 - deduction);
    
    let tax = 0;
    if (taxableIncome > 0) tax += Math.min(taxableIncome, 250000) * 0.05;
    if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 500000) * 0.20;
    if (taxableIncome > 750000) tax += (taxableIncome - 750000) * 0.30;
    
    return Math.round(tax);
}

// Initialize tooltips
function initializeTooltips() {
    // Add tooltips to risk badges and complex terms
    const riskBadges = document.querySelectorAll('[class*="risk-"]');
    riskBadges.forEach(badge => {
        badge.setAttribute('title', getRiskTooltip(badge.textContent));
        badge.style.cursor = 'help';
    });
    
    // Initialize Bootstrap tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"], [title]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => 
            new bootstrap.Tooltip(tooltipTriggerEl)
        );
    }
}

// Get risk level explanations
function getRiskTooltip(riskText) {
    const riskLower = riskText.toLowerCase();
    if (riskLower.includes('very low')) return 'Extremely safe investments with guaranteed returns';
    if (riskLower.includes('low')) return 'Safe investments with minimal risk of loss';
    if (riskLower.includes('medium')) return 'Moderate risk with potential for higher returns';
    if (riskLower.includes('high')) return 'Higher risk investments with potential for significant gains or losses';
    if (riskLower.includes('very high')) return 'Speculative investments with high potential rewards and high risk of loss';
    return 'Risk level information';
}

// Initialize page animations
function initializeAnimations() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and other animated elements
    document.querySelectorAll('.card, .instrument-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Utility functions
function formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num);
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Enhanced form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Export functions for global access
window.calculateTax = calculateTax;
window.calculateRecommendations = calculateRecommendations;
window.selectRegime = selectRegime;