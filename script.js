// Maintenance Mode Guard (Disabled)
(function () {
    const isMaintenanceMode = false;
    if (isMaintenanceMode) {
        const currentPath = window.location.pathname.toLowerCase();
        const isIndex = currentPath.endsWith('/') || currentPath.endsWith('/index.html') || currentPath.endsWith('\\index.html') || (!currentPath.includes('.html') && !currentPath.includes('.php'));
        if (!isIndex && !currentPath.includes('logo.png')) {
            window.location.replace('index.html');
            return;
        }
    }
})();

// Force pure light theme unconditionally across all devices
(function () {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
})();

// Centralized Color Configuration (Hex to Name Mapping)
// Comprehensive Color Name Resolver with Nearest-Color Distance
const standardColorMap = {
    '#000000': 'Black', '#ffffff': 'White', '#ff0000': 'Red', '#dc143c': 'Crimson Red',
    '#0000ff': 'Blue', '#008000': 'Green', '#ffff00': 'Yellow', '#808080': 'Gray',
    '#a9a9a9': 'Dark Gray', '#d3d3d3': 'Light Gray', '#00f2ff': 'Light Blue',
    '#e100ff': 'Magenta Pink', '#1a2a4a': 'Midnight Blue', '#4a90e2': 'Sky Blue',
    '#f0f0f0': 'Off-White', '#0a0f1e': 'Dark Navy', '#333333': 'Charcoal Grey',
    '#ff91a4': 'Salmon Pink', '#800000': 'Maroon', '#900056': 'Dark Pink',
    '#c4956a': 'Light Brown', '#f5e6c8': 'Light Yellow', '#e6a100': 'Dark Yellow',
    '#8b4513': 'Brown', '#36454f': 'Charcoal', '#889c8a': 'Sage Green',
    '#7f94a8': 'Dusty Blue', '#d9cdbe': 'Beige', '#a020f0': 'Purple',
    '#ffa500': 'Orange', '#ffc0cb': 'Pink', '#808000': 'Olive',
    '#00ffff': 'Cyan', '#008080': 'Teal', '#4b0082': 'Indigo',
    '#ee82ee': 'Violet', '#f5f5dc': 'Beige', '#ffe4c4': 'Bisque',
    '#faebd7': 'Antique White', '#7fffd4': 'Aquamarine', '#5f9ea0': 'Cadet Blue',
    '#d2691e': 'Chocolate', '#ff7f50': 'Coral', '#6495ed': 'Cornflower Blue',
    '#b8860b': 'Dark Goldenrod', '#006400': 'Dark Green', '#bdb76b': 'Dark Khaki',
    '#8b008b': 'Dark Magenta', '#556b2f': 'Dark Olive Green', '#ff8c00': 'Dark Orange',
    '#9932cc': 'Dark Orchid', '#8b0000': 'Dark Red', '#e9967a': 'Dark Salmon',
    '#8fbc8f': 'Dark Sea Green', '#483d8b': 'Dark Slate Blue', '#2f4f4f': 'Dark Slate Gray',
    '#00ced1': 'Dark Turquoise', '#9400d3': 'Dark Violet', '#ff1493': 'Deep Pink',
    '#00bfff': 'Deep Sky Blue', '#696969': 'Dim Gray', '#1e90ff': 'Dodger Blue',
    '#b22222': 'Firebrick', '#228b22': 'Forest Green', '#ffd700': 'Gold',
    '#daa520': 'Goldenrod', '#adff2f': 'Green Yellow', '#f0fff0': 'Honeydew',
    '#ff69b4': 'Hot Pink', '#cd5c5c': 'Indian Red', '#f0e68c': 'Khaki',
    '#e6e6fa': 'Lavender', '#fff0f5': 'Lavender Blush', '#7cfc00': 'Lawn Green',
    '#fffacd': 'Lemon Chiffon', '#add8e6': 'Light Blue', '#f08080': 'Light Coral',
    '#e0ffff': 'Light Cyan', '#eedd82': 'Light Goldenrod', '#90ee90': 'Light Green',
    '#ffb6c1': 'Light Pink', '#ffa07a': 'Light Salmon', '#20b2aa': 'Light Sea Green',
    '#87cefa': 'Light Sky Blue', '#778899': 'Light Slate Gray', '#b0c4de': 'Light Steel Blue',
    '#ffffe0': 'Light Yellow', '#00ff00': 'Lime', '#32cd32': 'Lime Green',
    '#faf0e6': 'Linen', '#66cdaa': 'Medium Aquamarine', '#0000cd': 'Medium Blue',
    '#ba55d3': 'Medium Orchid', '#9370db': 'Medium Purple', '#3cb371': 'Medium Sea Green',
    '#7b68ee': 'Medium Slate Blue', '#00fa9a': 'Medium Spring Green', '#48d1cc': 'Medium Turquoise',
    '#c71585': 'Medium Violet Red', '#191970': 'Midnight Blue', '#ffe4e1': 'Misty Rose',
    '#ffe4b5': 'Moccasin', '#ffdead': 'Navajo White', '#000080': 'Navy',
    '#fdf5e6': 'Old Lace', '#6b8e23': 'Olive Drab', '#ff4500': 'Orange Red',
    '#da70d6': 'Orchid', '#eee8aa': 'Pale Goldenrod', '#98fb98': 'Pale Green',
    '#afeeee': 'Pale Turquoise', '#db7093': 'Pale Violet Red', '#ffefd5': 'Papaya Whip',
    '#ffdab9': 'Peach Puff', '#cd853f': 'Peru', '#dda0dd': 'Plum',
    '#b0e0e6': 'Powder Blue', '#bc8f8f': 'Rosy Brown', '#4169e1': 'Royal Blue',
    '#f4a460': 'Sandy Brown', '#2e8b57': 'Sea Green', '#fff5ee': 'Seashell',
    '#a0522d': 'Sienna', '#c0c0c0': 'Silver', '#87ceeb': 'Sky Blue',
    '#6a5acd': 'Slate Blue', '#708090': 'Slate Gray', '#fffafa': 'Snow',
    '#00ff7f': 'Spring Green', '#4682b4': 'Steel Blue', '#d2b48c': 'Tan',
    '#d8bfd8': 'Thistle', '#ff6347': 'Tomato', '#40e0d0': 'Turquoise',
    '#f5deb3': 'Wheat', '#f5f5f5': 'White Smoke', '#9acd32': 'Yellow Green'
};

function hexToRgb(hex) {
    let clean = hex.replace('#', '').trim();
    if (clean.length === 3) {
        clean = clean.split('').map(c => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}

function resolveFriendlyColorName(hexOrName, productContext) {
    if (!hexOrName) return 'Standard';
    const raw = String(hexOrName).trim();
    
    // Check product specific colorNames first
    if (productContext && productContext.colorNames && typeof productContext.colorNames === 'object') {
        const found = productContext.colorNames[raw] || productContext.colorNames[raw.toLowerCase()] || productContext.colorNames[raw.toUpperCase()];
        if (found) return found;
    }

    // Check global colorNames dictionary
    if (typeof colorNames !== 'undefined' && colorNames && typeof colorNames === 'object') {
        const found = colorNames[raw] || colorNames[raw.toLowerCase()] || colorNames[raw.toUpperCase()];
        if (found) return found;
    }

    // If it's already an English word without #, capitalize and return
    if (!raw.startsWith('#')) {
        return raw.charAt(0).toUpperCase() + raw.slice(1);
    }

    // Direct lookup in standardColorMap
    const lowerHex = raw.toLowerCase();
    if (standardColorMap[lowerHex]) {
        return standardColorMap[lowerHex];
    }

    // Nearest Color Calculation using Euclidean distance in RGB space
    try {
        const targetRgb = hexToRgb(lowerHex);
        let minDistance = Infinity;
        let bestMatchName = 'Custom Shade';

        for (const [mapHex, mapName] of Object.entries(standardColorMap)) {
            const mapRgb = hexToRgb(mapHex);
            const dist = Math.sqrt(
                Math.pow(targetRgb.r - mapRgb.r, 2) +
                Math.pow(targetRgb.g - mapRgb.g, 2) +
                Math.pow(targetRgb.b - mapRgb.b, 2)
            );
            if (dist < minDistance) {
                minDistance = dist;
                bestMatchName = mapName;
            }
        }
        return bestMatchName;
    } catch (e) {
        return 'Custom Shade';
    }
}

if (typeof window !== 'undefined') {
    window.resolveFriendlyColorName = resolveFriendlyColorName;
}

const colorNames = {
    '#ffffff': 'White',
    '#000000': 'Black',
    '#ff0000': 'Red',
    '#DC143C': 'Red',
    '#0000ff': 'Blue',
    '#008000': 'Green',
    '#ffff00': 'Yellow',
    '#808080': 'Gray',
    '#00f2ff': 'Light Blue',
    '#e100ff': 'Pink',
    '#1a2a4a': 'Midnight Blue',
    '#4a90e2': 'Sky Blue',
    '#f0f0f0': 'Off-White',
    '#0A0F1E': 'Dark Navy',
    '#333333': 'Grey',
    '#ff91a4': 'samon pink',
    '#800000': 'Maroon',
    '#900056': 'Dark Pink',
    '#c4956a': 'Light Brown',
    '#f5e6c8': 'Light Yellow',
    '#e6a100': 'Dark Yellow',
    '#8B4513': 'Brown',
    '#36454f': 'Charcoal',
    '#889c8a': 'Sage Green',
    '#7f94a8': 'Dusty Blue',
    '#d9cdbe': 'Beige',
    '#a020f0': 'Purple'
};

const products = [
    {
        id: '23', name: 'Long Design Frock', category: 'Frock', sections: ['Womens'], isNewArrival: true, isFeatured: true,
        images: [
            'https://i.ibb.co/CKNLnKPW/Chat-GPT-Image-Aug-3-2026-12-13-02-PM.png',
            'https://i.ibb.co/5WMrGVJn/Chat-GPT-Image-Aug-3-2026-12-07-29-PM.png',
            'https://i.ibb.co/twtnzycD/Chat-GPT-Image-Aug-3-2026-12-04-41-PM-1.png'
        ],
        brand: 'Roohira',
        sizes: {
            'Free Size': { price: 2250, oldPrice: 2600 }
        },
        colors: ['#e6a100', '#f5e6c8', '#800000'], stock: 10,
        desc: 'Long Design Frock by Roohira. An elegant and stylish long frock crafted from soft, lightweight premium fabric. Designed with a flattering silhouette and available in Dark Yellow, Light Yellow, and Maroon in versatile Free Size.'
    },
    {
        id: '24', name: 'Long Batik Frock', category: 'Frock', sections: ['Womens'], isNewArrival: true, isFeatured: true,
        images: [
            'https://i.ibb.co/cdSLGG9/Chat-GPT-Image-Aug-3-2026-04-59-27-PM.png',
            'https://i.ibb.co/yFMBjFbf/Chat-GPT-Image-Aug-3-2026-04-56-51-PM.png',
            'https://i.ibb.co/20B313Xw/Aug-3-2026-04-53-46-PM.png',
            'https://i.ibb.co/s9mgQnHb/Chat-GPT-Image-Aug-3-2026-04-46-45-PM.png'
        ],
        colorImages: {
            '#0000ff': 'https://i.ibb.co/cdSLGG9/Chat-GPT-Image-Aug-3-2026-04-59-27-PM.png',
            '#e6a100': 'https://i.ibb.co/yFMBjFbf/Chat-GPT-Image-Aug-3-2026-04-56-51-PM.png',
            '#8B4513': 'https://i.ibb.co/20B313Xw/Aug-3-2026-04-53-46-PM.png',
            '#800000': 'https://i.ibb.co/s9mgQnHb/Chat-GPT-Image-Aug-3-2026-04-46-45-PM.png'
        },
        brand: 'Roohira',
        sizes: {
            'XL': { price: 1500, oldPrice: 1850 },
            '2XL': { price: 1500, oldPrice: 1850 }
        },
        colors: ['#0000ff', '#e6a100', '#8B4513', '#800000'], stock: 10,
        desc: 'Long Batik Frock by Roohira. Beautiful traditional and modern fusion long batik frock available in Blue, Dark Yellow, Brown, and Maroon in XL and 2XL sizes.'
    },
    {
        id: '25', name: 'White Blouse with Embroidery', category: 'Blouse', sections: ['Womens'], isNewArrival: true, isFeatured: true,
        images: [
            'https://i.ibb.co/dzYtF9G/Chat-GPT-Image-Aug-4-2026-12-25-15-PM.png',
            'https://i.ibb.co/TBM1752f/Chat-GPT-Image-Aug-4-2026-12-28-42-PM.png',
            'https://i.ibb.co/BH7rkYFB/Chat-GPT-Image-Aug-4-2026-12-36-48-PM.png',
            'https://i.ibb.co/1tzMntQr/Chat-GPT-Image-Aug-4-2026-12-38-24-PM.png'
        ],
        colorImages: {
            '#ffff00': 'https://i.ibb.co/dzYtF9G/Chat-GPT-Image-Aug-4-2026-12-25-15-PM.png',
            '#a020f0': 'https://i.ibb.co/TBM1752f/Chat-GPT-Image-Aug-4-2026-12-28-42-PM.png',
            '#0000ff': 'https://i.ibb.co/BH7rkYFB/Chat-GPT-Image-Aug-4-2026-12-36-48-PM.png',
            '#008000': 'https://i.ibb.co/1tzMntQr/Chat-GPT-Image-Aug-4-2026-12-38-24-PM.png'
        },
        brand: 'Roohira',
        sizes: {
            'XL': { price: 1490, oldPrice: 1700 },
            'XXL': { price: 1490, oldPrice: 1700 },
            'XXXL': { price: 1490, oldPrice: 1700 }
        },
        colors: ['#ffff00', '#a020f0', '#0000ff', '#008000'], stock: 15,
        desc: 'White Blouse with Embroidery by Roohira. A beautiful, lightweight premium blouse styled with intricate embroidery detail. Available in Yellow, Purple, Blue, and Green in XL, XXL, and XXXL sizes.'
    }
];

// Helper to open product details without ever flashing an old or wrong product image
function openProductPage(productId) {
    if (typeof products !== 'undefined' && Array.isArray(products)) {
        const found = products.find(item => String(item.id) === String(productId));
        if (found) {
            try {
                sessionStorage.setItem('roohira_selected_product_' + productId, JSON.stringify(found));
            } catch (e) {}
        }
    }
    window.location.href = 'product-detail.html?id=' + encodeURIComponent(productId);
}
window.openProductPage = openProductPage;

// --- Cart System ---
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('roohira_cart')) || [];
    if (!Array.isArray(cart)) cart = [];
} catch (e) {
    cart = [];
    console.error("Failed to load cart from localStorage", e);
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(name, price, image = '', size = 'Free', color = 'Default', quantity = 1) {
    const existingItem = cart.find(item => item.name === name && item.size === size && item.color === color);
    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
    } else {
        cart.push({ name: name, price: price, quantity: parseInt(quantity), image: image, size: size, color: color });
    }
    saveCart();
    showNotification(`${name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function updateQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) removeFromCart(index);
    else { saveCart(); renderCart(); }
}

function saveCart() {
    localStorage.setItem('roohira_cart', JSON.stringify(cart));
    updateCartCount();
    if(typeof updateFreeDeliveryBar === 'function') updateFreeDeliveryBar();
}

function generateProductCardHTML(p) {
    const hasSizes = p.sizes && typeof p.sizes === 'object';
    const displayPrice = hasSizes ? Object.values(p.sizes)[0].price : p.price;
    const displayOldPrice = hasSizes ? Object.values(p.sizes)[0].oldPrice : p.oldPrice;

    // Calculate discount percentage
    let discountBadge = '';
    if (displayOldPrice && displayOldPrice > displayPrice) {
        const discountPercent = Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100);
        discountBadge = `<span class="card-discount-badge">${discountPercent}% OFF</span>`;
    }

    const isOutOfStock = p.stock === 0;

    // Determine wishlist state
    const wished = (typeof isInWishlist === 'function') ? isInWishlist(p.id) : false;
    const heartColor = wished ? 'color: #DC143C;' : 'color: #6D5D53;';

    // Available sizes array
    const availableSizes = hasSizes ? Object.keys(p.sizes) : ['Free Size'];
    const gsmText = (p.gsm || p.material || '').trim();
    const sectionBadge = (p.sections && p.sections.length > 0) ? p.sections[0] : '';
    const imagesArr = (p.images && Array.isArray(p.images) && p.images.length) ? p.images : ['logo.png'];

    return `
    <div class="product-card ${isOutOfStock ? 'out-of-stock' : ''}" 
         onclick="openProductPage('${p.id}')" 
         onmouseenter="startHoverSlide('${p.id}', this.querySelector('.card-slider'))"
         onmouseleave="stopHoverSlide('${p.id}', this.querySelector('.card-slider'))">
        
        <!-- Image Area with Badges & Hover Slider -->
        <div class="product-image-box">
            ${discountBadge}
            
            <!-- Wishlist Toggle overlay -->
            <button class="card-wishlist-btn" onclick="event.stopPropagation(); handleCardWishlistToggle('${p.id}', this)" title="Add to Wishlist">
                <i data-lucide="heart" style="width: 15px; height: 15px; ${heartColor}" ${wished ? 'fill="#DC143C"' : ''}></i>
            </button>

            <!-- Fabric & Section Tag -->
            <div class="product-card-tags">
                ${gsmText ? `<span class="card-gsm-tag">${gsmText}</span>` : ''}
                ${sectionBadge ? `<span class="card-section-tag">${sectionBadge}</span>` : ''}
            </div>

            <div class="card-slider">
                ${imagesArr.map(img => `<img src="${img}" alt="${p.name}" loading="lazy">`).join('')}
            </div>
            ${imagesArr.length > 1 ? `
            <div class="card-slider-indicators">
                ${imagesArr.map((_, idx) => `<div class="card-slider-indicator-dot ${idx === 0 ? 'active' : ''}"></div>`).join('')}
            </div>
            ` : ''}
        </div>

        <!-- Detailed Product Info Section -->
        <div class="product-card-body">
            
            <!-- Category & Reviews Rating Row -->
            <div class="product-card-meta">
                <span class="product-card-category">${p.category || 'Roohira Apparel'}</span>
                <div class="product-card-rating">
                    <i data-lucide="star" style="width: 11px; height: 11px; fill: #B38738;"></i>
                    <span>${(p.rating || 5.0).toFixed(1)}</span>
                </div>
            </div>

            <!-- Product Name -->
            <h3 class="product-card-title" title="${p.name}">${p.name}</h3>
            
            <!-- Price Row -->
            <div class="product-card-pricing">
                <span class="card-price-current">Rs. ${Number(displayPrice).toLocaleString()}.00</span>
                ${displayOldPrice ? `<span class="card-price-old">Rs. ${Number(displayOldPrice).toLocaleString()}</span>` : ''}
            </div>

            <!-- Available Sizes Chips -->
            <div class="product-card-sizes">
                <span class="size-label">Sizes:</span>
                <div class="size-chips">
                    ${availableSizes.slice(0, 4).map(sz => `<span class="size-chip">${sz}</span>`).join('')}
                    ${availableSizes.length > 4 ? `<span class="size-chip-more">+${availableSizes.length - 4}</span>` : ''}
                </div>
            </div>

            <!-- Color Swatches & Action Bar -->
            <div class="product-card-footer">
                <!-- Colors Preview -->
                <div class="card-color-swatches">
                    ${(p.colors || []).slice(0, 5).map(c => {
                        const imgUrl = (p.colorImages && p.colorImages[c]) ? p.colorImages[c] : null;
                        const cName = (typeof colorNames !== 'undefined' && colorNames[c]) ? colorNames[c] : c;
                        if (imgUrl) {
                            return `<span class="swatch-circle" style="background-image: url('${imgUrl}');" title="${cName}"></span>`;
                        } else {
                            return `<span class="swatch-circle" style="background: ${c};" title="${cName}"></span>`;
                        }
                    }).join('')}
                </div>

                <!-- Quick Add Button with Feedback -->
                ${isOutOfStock ? `
                    <span class="card-sold-out-badge">Sold Out</span>
                ` : `
                    <button class="card-action-btn" onclick="event.stopPropagation(); addToCart('${p.name}', ${displayPrice}, '${imagesArr[0]}')">
                        <i data-lucide="shopping-bag" style="width: 13px; height: 13px;"></i> Add
                    </button>
                `}
            </div>

        </div>
    </div>`;
}

function renderHomePageSections() {
    // 1. Render EXCLUSIVE NEW ARRIVALS section (#new-arrivals-grid)
    const newArrivalsGrid = document.getElementById('new-arrivals-grid');
    if (newArrivalsGrid) {
        let newArrivalItems = products.filter(p => p.isNewArrival === true);
        if (!newArrivalItems.length) {
            newArrivalItems = products.slice(0, 4);
        }
        if (newArrivalItems.length > 0) {
            newArrivalsGrid.innerHTML = newArrivalItems.map(p => generateProductCardHTML(p)).join('');
        } else {
            newArrivalsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #FAF7F2; border-radius: 4px; border: 1.5px dashed rgba(139, 90, 43, 0.3);">
                    <h4 style="font-family: 'Playfair Display', serif; color: #1A120B; font-size: 1.1rem; margin-bottom: 6px;">New Collection Dropping Soon</h4>
                    <p style="color: #6D5D53; font-size: 0.88rem; margin: 0;">Check back shortly for our exclusive new seasonal arrivals.</p>
                </div>
            `;
        }
    }

    // 2. Render Signature Selection / Featured section (#product-grid)
    const featuredGrid = document.getElementById('product-grid');
    if (featuredGrid) {
        let featuredItems = products.filter(p => p.isFeatured === true);
        if (!featuredItems.length) {
            featuredItems = products.slice(0, 4);
        }
        if (featuredItems.length > 0) {
            featuredGrid.innerHTML = featuredItems.map(p => generateProductCardHTML(p)).join('');
        } else {
            featuredGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #FAF7F2; border-radius: 4px; border: 1.5px dashed rgba(139, 90, 43, 0.3);">
                    <h4 style="font-family: 'Playfair Display', serif; color: #1A120B; font-size: 1.1rem; margin-bottom: 6px;">Featured Masterpieces</h4>
                    <p style="color: #6D5D53; font-size: 0.88rem; margin: 0;">Our handpicked signature collection will be available soon.</p>
                </div>
            `;
        }
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    if (typeof initFastScrollAnimations === 'function') setTimeout(initFastScrollAnimations, 40);
}

let shopCardObserver = null;
let shopRevealFallbackBound = false;

// Safety net: reveal any card that has entered the viewport.
// Guarantees cards can never stay invisible even if IntersectionObserver is throttled.
function shopRevealFallbackCheck() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    grid.querySelectorAll('.product-card:not(.is-visible)').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < vh - 20 && rect.bottom > -20) {
            card.classList.add('is-visible');
        }
    });
}

function initShopCardReveal() {
    const grid = document.getElementById('product-grid');
    if (!grid || !document.querySelector('.shop-page')) return;
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    if (!cards.length) return;

    // Fallback: show everything immediately if IntersectionObserver is unavailable
    if (!('IntersectionObserver' in window)) {
        cards.forEach(c => c.classList.add('is-visible'));
        return;
    }

    if (shopCardObserver) shopCardObserver.disconnect();

    shopCardObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -30px 0px', threshold: 0.06 });

    cards.forEach((card, index) => {
        // Only animate cards that are not yet in view
        card.classList.remove('is-visible');
        card.style.transitionDelay = (index % 4) * 55 + 'ms';
        shopCardObserver.observe(card);
    });

    // Scroll-based safety net (runs alongside the observer)
    if (!shopRevealFallbackBound) {
        shopRevealFallbackBound = true;
        window.addEventListener('scroll', shopRevealFallbackCheck, { passive: true });
        window.addEventListener('resize', shopRevealFallbackCheck);
    }
    requestAnimationFrame(shopRevealFallbackCheck);
    setTimeout(shopRevealFallbackCheck, 350);
    setTimeout(shopRevealFallbackCheck, 1200);
}

function displayProducts(filteredProducts) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = (filteredProducts || []).map(p => generateProductCardHTML(p)).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
    initShopCardReveal();
}

let hoverIntervals = {};

function startHoverSlide(productId, sliderElement) {
    const p = products.find(prod => prod.id === productId);
    if (!p || !p.images || p.images.length <= 1) return;

    let currentIdx = 0;
    const container = sliderElement.parentElement;
    const dots = container.querySelectorAll('.card-slider-indicator-dot');

    hoverIntervals[productId] = setInterval(() => {
        currentIdx = (currentIdx + 1) % p.images.length;
        sliderElement.style.transform = `translateX(-${currentIdx * 100}%)`;
        
        dots.forEach((dot, idx) => {
            if (idx === currentIdx) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }, 1000);
}

function stopHoverSlide(productId, sliderElement) {
    if (hoverIntervals[productId]) {
        clearInterval(hoverIntervals[productId]);
        delete hoverIntervals[productId];
    }
    sliderElement.style.transform = 'translateX(0)';
    
    const container = sliderElement.parentElement;
    const dots = container.querySelectorAll('.card-slider-indicator-dot');
    dots.forEach((dot, idx) => {
        if (idx === 0) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// --- Shop Filtering System ---
let currentCategory = 'All';
let currentSubcategory = 'All';
let currentGSM = 'all';
let searchQuery = '';
let currentSort = 'default';

// true only when a *specific* (non-All) value is chosen
let categorySelected = false;
let subcategorySelected = false;

function handleSortChange(val) {
    currentSort = val;
    if (typeof renderDynamicShopCategories === 'function') {
        renderDynamicShopCategories();
    }
    filterShop();
}

function handleSearch(val) {
    searchQuery = val.trim().toLowerCase();
    filterShop();
}

function scrollToActiveButtonInContainer(containerSelector, activeSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const activeBtn = container.querySelector(activeSelector);
    if (!activeBtn) return;
    
    const containerWidth = container.getBoundingClientRect().width;
    const btnWidth = activeBtn.getBoundingClientRect().width;
    const btnLeft = activeBtn.offsetLeft;
    
    container.scrollTo({
        left: btnLeft - (containerWidth / 2) + (btnWidth / 2),
        behavior: 'smooth'
    });
}

function updateFilterVisibility() {
    const categoryRow = document.getElementById('category-row-wrapper');
    const subcategoryRow = document.getElementById('subcategory-row-wrapper');
    const gsmRow = document.getElementById('gsm-row-wrapper');

    // Category row is always visible
    if (categoryRow) categoryRow.classList.add('visible');

    // Subcategory row only appears when a specific category (not 'All', 'Blouse') is active
    if (subcategoryRow) {
        if (categorySelected && currentCategory !== 'Blouse') {
            subcategoryRow.classList.add('visible');
        } else {
            subcategoryRow.classList.remove('visible');
        }
    }

    // GSM row only appears when a specific subcategory (not 'All') is active
    if (gsmRow) {
        if (categorySelected && subcategorySelected && currentCategory !== 'Blouse') {
            gsmRow.classList.add('visible');
        } else {
            gsmRow.classList.remove('visible');
        }
    }
}

function selectCategory(cat, btn) {
    currentCategory = cat;
    // categorySelected = true only for a real category, not 'All'
    categorySelected = (cat !== 'All');
    // Whenever category changes, reset subcategory
    currentSubcategory = 'All';
    subcategorySelected = false;
    currentGSM = 'all';

    // Show/hide subcategory buttons depending on selected category
    const tshirtSubs = document.querySelectorAll('.t-shirt-sub');
    const frockSubs = document.querySelectorAll('.frock-sub');
    const subRow = document.getElementById('subcategory-row');
    if (cat === 'T-Shirts') {
        tshirtSubs.forEach(b => b.style.display = '');
        frockSubs.forEach(b => b.style.display = 'none');
        if (subRow) subRow.style.display = 'flex';
    } else if (cat === 'Frock') {
        tshirtSubs.forEach(b => b.style.display = 'none');
        frockSubs.forEach(b => b.style.display = '');
        if (subRow) subRow.style.display = 'none';
    } else {
        tshirtSubs.forEach(b => b.style.display = 'none');
        frockSubs.forEach(b => b.style.display = 'none');
        if (subRow) subRow.style.display = 'none';
    }

    // Reset subcategory buttons to 'All'
    document.querySelectorAll('.subcategory-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes("'All'")) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    // Reset GSM buttons to 'all'
    document.querySelectorAll('.gsm-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes("'all'")) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    document.querySelectorAll('.category-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes(`'${cat}'`)) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    updateFilterVisibility();
    filterShop();
    setTimeout(() => {
        scrollToActiveButtonInContainer('#category-row-wrapper .filter-scroll-container', '.category-btn.active');
    }, 100);
}

// Dynamically generate Category boxes on the Shop page from Firestore and product catalog
// Filtered strictly by selected Section (Mens, Womens, Kids, Others) per user requirements
function renderDynamicShopCategories() {
    const row = document.getElementById('category-tab-row');
    if (!row) return;

    const targetSec = (currentSection || 'All').toLowerCase();

    // 1. Gather all categories eligible for the active section
    const catSet = new Set();

    // From products in memory that match the current section
    products.forEach(p => {
        if (!p.category || typeof p.category !== 'string' || !p.category.trim()) return;
        const pSecs = (p.sections || []).map(s => s.toLowerCase());
        let matchesSec = (targetSec === 'all');
        if (!matchesSec) {
            if (targetSec === 'mens' || targetSec === 'men') {
                matchesSec = pSecs.includes('mens') || pSecs.includes('unisexs');
            } else if (targetSec === 'womens' || targetSec === 'women') {
                matchesSec = pSecs.includes('womens') || pSecs.includes('unisexs') || p.category === 'Frock' || p.category === 'Blouse';
            } else if (targetSec === 'kids' || targetSec === 'kid') {
                matchesSec = pSecs.includes('kids');
            } else if (targetSec === 'others' || targetSec === 'other') {
                matchesSec = pSecs.includes('others') || pSecs.includes('other') || pSecs.includes('unisexs');
            }
        }
        if (matchesSec) {
            catSet.add(p.category.trim());
        }
    });

    // Also inspect Firestore liveCategories section settings
    if (typeof liveCategories !== 'undefined' && Array.isArray(liveCategories)) {
        liveCategories.forEach(c => {
            if (!c.name) return;
            const cSecs = (c.sections || ['Mens', 'Womens', 'Kids', 'Others']).map(s => s.toLowerCase());
            let matches = (targetSec === 'all');
            if (!matches) {
                if (targetSec === 'mens' || targetSec === 'men') matches = cSecs.includes('mens');
                else if (targetSec === 'womens' || targetSec === 'women') matches = cSecs.includes('womens');
                else if (targetSec === 'kids' || targetSec === 'kid') matches = cSecs.includes('kids');
                else if (targetSec === 'others' || targetSec === 'other') matches = cSecs.includes('others');
            }
            if (matches) {
                catSet.add(c.name.trim());
            }
        });
    }

    const categoriesList = Array.from(catSet);

    // If current selected category is not in the filtered section categories list, reset to 'All'
    if (currentCategory !== 'All' && !categoriesList.some(cat => cat.toLowerCase() === currentCategory.toLowerCase())) {
        currentCategory = 'All';
    }

    // Build the buttons HTML
    let html = `<button class="shop-filter-btn category-btn ${currentCategory === 'All' ? 'active' : ''}" onclick="selectCategory('All', this)">All Categories</button>`;
    categoriesList.forEach(cat => {
        const isActive = (currentCategory.toLowerCase() === cat.toLowerCase());
        html += `<button class="shop-filter-btn category-btn ${isActive ? 'active' : ''}" onclick="selectCategory('${cat.replace(/'/g, "\\'")}', this)">${cat}</button>`;
    });

    row.innerHTML = html;
}

function selectSubcategory(subcat, btn) {
    currentSubcategory = subcat;
    // subcategorySelected = true only for a real subcategory, not 'All'
    subcategorySelected = (subcat !== 'All');
    // Reset GSM when subcategory changes
    currentGSM = 'all';
    document.querySelectorAll('.gsm-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes("'all'")) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    document.querySelectorAll('.subcategory-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes(`'${subcat}'`)) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    updateFilterVisibility();
    filterShop();
    setTimeout(() => {
        scrollToActiveButtonInContainer('#subcategory-row-wrapper .filter-scroll-container', '.subcategory-btn.active');
    }, 100);
}

function selectGSM(gsm, btn) {
    currentGSM = gsm;
    document.querySelectorAll('.gsm-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes(`'${gsm}'`)) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    filterShop();
    setTimeout(() => {
        scrollToActiveButtonInContainer('#gsm-row-wrapper .filter-scroll-container', '.gsm-btn.active');
    }, 100);
}

let currentSection = 'All'; // 'All', 'Mens', 'Womens', 'Kids'

function selectSection(sec, btn) {
    currentSection = sec;
    document.querySelectorAll('.section-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        const text = (b.textContent || '').trim().toLowerCase();
        if (onclickAttr.includes(`'${sec}'`) || (sec === 'All' && text.includes('all')) || (sec !== 'All' && text.includes(sec.toLowerCase()))) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });

    // Update dept badge on shop page
    const badgeRow = document.getElementById('active-dept-badge-row');
    const badgeLabel = document.getElementById('active-dept-label');
    if (badgeRow && badgeLabel) {
        if (sec && sec !== 'All') {
            const deptNames = { 'Mens': "Men's Collection", 'Womens': "Women's Collection", 'Kids': "Kids' Collection", 'Others': "Other Collections" };
            badgeLabel.textContent = '🏷 ' + (deptNames[sec] || sec);
            badgeRow.style.display = 'flex';
        } else {
            badgeRow.style.display = 'none';
        }
    }

    // Rebuild categories for the selected section
    if (typeof renderDynamicShopCategories === 'function') {
        renderDynamicShopCategories();
    }

    filterShop();
}

function filterShop() {
    let filtered = products;

    // 0. Filter by Department / Section (Mens, Womens, Kids)
    if (currentSection && currentSection !== 'All') {
        const targetSec = currentSection.toLowerCase();
        filtered = filtered.filter(p => {
            const secs = (p.sections || []).map(s => s.toLowerCase());
            if (targetSec === 'mens' || targetSec === 'men') {
                return secs.includes('mens') || secs.includes('unisexs');
            } else if (targetSec === 'womens' || targetSec === 'women') {
                return secs.includes('womens') || secs.includes('unisexs') || p.category === 'Frock' || p.category === 'Blouse';
            } else if (targetSec === 'kids' || targetSec === 'kid') {
                return secs.includes('kids');
            } else if (targetSec === 'others' || targetSec === 'other') {
                return secs.includes('others') || secs.includes('other') || secs.includes('unisexs');
            }
            return true;
        });
    }

    // 1. Filter by Category
    if (currentCategory !== 'All') {
        if (currentCategory === 'T-Shirts') {
            filtered = filtered.filter(p => (p.category || '').toLowerCase().includes('tee') || (p.category || '').toLowerCase().includes('t-shirt') || (p.category || '').toLowerCase().includes('waffle'));
        } else {
            filtered = filtered.filter(p => (p.category || '').toLowerCase() === currentCategory.toLowerCase());
        }
    }

    // 2. Filter by Subcategory (Regular Tee, Oversized Tee)
    if (currentSubcategory !== 'All') {
        filtered = filtered.filter(p => p.category === currentSubcategory);
    }

    // 3. Filter by GSM
    if (currentGSM !== 'all') {
        filtered = filtered.filter(p => p.gsm === currentGSM);
    }

    // 4. Filter by Search Query
    if (searchQuery !== '') {
        filtered = filtered.filter(p => {
            const name = p.name.toLowerCase();
            const desc = (p.desc || '').toLowerCase();
            const category = (p.category || '').toLowerCase();
            const sections = (p.sections || []).map(s => s.toLowerCase());

            // 1. Direct includes match
            if (name.includes(searchQuery) || desc.includes(searchQuery) || category.includes(searchQuery)) {
                return true;
            }

            // 2. Synonyms and clothing type mapping
            const isTeeQuery = searchQuery.includes('t shirt') || searchQuery.includes('t-shirt') || searchQuery.includes('tee') || searchQuery.includes('te-shirt') || searchQuery.includes('tshirt');
            const isOversizedQuery = searchQuery.includes('oversize') || searchQuery.includes('oversized');
            const isKidsQuery = searchQuery.includes('kid') || searchQuery.includes('child');
            const isMensQuery = searchQuery.includes('men') || searchQuery.includes('boy');
            const isWomensQuery = searchQuery.includes('women') || searchQuery.includes('girl') || searchQuery.includes('lady') || searchQuery.includes('ladies');
            const isFrockQuery = searchQuery.includes('frock') || searchQuery.includes('dress');

            // If query is for a T-shirt and product is a T-shirt
            if (isTeeQuery && (category.includes('tee') || category.includes('t-shirt') || category.includes('t shirt'))) {
                // If it is also an oversized query, ensure product is oversized
                if (isOversizedQuery && !category.includes('oversized')) {
                    return false;
                }
                // If it's a kids query, check sections
                if (isKidsQuery && !sections.includes('kids')) {
                    return false;
                }
                return true;
            }

            // Kids clothing query
            if (isKidsQuery && sections.includes('kids')) {
                return true;
            }

            // Men's clothing query
            if (isMensQuery && (sections.includes('mens') || sections.includes('unisexs'))) {
                return true;
            }

            // Women's clothing query
            if (isWomensQuery && (sections.includes('womens') || sections.includes('unisexs'))) {
                return true;
            }

            // Frock or dress query
            if (isFrockQuery && (name.includes('frock') || name.includes('dress') || desc.includes('frock') || desc.includes('dress'))) {
                return true;
            }

            return false;
        });
    }

    // 5. Sort Products
    if (typeof currentSort !== 'undefined' && currentSort !== 'default') {
        filtered = [...filtered].sort((a, b) => {
            const getPrice = (item) => {
                if (item.sizes) {
                    const firstKey = Object.keys(item.sizes)[0];
                    if (firstKey && item.sizes[firstKey].price) return item.sizes[firstKey].price;
                }
                return item.price || 0;
            };

            if (currentSort === 'price-low') {
                return getPrice(a) - getPrice(b);
            } else if (currentSort === 'price-high') {
                return getPrice(b) - getPrice(a);
            } else if (currentSort === 'name-asc') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });
    }

    displayProducts(filtered);

    // Results counter
    const countEl = document.getElementById('shop-results-count');
    if (countEl) {
        const secLabel = (currentSection && currentSection !== 'All') ? currentSection : '';
        countEl.textContent = filtered.length + (filtered.length === 1 ? ' product' : ' products') + (secLabel ? ' in ' + secLabel : '');
    }

    // Empty State if 0 matching products
    const grid = document.getElementById('product-grid');
    if (grid && filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; animation: fadeIn 0.5s ease;">
                <div class="glass" style="display: inline-block; padding: 40px 60px; border-radius: 24px; border: 1px dashed var(--border-color); max-width: 450px;">
                    <i data-lucide="shopping-bag" style="width: 48px; height: 48px; color: var(--accent-gold); margin-bottom: 20px; stroke-width: 1.5;"></i>
                    <h3 style="margin-bottom: 10px; font-weight: 800; font-size: 1.3rem;">No Products Found</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">We couldn't find any products in this category. Stay tuned for the next drop!</p>
                </div>
            </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

function filterProducts(category) {
    if (category === 'Regular Tee (Printed)' || category === 'Oversized Tee (Printed)') {
        // Set category first, then subcategory
        currentCategory = 'T-Shirts';
        categorySelected = true;
        currentSubcategory = category;
        subcategorySelected = true;
        currentGSM = 'all';
        // Show T-shirt subs, hide frock subs
        document.querySelectorAll('.t-shirt-sub').forEach(b => b.style.display = '');
        document.querySelectorAll('.frock-sub').forEach(b => b.style.display = 'none');
        // Update button states
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'T-Shirts'"));
        });
        document.querySelectorAll('.subcategory-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes(`'${category}'`));
        });
        document.querySelectorAll('.gsm-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'all'"));
        });
    } else if (category === 'Frock' || category === 'Frocks') {
        currentCategory = 'Frock';
        categorySelected = true;
        currentSubcategory = 'All';
        subcategorySelected = false;
        currentGSM = 'all';
        // Show frock subs, hide t-shirt subs
        document.querySelectorAll('.t-shirt-sub').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.frock-sub').forEach(b => b.style.display = '');
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'Frock'"));
        });
        document.querySelectorAll('.subcategory-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'All'"));
        });
        document.querySelectorAll('.gsm-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'all'"));
        });
    } else if (category === 'Blouse' || category === 'Blouses') {
        currentCategory = 'Blouse';
        categorySelected = true;
        currentSubcategory = 'All';
        subcategorySelected = false;
        currentGSM = 'all';
        document.querySelectorAll('.t-shirt-sub').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.frock-sub').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'Blouse'"));
        });
        document.querySelectorAll('.subcategory-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'All'"));
        });
        document.querySelectorAll('.gsm-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'all'"));
        });
    } else if (category === 'T-Shirts' || category === 't-shirts') {
        currentCategory = 'T-Shirts';
        categorySelected = true;
        currentSubcategory = 'All';
        subcategorySelected = false;
        currentGSM = 'all';
        document.querySelectorAll('.t-shirt-sub').forEach(b => b.style.display = '');
        document.querySelectorAll('.frock-sub').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'T-Shirts'"));
        });
        document.querySelectorAll('.subcategory-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'All'"));
        });
        document.querySelectorAll('.gsm-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'all'"));
        });
    } else {
        currentCategory = 'All';
        categorySelected = false;
        currentSubcategory = 'All';
        subcategorySelected = false;
        currentGSM = 'all';
        document.querySelectorAll('.t-shirt-sub').forEach(b => b.style.display = '');
        document.querySelectorAll('.frock-sub').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'All'"));
        });
        document.querySelectorAll('.subcategory-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'All'"));
        });
        document.querySelectorAll('.gsm-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'all'"));
        });
    }
    updateFilterVisibility();
    const subRowEl = document.getElementById('subcategory-row');
    if (subRowEl) subRowEl.style.display = (currentCategory === 'T-Shirts') ? 'flex' : 'none';
    filterShop();
}


function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    const grandElement = document.getElementById('cart-total-grand');
    if (!cartContainer) return;
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-empty">
                <div class="empty-ic"><i data-lucide="shopping-bag"></i></div>
                <h3>Your Shopping Bag is Empty</h3>
                <p>Explore handcrafted luxury pieces from our latest collection.</p>
                <a href="shop.html" class="acct-btn acct-btn--primary">
                    <span>Explore Shop</span>
                    <i data-lucide="arrow-right"></i>
                </a>
            </div>
        `;
        if (totalElement) totalElement.innerText = 'Rs. 0.00';
        if (grandElement) grandElement.innerText = 'Rs. 0.00';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
    }
    let html = '', total = 0;
    cart.forEach((item, index) => {
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        total += itemTotal;
        const colorName = typeof resolveFriendlyColorName === 'function' ? resolveFriendlyColorName(item.color) : (item.color || 'Default');
        const imgSrc = item.image || 'logo.png';

        html += `
            <div class="cart-card">
                <img src="${imgSrc}" alt="${item.name}" class="cart-thumb">
                <div class="cart-body">
                    <div class="cart-top">
                        <h4 class="cart-name">${item.name}</h4>
                        <button onclick="removeFromCart(${index})" class="cart-remove" title="Remove Item">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                    <div class="cart-tags">
                        <span class="cart-tag">Size: ${item.size || 'Free'}</span>
                        <span class="cart-tag cart-tag--muted">Color: ${colorName}</span>
                    </div>
                    <div class="cart-foot">
                        <div class="qty-step">
                            <button onclick="updateQuantity(${index}, -1)" aria-label="Decrease quantity">-</button>
                            <span class="qty-num">${item.quantity}</span>
                            <button onclick="updateQuantity(${index}, 1)" aria-label="Increase quantity">+</button>
                        </div>
                        <div class="cart-line-total">Rs. ${itemTotal.toLocaleString()}.00</div>
                    </div>
                </div>
            </div>`;
    });
    cartContainer.innerHTML = html;
    if (totalElement) totalElement.innerText = `Rs. ${total.toLocaleString()}.00`;
    if (grandElement) grandElement.innerText = `Rs. ${total.toLocaleString()}.00`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// --- Auth System ---
let currentUser = JSON.parse(localStorage.getItem('roohira_user')) || null;

// Helper: Safely resolve whether any patron is signed in (Firebase Auth, local storage session, or admin)
function getLoggedInUser() {
    if (currentUser && (currentUser.email || currentUser.uid)) {
        return currentUser;
    }
    try {
        const local = JSON.parse(localStorage.getItem('roohira_user') || 'null');
        if (local && (local.email || local.uid || local.name)) {
            currentUser = local;
            return local;
        }
    } catch (e) {}
    if (typeof auth !== 'undefined' && auth && auth.currentUser) {
        const fbUser = {
            uid: auth.currentUser.uid,
            name: auth.currentUser.displayName || auth.currentUser.email.split('@')[0],
            email: auth.currentUser.email
        };
        try { localStorage.setItem('roohira_user', JSON.stringify(fbUser)); } catch (e) {}
        currentUser = fbUser;
        return fbUser;
    }
    return null;
}

function isUserLoggedIn() {
    return getLoggedInUser() !== null;
}

function closeAuthRequiredModal() {
    const modal = document.getElementById('roohira-auth-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal && !modal.classList.contains('active')) {
                modal.remove();
            }
        }, 320);
    }
    document.body.style.overflow = '';
}

function showAuthRequiredModal(actionText = 'place your order', redirectPage = 'checkout.html') {
    let modal = document.getElementById('roohira-auth-modal');
    if (modal) modal.remove();

    const redirectUrl = encodeURIComponent(redirectPage);

    modal = document.createElement('div');
    modal.id = 'roohira-auth-modal';
    modal.innerHTML = `
        <div class="roohira-auth-backdrop" onclick="closeAuthRequiredModal()"></div>
        <div class="roohira-auth-dialog">
            <button class="roohira-auth-close" onclick="closeAuthRequiredModal()" aria-label="Close">&times;</button>
            <div class="roohira-auth-badge">
                <div class="roohira-auth-icon-circle">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
            </div>
            <div class="roohira-auth-brand">ROOHIRA COLLECTION</div>
            <h3 class="roohira-auth-title">Sign In Required</h3>
            <p class="roohira-auth-subtitle">
                Order එක තහවුරු කිරීමට කරුණාකර ඔබගේ <b>Roohira Account</b> එකට Sign In වන්න.<br>
                ගිණුමක් නොමැතිනම් මිනිත්තුවකින් නොමිලේ Create කරගත හැක.
            </p>
            <div class="roohira-auth-perks">
                <div class="roohira-auth-perk"><span class="perk-dot">✦</span> Safe & Encrypted Checkout</div>
                <div class="roohira-auth-perk"><span class="perk-dot">✦</span> Instant WhatsApp & E-Invoice</div>
                <div class="roohira-auth-perk"><span class="perk-dot">✦</span> Live Order Tracking</div>
            </div>
            <div class="roohira-auth-actions">
                <a href="login.html?redirect=${redirectUrl}" class="roohira-auth-btn-primary">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    <span>Sign In to My Account</span>
                </a>
                <a href="signup.html?redirect=${redirectUrl}" class="roohira-auth-btn-secondary">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                    <span>Create New Account</span>
                </a>
            </div>
            <button class="roohira-auth-cancel-btn" onclick="closeAuthRequiredModal()">Continue Browsing</button>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
}

// Sync Auth State with Firebase
if (typeof auth !== 'undefined' && auth) {
    auth.onAuthStateChanged(user => {
        if (user) {
            if (typeof db !== 'undefined' && db) {
                db.collection('users').doc(user.uid).get().then(doc => {
                    if (doc.exists) {
                        const userData = doc.data();
                        const syncedUser = { uid: user.uid, name: userData.name, email: user.email, phone: userData.phone || '', address: userData.address || '' };
                        localStorage.setItem('roohira_user', JSON.stringify(syncedUser));
                        currentUser = syncedUser;
                    } else {
                        // Auto-create Firestore doc for existing Auth users who signed up before Firestore was configured
                        const autoData = { uid: user.uid, name: user.displayName || user.email.split('@')[0], email: user.email, phone: '', address: '', createdAt: new Date().toISOString() };
                        db.collection('users').doc(user.uid).set(autoData).catch(err => console.warn('Auto user doc create failed:', err));
                        localStorage.setItem('roohira_user', JSON.stringify(autoData));
                        currentUser = autoData;
                    }
                    startNotificationListener();
                }).catch(err => {
                    console.warn("User profile sync note:", err);
                    startNotificationListener();
                });
            }
        } else {
            // Transient unauthenticated or initializing state from Firebase Auth.
            // DO NOT wipe localStorage.roohira_user here because on page refresh
            // Firebase Auth starts with user=null while restoring session from IndexedDB.
            // Only user-initiated logout() should clear localStorage.roohira_user.
            if (notificationListenerUnsubscribe) {
                notificationListenerUnsubscribe();
                notificationListenerUnsubscribe = null;
            }
        }
    });
}

function login(email, password, onError) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass  = (password || '').trim();

    if (!cleanEmail || !cleanPass) {
        if (onError) onError('Email සහ Password ඇතුළත් කරන්න.');
        return;
    }

    // 1. SPECIFIC ADMIN AUTHENTICATION CHECK
    if (cleanEmail === 'adminroohira@gmail.com' && cleanPass === 'admin2008') {
        const adminData = {
            uid: 'admin_roohira_executive',
            name: 'Roohira Administrator',
            email: 'adminroohira@gmail.com',
            phone: '0757218786',
            role: 'admin',
            isAdmin: true
        };
        localStorage.setItem('roohira_admin', 'true');
        localStorage.setItem('roohira_user', JSON.stringify(adminData));
        currentUser = adminData;

        // Sync with Firebase Auth in background if possible
        if (typeof auth !== 'undefined' && auth) {
            auth.signInWithEmailAndPassword('adminroohira@gmail.com', 'admin2008').catch(() => {
                auth.createUserWithEmailAndPassword('adminroohira@gmail.com', 'admin2008').catch(() => {});
            });
        }

        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 300);
        return;
    }

    // Check for redirect parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirect') || 'profile.html';

    // Check local accounts storage
    let localUsers = [];
    try { localUsers = JSON.parse(localStorage.getItem('roohira_local_users') || '[]'); } catch(e) {}
    const foundLocal = localUsers.find(u => u.email && u.email.toLowerCase() === cleanEmail && u.password === cleanPass);

    if (typeof auth !== 'undefined' && auth) {
        auth.signInWithEmailAndPassword(cleanEmail, cleanPass)
            .then((userCredential) => {
                const user = userCredential.user;
                if (typeof db !== 'undefined' && db) {
                    db.collection('users').doc(user.uid).get().then(doc => {
                        if (doc.exists && doc.data().blocked === true) {
                            auth.signOut();
                            if (onError) onError('⛔ ඔබගේ account එක block කර ඇත. Admin හා සම්බන්ධ වන්න.');
                            return;
                        }
                        const userData = doc.exists
                            ? { uid: user.uid, name: doc.data().name || user.displayName || user.email.split('@')[0], email: user.email, phone: doc.data().phone||'', address: doc.data().address||'' }
                            : { uid: user.uid, name: user.displayName || user.email.split('@')[0], email: user.email };
                        localStorage.setItem('roohira_user', JSON.stringify(userData));
                        currentUser = userData;
                        window.location.href = redirectTo;
                    }).catch(() => {
                        const quickUser = { uid: user.uid, name: user.displayName || user.email.split('@')[0], email: user.email };
                        localStorage.setItem('roohira_user', JSON.stringify(quickUser));
                        currentUser = quickUser;
                        window.location.href = redirectTo;
                    });
                } else {
                    const quickUser = { uid: user.uid, name: user.displayName || user.email.split('@')[0], email: user.email };
                    localStorage.setItem('roohira_user', JSON.stringify(quickUser));
                    currentUser = quickUser;
                    window.location.href = redirectTo;
                }
            })
            .catch((error) => {
                console.warn('Firebase signIn error:', error);
                // Check if account exists in local fallback store
                if (foundLocal) {
                    const safeUser = { uid: foundLocal.uid, name: foundLocal.name, email: foundLocal.email, phone: foundLocal.phone, address: foundLocal.address };
                    localStorage.setItem('roohira_user', JSON.stringify(safeUser));
                    currentUser = safeUser;
                    window.location.href = redirectTo;
                    return;
                }

                let msg = 'Login කිරීම අසාර්ථක විය. නැවත උත්සාහ කරන්න.';
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    msg = 'Email හෝ Password වැරදියි. කරුණාකර නිවැරදි තොරතුරු ඇතුළත් කරන්න.';
                } else if (error.code === 'auth/invalid-email') {
                    msg = 'Email ලිපිනයේ ආකෘතිය වැරදියි.';
                } else if (error.code === 'auth/too-many-requests') {
                    msg = 'ඉතා වාර ගණනක් උත්සාහ කර ඇත. මඳ වේලාවකින් නැවත උත්සාහ කරන්න.';
                } else if (error.code === 'auth/operation-not-allowed') {
                    msg = 'Firebase Authentication සක්‍රීය කර නැත. කරුණාකර Firebase Console > Authentication හි Email/Password provider සක්‍රීය කරන්න.';
                } else if (error.code === 'auth/network-request-failed') {
                    msg = 'අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කර නැවත උත්සාහ කරන්න.';
                }
                if (onError) onError(msg); else alert(msg);
            });
    } else if (foundLocal) {
        const safeUser = { uid: foundLocal.uid, name: foundLocal.name, email: foundLocal.email, phone: foundLocal.phone, address: foundLocal.address };
        localStorage.setItem('roohira_user', JSON.stringify(safeUser));
        currentUser = safeUser;
        window.location.href = redirectTo;
    } else {
        if (onError) onError('Authentication සේවාව සම්බන්ධ කරගත නොහැක.');
    }
}

function signup(name, email, password, phone, address, onError) {
    const cleanName    = (name || '').trim();
    const cleanEmail   = (email || '').trim().toLowerCase();
    const cleanPass    = (password || '').trim();
    const cleanPhone   = (phone || '').trim();
    const cleanAddress = (address || '').trim();

    if (!cleanName || !cleanEmail || !cleanPass) {
        if (onError) onError('අවශ්‍ය සියලුම තොරතුරු ඇතුළත් කරන්න.');
        return;
    }

    // Check for redirect parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirect') || 'profile.html';

    let localUsers = [];
    try { localUsers = JSON.parse(localStorage.getItem('roohira_local_users') || '[]'); } catch(e) {}
    const existingIndex = localUsers.findIndex(u => u.email && u.email.toLowerCase() === cleanEmail);

    const localAccountData = {
        uid: 'local_' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        password: cleanPass,
        phone: cleanPhone,
        address: cleanAddress,
        createdAt: new Date().toISOString()
    };

    if (typeof auth !== 'undefined' && auth) {
        auth.createUserWithEmailAndPassword(cleanEmail, cleanPass)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    uid: user.uid,
                    name: cleanName,
                    email: cleanEmail,
                    phone: cleanPhone,
                    address: cleanAddress,
                    createdAt: new Date().toISOString()
                };

                // Sync display name with Firebase Auth
                if (user.updateProfile) {
                    user.updateProfile({ displayName: cleanName }).catch(() => {});
                }

                // Update local accounts
                if (existingIndex >= 0) localUsers[existingIndex] = { ...userData, password: cleanPass };
                else localUsers.push({ ...userData, password: cleanPass });
                localStorage.setItem('roohira_local_users', JSON.stringify(localUsers));

                // Set session
                localStorage.setItem('roohira_user', JSON.stringify(userData));
                currentUser = userData;

                if (typeof db !== 'undefined' && db) {
                    db.collection('users').doc(user.uid).set(userData)
                        .then(() => {
                            window.location.href = redirectTo;
                        })
                        .catch(err => {
                            console.warn('Firestore user save note:', err);
                            // Do NOT delete the created auth user!
                            window.location.href = redirectTo;
                        });
                } else {
                    window.location.href = redirectTo;
                }
            })
            .catch((error) => {
                console.warn('Firebase createUser error:', error);

                if (error.code === 'auth/email-already-in-use') {
                    if (onError) onError('මෙම Email ලිපිනය දැනටමත් ලියාපදිංචි කර ඇත. කරුණාකර Login වන්න.');
                    return;
                }
                if (error.code === 'auth/weak-password') {
                    if (onError) onError('මුරපදය ප්‍රමාණවත් තරම් ශක්තිමත් නැත. අවම වශයෙන් අකුරු 6ක් භාවිතා කරන්න.');
                    return;
                }
                if (error.code === 'auth/invalid-email') {
                    if (onError) onError('ඇතුළත් කළ Email ලිපිනය වලංගු නොවේ.');
                    return;
                }

                // If Firebase Auth provider is disabled in console or network fails, fallback to local registration
                if (error.code === 'auth/operation-not-allowed' || error.code === 'auth/network-request-failed' || error.code === 'auth/configuration-not-found') {
                    if (existingIndex >= 0) {
                        if (onError) onError('මෙම Email ලිපිනය දැනටමත් ලියාපදිංචි කර ඇත. කරුණාකර Login වන්න.');
                        return;
                    }
                    localUsers.push(localAccountData);
                    localStorage.setItem('roohira_local_users', JSON.stringify(localUsers));
                    const safeUser = { uid: localAccountData.uid, name: cleanName, email: cleanEmail, phone: cleanPhone, address: cleanAddress };
                    localStorage.setItem('roohira_user', JSON.stringify(safeUser));
                    currentUser = safeUser;

                    if (typeof db !== 'undefined' && db) {
                        db.collection('users').doc(safeUser.uid).set(safeUser).catch(() => {});
                    }
                    window.location.href = redirectTo;
                    return;
                }

                let msg = 'Account create කිරීම අසාර්ථක විය: ' + (error.message || 'නැවත උත්සාහ කරන්න.');
                if (onError) onError(msg);
            });
    } else {
        // Fallback local registration
        if (existingIndex >= 0) {
            if (onError) onError('මෙම Email ලිපිනය දැනටමත් ලියාපදිංචි කර ඇත. කරුණාකර Login වන්න.');
            return;
        }
        localUsers.push(localAccountData);
        localStorage.setItem('roohira_local_users', JSON.stringify(localUsers));
        const safeUser = { uid: localAccountData.uid, name: cleanName, email: cleanEmail, phone: cleanPhone, address: cleanAddress };
        localStorage.setItem('roohira_user', JSON.stringify(safeUser));
        currentUser = safeUser;
        window.location.href = redirectTo;
    }
}

function logout() {
    localStorage.removeItem('roohira_admin');
    localStorage.removeItem('roohira_user');
    currentUser = null;
    if (typeof auth !== 'undefined' && auth) {
        auth.signOut().finally(() => {
            window.location.href = 'login.html';
        });
    } else {
        window.location.href = 'login.html';
    }
}

function showNotification(message) {
    const note = document.createElement('div');
    note.className = 'glass';
    note.style.cssText = `position: fixed; bottom: 20px; right: 20px; padding: 15px 30px; border-left: 4px solid #DC143C; z-index: 10001; background: white;`;
    note.innerText = message;
    document.body.appendChild(note);
    setTimeout(() => { note.style.opacity = '0'; note.style.transition = '0.5s'; setTimeout(() => note.remove(), 500); }, 3000);
}

let notificationListenerUnsubscribe = null;

function startNotificationListener() {
    if (typeof db === 'undefined' || !db || !currentUser || !currentUser.email) return;
    
    if (notificationListenerUnsubscribe) {
        notificationListenerUnsubscribe();
    }
    
    notificationListenerUnsubscribe = db.collection('notifications')
        .where('userEmail', '==', currentUser.email)
        .where('read', '==', false)
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const notif = change.doc.data();
                    const docId = change.doc.id;
                    
                    showCustomerNotification(notif.message, notif.status);
                    
                    db.collection('notifications').doc(docId).update({ read: true })
                        .catch(err => console.error("Error marking notification as read:", err));
                }
            });
        }, err => {
            console.error("Error in notification listener:", err);
        });
}

function showCustomerNotification(message, status) {
    // Play audio alert
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            const ctx = new AudioContext();
            const playTone = (freq, start, duration) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(freq, start);
                gain.gain.setValueAtTime(0.2, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
                osc.start(start);
                osc.stop(start + duration);
            };
            const now = ctx.currentTime;
            if (status === 'confirmed') {
                playTone(523.25, now, 0.15); // C5
                playTone(659.25, now + 0.1, 0.3); // E5
            } else {
                playTone(392.00, now, 0.15); // G4
                playTone(311.13, now + 0.1, 0.3); // D#4 (sad tone)
            }
        }
    } catch (e) {
        console.warn("Could not play customer notification sound:", e);
    }

    const note = document.createElement('div');
    note.className = 'glass';
    const borderLeftColor = status === 'confirmed' ? '#22c55e' : (status === 'cancelled' ? '#ef4444' : '#DC143C');
    const titleEmoji = status === 'confirmed' ? '✅' : (status === 'cancelled' ? '❌' : '🔔');
    
    note.style.cssText = `
        position: fixed; 
        bottom: 24px; 
        right: 24px; 
        padding: 16px 24px; 
        border-left: 4px solid ${borderLeftColor}; 
        z-index: 10001; 
        background: var(--surface, white);
        color: var(--text-main, #000);
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        border-radius: 12px;
        font-family: inherit;
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s;
    `;
    
    note.innerHTML = `
        <span style="font-size: 1.2rem;">${titleEmoji}</span>
        <div style="font-size: 0.9rem; font-weight: 700;">${message}</div>
    `;
    
    document.body.appendChild(note);
    
    setTimeout(() => {
        note.style.transform = 'translateY(0)';
        note.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        note.style.transform = 'translateY(-20px)';
        note.style.opacity = '0';
        setTimeout(() => note.remove(), 400);
    }, 4500);
}

// --- Order System ---
let orders = JSON.parse(localStorage.getItem('roohira_orders')) || [];

function placeOrder() {
    if (cart.length === 0) { alert('Your cart is empty!'); return; }

    // AUTH GUARD: Patron must be signed in to place an order
    if (!isUserLoggedIn()) {
        showAuthRequiredModal('place your order', 'checkout.html');
        return;
    }

    // Check if any product in the cart is out of stock in our synced products list
    for (const item of cart) {
        const p = products.find(prod => prod.name === item.name);
        if (p && p.stock === 0) {
            alert(`Sorry, the product "${item.name}" is currently out of stock. Please remove it from your cart to complete the order.`);
            return;
        }
    }

    // Extract Billing & Customer Details
    const nameInput = document.getElementById('checkout-name');
    const emailInput = document.getElementById('checkout-email');
    const phoneInput = document.getElementById('checkout-phone');
    const phone2Input = document.getElementById('checkout-phone2');
    const addressInput = document.getElementById('checkout-address');
    const cityInput = document.getElementById('checkout-city');
    const districtInput = document.getElementById('checkout-district');
    const postalInput = document.getElementById('checkout-postal');
    const notesInput = document.getElementById('checkout-notes');
    const paymentRadio = document.querySelector('input[name="payment"]:checked');

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const phone2 = phone2Input?.value.trim() || '';
    const address = addressInput?.value.trim() || '';
    const city = cityInput?.value.trim() || '';
    const district = districtInput?.value || '';
    const postal = postalInput?.value.trim() || '';
    const notes = notesInput?.value.trim() || '';
    let paymentMethod = paymentRadio?.value || 'Cash on Delivery';
    let targetBankChoice = '';
    if (paymentMethod.includes('Bank Transfer')) {
        targetBankChoice = document.querySelector('input[name="target_bank"]:checked')?.value || "People's Bank";
        paymentMethod = `Bank Transfer (${targetBankChoice})`;
    }

    // Clear previous validation error styles
    [nameInput, emailInput, phoneInput, addressInput, cityInput, districtInput].forEach(elem => {
        if (elem) elem.closest('.checkout-form-group')?.classList.remove('field-error');
    });

    // Validate Required Fields
    let missingField = false;
    if (!name) { nameInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }
    if (!email) { emailInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }
    if (!phone) { phoneInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }
    if (!address) { addressInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }
    if (!city) { cityInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }
    if (!district) { districtInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }

    if (missingField) {
        alert('⚠️ Please fill out all required billing fields marked with an asterisk (*).');
        const firstErr = document.querySelector('.checkout-form-group.field-error');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const fullAddress = `${address}, ${city}, ${district}${postal ? ' (' + postal + ')' : ''}`;

    const now = new Date();
    const dd = now.getDate().toString().padStart(2, '0');
    const mm = (now.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = now.getFullYear();

    // Function that continues order placement once we have a safe global count
    const proceedWithOrder = (globalCount) => {
        const orderNumber = (globalCount + 1).toString().padStart(3, '0');
        const orderID = `RC-${dd}/${mm}/${yyyy}-${orderNumber}`;

        // Calculate dynamic delivery fee
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        const deliveryFee = itemCount > 3 ? 0 : 450;
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const grandTotal = subtotal + deliveryFee;

        // Prepare data for the E-Invoice
        const orderData = {
            id: orderID,
            name: name,
            email: email,
            phone: phone,
            phone2: phone2,
            address: fullAddress,
            streetAddress: address,
            city: city,
            district: district,
            postal: postal,
            notes: notes,
            paymentMethod: paymentMethod,
            targetBank: targetBankChoice,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            items: cart.map(item => {
                const p = products.find(prod => prod.name === item.name) || {};
                return {
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    color: resolveFriendlyColorName(item.color),
                    image: item.image || (p.images ? p.images[0] : ''),
                    isCustom: item.isCustom || (item.id && String(item.id).startsWith('custom-')) || false,
                    customStickers: item.customStickers || []
                };
            }),
            delivery: deliveryFee,
            subtotal: subtotal,
            grandTotal: grandTotal
        };

        // Encode order data for the URL (Safe for Unicode/Sinhala)
        const jsonStr = JSON.stringify(orderData);
        const encodedData = btoa(unescape(encodeURIComponent(jsonStr)));
        
        let baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        let whatsappBaseUrl = baseUrl;
        
        if (window.location.protocol === 'file:') {
            baseUrl = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
            baseUrl = 'file:///' + baseUrl.replace(/^\/+/g, '');
            whatsappBaseUrl = 'https://onijawathsuka39-arch.github.io/Roohira-Store/';
        } else {
            whatsappBaseUrl = baseUrl;
        }
        
        const invoiceUrl = `${baseUrl}invoice.html?data=${encodeURIComponent(encodedData)}`;
        const whatsappInvoiceUrl = `${whatsappBaseUrl}invoice.html?data=${encodeURIComponent(encodedData)}`;

        let message = `🔴 *NEW ORDER CONFIRMATION: ${orderID}*\n\n`;
        message += `👤 *Customer Name:* ${name}\n`;
        if (email) message += `✉️ *Email:* ${email}\n`;
        message += `📞 *Primary Phone:* ${phone}\n`;
        if (phone2) message += `📱 *Alt Phone:* ${phone2}\n`;
        message += `📍 *Delivery Address:* ${fullAddress}\n`;
        if (notes) message += `📝 *Notes:* ${notes}\n`;
        message += `💳 *Payment Method:* ${paymentMethod}\n`;

        if (paymentMethod.includes('People\'s Bank')) {
            message += `\n🏦 *Deposit Account (People's Bank):*\n`;
            message += `• Acc Name: Onija Wathsuka Kodithuwakku\n`;
            message += `• Acc No: 217 200 4500 29209\n`;
            message += `• Branch: Mahara\n`;
        } else if (paymentMethod.includes('HNB Bank')) {
            message += `\n🏦 *Deposit Account (HNB Bank):*\n`;
            message += `• Acc Name: Roohira Collection\n`;
            message += `• Acc No: 0840 2041 4386\n`;
        }

        message += `\n📅 *Date:* ${orderData.date} | ${orderData.time}\n\n`;
        message += `📦 *Items Ordered:*\n`;

        cart.forEach((item) => {
            const colorName = resolveFriendlyColorName(item.color);
            message += `• *${item.name}* (${item.size} | ${colorName})\n`;
            message += `  Qty: ${item.quantity} x Rs. ${item.price.toLocaleString()}\n`;
        });

        message += `\n💵 *Subtotal:* Rs. ${subtotal.toLocaleString()}.00\n`;
        message += `🚚 *Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : 'Rs. ' + deliveryFee.toLocaleString() + '.00'}\n`;
        message += `💰 *Grand Total: Rs. ${grandTotal.toLocaleString()}.00*\n\n`;

        message += `📄 *View E-Invoice:* ${whatsappInvoiceUrl}\n\n`;
        message += `Thank you for shopping with Roohira Collection!`;

        const whatsappUrl = `https://wa.me/94757218786?text=${encodeURIComponent(message)}`;

        const activePatron = getLoggedInUser();
        const dbOrder = {
            id: orderID,
            date: now.toLocaleDateString(),
            items: cart.map(item => {
                const p = (products && products.find(prod => prod.name === item.name)) || {};
                return {
                    name: item.name || '',
                    price: Number(item.price) || 0,
                    quantity: Number(item.quantity) || 1,
                    size: item.size || 'Free',
                    color: item.color ? (resolveFriendlyColorName(item.color)) : 'Default',
                    image: item.image || (p.images && p.images[0] ? p.images[0] : ''),
                    isCustom: Boolean(item.isCustom || (item.id && String(item.id).startsWith('custom-'))),
                    customStickers: Array.isArray(item.customStickers) ? item.customStickers : []
                };
            }),
            total: grandTotal,
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            userEmail: email,
            userName: name,
            userId: activePatron ? (activePatron.uid || activePatron.id || '') : '',
            userPhone: phone,
            userPhone2: phone2 || '',
            userAddress: fullAddress,
            streetAddress: address || '',
            city: city || '',
            district: district || '',
            postal: postal || '',
            notes: notes || '',
            paymentMethod: paymentMethod,
            status: 'pending',
            createdAt: new Date().toISOString(),
            timestamp: (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString())
        };
        orders.push(dbOrder);
        localStorage.setItem('roohira_orders', JSON.stringify(orders));
        
        if (typeof db !== 'undefined' && db) {
            db.collection('orders').add(dbOrder).catch(e => {
                console.warn("Order saved locally, Firestore sync note:", e);
            });
        }

        localStorage.removeItem('roohira_free_delivery_active');
        const bar = document.getElementById('free-delivery-bar');
        if (bar) bar.remove();
        cart = []; saveCart();

        // Create success modal wrapper
        const successModal = document.createElement('div');
        successModal.style.position = 'fixed';
        successModal.style.top = '0';
        successModal.style.left = '0';
        successModal.style.width = '100%';
        successModal.style.height = '100%';
        successModal.style.backgroundColor = 'rgba(10, 15, 30, 0.9)';
        successModal.style.backdropFilter = 'blur(15px)';
        successModal.style.display = 'flex';
        successModal.style.alignItems = 'center';
        successModal.style.justifyContent = 'center';
        successModal.style.zIndex = '99999';
        successModal.style.padding = '20px';

        // Spinner loader
        successModal.innerHTML = `
            <div style="text-align: center; color: #fff;">
                <div style="width: 55px; height: 55px; border: 4px solid rgba(139, 90, 43, 0.2); border-left-color: #8B5A2B; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <p style="font-weight: 700; font-size: 1.1rem; letter-spacing: 1px; font-family: 'Plus Jakarta Sans', sans-serif;">PROCESSING YOUR ORDER...</p>
                <style>
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                </style>
            </div>
        `;
        document.body.appendChild(successModal);

        // Transition to success card after 1.5s
        setTimeout(() => {
            successModal.innerHTML = `
                <div class="glass" style="max-width: 480px; width: 100%; border-radius: 20px; padding: 25px 20px; border: 2px solid #8B5A2B; box-shadow: 0 15px 35px rgba(139,90,43,0.15); text-align: center; color: #fff; background: rgba(15, 20, 35, 0.98); transform: scale(0.9); opacity: 0; transition: all 0.3s ease;">
                    <div style="width: 50px; height: 50px; background: rgba(34, 197, 94, 0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; color: #22c55e; border: 1.5px solid #22c55e;">
                        <i data-lucide="check" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.4rem; font-weight: 800; margin-bottom: 5px; color: #fff;">Order Confirmed!</h3>
                    <p style="color: #cbd5e0; font-size: 0.85rem; margin-bottom: 5px;">Your order has been recorded successfully.</p>
                    <p style="color: #8B5A2B; font-size: 0.82rem; font-weight: 800; margin-bottom: 15px;">Order ID: ${orderID}</p>
                    
                    <!-- Customer Details Box -->
                    <div style="text-align: left; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 12px 15px; border-radius: 12px; font-size: 0.82rem; color: #e2e8f0; margin-bottom: 15px; line-height: 1.6;">
                        <div style="font-weight: 700; color: #8B5A2B; margin-bottom: 6px; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Customer & Shipping Info</div>
                        <strong>Name:</strong> ${name}<br>
                        <strong>Email:</strong> ${email}<br>
                        <strong>Phone:</strong> ${phone}${phone2 ? ' / ' + phone2 : ''}<br>
                        <strong>Address:</strong> ${fullAddress}<br>
                        <strong>Payment:</strong> <span style="color:#8B5A2B; font-weight:700;">${paymentMethod}</span>
                    </div>

                    <!-- Compact Price Box -->
                    <div style="background: rgba(139, 90, 43, 0.08); padding: 12px; border-radius: 12px; margin-bottom: 18px; border: 1px solid rgba(139, 90, 43, 0.2); display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.85rem; color: #a0aec0; font-weight: 600;">Total Amount:</span>
                        <span style="color: #8B5A2B; font-size: 1.2rem; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif;">Rs. ${grandTotal.toLocaleString()}.00</span>
                    </div>

                    <p style="color: #cbd5e0; font-size: 0.88rem; font-weight: 600; margin-bottom: 12px;">Share order details to WhatsApp?</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button id="modal-wa-btn" style="width: 100%; background: #25D366; color: white; border: none; padding: 12px; font-weight: 700; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.88rem; transition: 0.2s;">
                            <i data-lucide="message-circle" style="width: 18px;"></i> Share to WhatsApp
                        </button>
                        <button id="modal-inv-btn" style="width: 100%; background: #8B5A2B; color: #FFFFFF; border: none; padding: 12px; font-weight: 700; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.88rem; transition: 0.2s; box-shadow: 0 4px 12px rgba(139,90,43,0.3);">
                            <i data-lucide="file-text" style="width: 18px;"></i> View Invoice
                        </button>
                        <a href="index.html" style="width: 100%; background: rgba(255,255,255,0.06); color: #fff; border: 1px solid rgba(255,255,255,0.15); padding: 11px; font-weight: 700; border-radius: 10px; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.88rem; transition: 0.2s;">
                            <i data-lucide="home" style="width: 18px;"></i> Go back to Home
                        </a>
                    </div>
                </div>
            `;

            // Entrance animation
            setTimeout(() => {
                const innerBox = successModal.querySelector('div');
                if (innerBox) {
                    innerBox.style.transform = 'scale(1)';
                    innerBox.style.opacity = '1';
                }
            }, 50);

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            document.getElementById('modal-wa-btn').onclick = () => {
                window.open(whatsappUrl, '_blank');
                window.location.href = invoiceUrl;
            };

            document.getElementById('modal-inv-btn').onclick = () => {
                window.location.href = invoiceUrl;
            };
        }, 1500);
    };

    // Query Firestore to get total orders count (ensures no duplicate IDs across different devices)
    if (typeof db !== 'undefined' && db) {
        db.collection('orders').get().then(snapshot => {
            const count = snapshot.size;
            proceedWithOrder(count);
        }).catch(err => {
            console.warn("Could not query orders count, falling back to local:", err);
            proceedWithOrder(orders.length);
        });
    } else {
        proceedWithOrder(orders.length);
    }
}

function clearOrderHistory() {
    if (confirm('Are you sure you want to clear your order history?')) {
        orders = orders.filter(o => o.userEmail !== currentUser.email);
        localStorage.setItem('roohira_orders', JSON.stringify(orders));
        if (typeof db !== 'undefined' && db) {
            db.collection('orders').where('userEmail', '==', currentUser.email).get().then(snapshot => {
                let deletePromises = [];
                snapshot.forEach(doc => deletePromises.push(doc.ref.delete()));
                Promise.all(deletePromises).then(() => {
                    loadProfile();
                    showNotification('Order history cleared.');
                });
            }).catch(e => {
                console.error("Error clearing orders from database:", e);
                loadProfile();
                showNotification('Order history cleared.');
            });
        } else {
            loadProfile();
            showNotification('Order history cleared.');
        }
    }
}

function loadProfile() {
    const nameEl = document.getElementById('profile-name');
    const emailEl = document.getElementById('profile-email');
    const initialEl = document.getElementById('profile-initial');
    const orderCountEl = document.getElementById('order-count');
    const historyEl = document.getElementById('order-history');

    // Re-check localStorage if currentUser is not loaded yet
    if (!currentUser) {
        try {
            currentUser = JSON.parse(localStorage.getItem('roohira_user'));
        } catch (e) {}
    }

    if (currentUser) {
        if (nameEl) nameEl.innerText = currentUser.name || 'User';
        if (emailEl) emailEl.innerText = currentUser.email || '';
        if (initialEl) initialEl.innerText = (currentUser.name || 'U').charAt(0).toUpperCase();

        const renderOrdersList = (ordersList) => {
            if (orderCountEl) orderCountEl.innerText = ordersList.length;
            if (historyEl) {
                if (ordersList.length === 0) {
                    historyEl.innerHTML = '<p style="color: var(--text-muted);">No orders found.</p>';
                } else {
                    historyEl.innerHTML = ordersList.map(o => {
                        const status = o.status || 'pending';
                        const statusColor = status === 'confirmed' ? '#22c55e' : status === 'cancelled' ? '#ef4444' : '#f59e0b';
                        const statusLabel = status === 'confirmed' ? '✅ Confirmed' : status === 'cancelled' ? '❌ Cancelled' : '🕐 Pending';
                        return `
                        <div class="glass" style="padding: 20px; margin-bottom: 15px; text-align: left;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                                <span style="font-weight: 800;">Order #${o.id.toString().slice(-6)}</span>
                                <div style="display:flex; gap:10px; align-items:center;">
                                    <span style="background:${statusColor}22; color:${statusColor}; border:1px solid ${statusColor}44; padding:3px 10px; border-radius:20px; font-size:0.78rem; font-weight:700;">${statusLabel}</span>
                                    <span style="color: var(--text-muted); font-size:0.85rem;">${o.date}</span>
                                </div>
                            </div>
                            <div style="font-size: 0.9rem; margin-bottom: 10px;">
                                ${o.items.map(i => `${i.name} (${i.size}, ${i.quantity}x)`).join(', ')}
                            </div>
                            <div style="font-weight: 800; color: #DC143C;">Total: Rs. ${o.total.toLocaleString()}.00</div>
                        </div>`;
                    }).join('');
                }
            }
        };

        if (typeof db !== 'undefined' && db) {
            db.collection('orders')
                .where('userEmail', '==', currentUser.email)
                .get()
                .then((querySnapshot) => {
                    const dbOrders = [];
                    querySnapshot.forEach((doc) => {
                        dbOrders.push(doc.data());
                    });
                    // Sort descending by date/timestamp
                    dbOrders.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
                    renderOrdersList(dbOrders);
                })
                .catch((err) => {
                    console.error("Error fetching orders from Firestore:", err);
                    const userOrders = orders.filter(o => o.userEmail === currentUser.email);
                    renderOrdersList(userOrders.reverse());
                });
        } else {
            const userOrders = orders.filter(o => o.userEmail === currentUser.email);
            renderOrdersList(userOrders.reverse());
        }
    } else {
        // Safe grace period: on page load/refresh, allow Firebase Auth / local storage to resolve
        setTimeout(() => {
            let lateUser = null;
            try { lateUser = JSON.parse(localStorage.getItem('roohira_user')); } catch (e) {}
            if (!lateUser && typeof auth !== 'undefined' && auth && !auth.currentUser) {
                if (window.location.pathname.includes('profile.html')) {
                    window.location.href = 'login.html';
                }
            } else if (lateUser) {
                currentUser = lateUser;
                loadProfile();
            }
        }, 1200);
    }
}

// Animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes pulse-red { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.7); } 70% { transform: scale(1.2); box-shadow: 0 0 0 10px rgba(220, 20, 60, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 20, 60, 0); } }
    .btn-qty { background: white; border: 1px solid #ddd; color: #000; width: 25px; height: 25px; border-radius: 5px; cursor: pointer; transition: 0.2s; font-weight: bold; }
    .btn-qty:hover { background: #000; color: white; }
    .offer-dot { position: absolute; top: -2px; right: -10px; width: 8px; height: 8px; background: #DC143C; border-radius: 50%; animation: pulse-red 2s infinite; }
`;
document.head.appendChild(styleSheet);

function handleOfferNotification() {
    const offerViewed = localStorage.getItem('roohira_offer_viewed_v2');
    const isOfferPage = window.location.pathname.includes('offers.html');
    if (isOfferPage) { localStorage.setItem('roohira_offer_viewed_v2', 'true'); }
    if (!offerViewed && !isOfferPage) {
        document.querySelectorAll('a[href="offers.html"]').forEach(link => {
            if (!link.querySelector('.offer-dot')) {
                link.style.position = 'relative';
                const dot = document.createElement('span');
                dot.className = 'offer-dot';
                link.appendChild(dot);
            }
        });
    }
}

// Exclusive Light Theme System (No toggle buttons)
function initThemeToggle() {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');

    // Remove any theme toggle buttons from DOM if present
    const mainToggle = document.getElementById('theme-toggle');
    if (mainToggle) mainToggle.remove();
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.remove();
    const mobBtn = document.getElementById('mobile-theme-toggle-btn');
    if (mobBtn) mobBtn.remove();
    const mobTog = document.getElementById('mobile-theme-toggle');
    if (mobTog) mobTog.remove();

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function toggleTheme() {
    // Light mode exclusively
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
}

// --- Free Delivery Promo Bar (Disabled) ---
function initFreeDeliveryBar() {
    return; // Bar disabled as requested
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('offer') === 'freedelivery') {
        localStorage.setItem('roohira_free_delivery_active', 'true');
        window.history.replaceState({}, document.title, 'shop.html');
    }
    
    const isActive = localStorage.getItem('roohira_free_delivery_active') === 'true';
    if (isShopPage && isActive) {
        if (!document.getElementById('free-delivery-bar')) {
            const bar = document.createElement('div');
            bar.id = 'free-delivery-bar';
            bar.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background: var(--primary-dark);
                color: var(--primary-light);
                padding: 15px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 -5px 20px rgba(0,0,0,0.2);
                transition: transform 0.3s ease;
                font-size: 1rem;
                font-weight: 500;
                border-top: 3px solid var(--accent-gold);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            `;
            document.body.appendChild(bar);
            
            if (!document.getElementById('promo-animations')) {
                const style = document.createElement('style');
                style.id = 'promo-animations';
                style.innerHTML = `
                    @keyframes celebrate {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    @keyframes pop {
                        0% { transform: scale(0.9); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        updateFreeDeliveryBar();
    }
}

function updateFreeDeliveryBar() {
    const bar = document.getElementById('free-delivery-bar');
    if (!bar) return;
    
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (itemCount >= 4) {
        bar.innerHTML = '🎉 <span style="font-weight: 800; letter-spacing: 1px;">Congratulations! You have unlocked FREE DELIVERY!</span> 🚚';
        bar.style.animation = 'celebrate 1s ease 3, pop 0.5s ease-out';
        bar.style.background = 'var(--accent-gold)';
        bar.style.color = '#fff';
        bar.style.borderTop = '3px solid #fff';
    } else {
        const needed = 4 - itemCount;
        bar.innerHTML = `<i data-lucide="shopping-bag" style="width: 20px;"></i> Buy <b style="color: var(--accent-gold); font-size: 1.2rem; margin: 0 5px;">${needed}</b> more item${needed > 1 ? 's' : ''} to get <b style="letter-spacing: 0.5px; margin-left: 5px;">FREE DELIVERY</b> Island Wide! 🚚`;
        bar.style.animation = 'pop 0.3s ease-out';
        bar.style.background = 'var(--primary-dark)';
        bar.style.color = 'var(--primary-light)';
        bar.style.borderTop = '3px solid var(--accent-gold)';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

// Wishlist Functionality
let wishlist = JSON.parse(localStorage.getItem('roohira_wishlist')) || [];

function toggleWishlist(productId) {
    wishlist = JSON.parse(localStorage.getItem('roohira_wishlist')) || [];
    const index = wishlist.indexOf(productId);
    let added = false;
    if (index === -1) {
        wishlist.push(productId);
        added = true;
    } else {
        wishlist.splice(index, 1);
    }
    localStorage.setItem('roohira_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    
    // Refresh display if we are on the wishlist page
    if (window.location.pathname.includes('wishlist.html')) {
        renderWishlist();
    }
    return added;
}

function handleCardWishlistToggle(productId, btnElement) {
    const added = toggleWishlist(productId);
    const heart = btnElement.querySelector('i');
    if (added) {
        heart.setAttribute('fill', '#DC143C');
        heart.style.color = '#DC143C';
        showNotification('Added to Wishlist!');
    } else {
        heart.removeAttribute('fill');
        heart.style.color = 'var(--text-main)';
        showNotification('Removed from Wishlist!');
    }
}

function isInWishlist(productId) {
    return wishlist.includes(productId);
}

function updateWishlistCount() {
    wishlist = JSON.parse(localStorage.getItem('roohira_wishlist')) || [];
    const counts = document.querySelectorAll('#wishlist-count');
    counts.forEach(el => {
        el.innerText = wishlist.length;
    });
}

// Store base catalog to merge with dynamic database updates cleanly
const baseStaticProducts = JSON.parse(JSON.stringify(products));
let productsListenerUnsubscribe = null;

// Function to sync products from Firestore in REAL-TIME across all devices
function syncProducts(callback) {
    // Initial responsive callback
    if (callback) {
        try { callback(); } catch (e) { console.error("Callback error:", e); }
    }

    if (typeof db === 'undefined' || !db) {
        console.warn("Firestore 'db' is not initialized yet.");
        return;
    }

    // Unsubscribe from previous listener if one exists to prevent duplicate listeners
    if (productsListenerUnsubscribe) {
        productsListenerUnsubscribe();
    }

    // Real-Time onSnapshot listener: Updates immediately on all devices whenever admin modifies products
    productsListenerUnsubscribe = db.collection('products').onSnapshot(snapshot => {
        const dbProductsMap = {};
        snapshot.forEach(doc => {
            dbProductsMap[doc.id] = { id: doc.id, ...doc.data() };
        });

        // Reset products array to pristine base catalog copy
        products.length = 0;
        baseStaticProducts.forEach(item => {
            products.push(JSON.parse(JSON.stringify(item)));
        });

        const hasDbProducts = Object.keys(dbProductsMap).length > 0;

        // 1. Apply stock, price, colors, sizes, sections & deletion updates to base products
        for (let i = products.length - 1; i >= 0; i--) {
            const p = products[i];
            const dbP = dbProductsMap[p.id];
            if (hasDbProducts && (!dbP || dbP.isDeleted === true || dbP.deleted === true)) {
                products.splice(i, 1);
                continue;
            }
            if (dbP) {
                if (dbP.status === 'out_of_stock') {
                    p.stock = 0;
                    p.stockStatus = 'out_of_stock';
                } else if (dbP.status === 'in_stock') {
                    p.stock = dbP.stock !== undefined ? Number(dbP.stock) : 10;
                    p.stockStatus = 'in_stock';
                }
                if (dbP.name) p.name = dbP.name;
                if (dbP.category) p.category = dbP.category;
                if (dbP.sections && Array.isArray(dbP.sections)) p.sections = dbP.sections;
                if (dbP.desc) p.desc = dbP.desc;
                if (dbP.description) p.desc = dbP.description;
                if (dbP.images && Array.isArray(dbP.images) && dbP.images.length) p.images = dbP.images;
                else if (dbP.image) p.images = [dbP.image];

                // Price & Old Price Sync
                if (dbP.price !== undefined) {
                    p.price = Number(dbP.price);
                }
                if (dbP.oldPrice !== undefined) {
                    p.oldPrice = Number(dbP.oldPrice);
                }

                // Sizes & Pricing Sync
                if (dbP.sizes && typeof dbP.sizes === 'object' && Object.keys(dbP.sizes).length) {
                    p.sizes = dbP.sizes;
                } else if (dbP.price !== undefined && p.sizes && typeof p.sizes === 'object') {
                    Object.keys(p.sizes).forEach(sz => {
                        if (typeof p.sizes[sz] === 'object') {
                            p.sizes[sz].price = Number(dbP.price);
                            if (dbP.oldPrice !== undefined) p.sizes[sz].oldPrice = Number(dbP.oldPrice);
                        } else {
                            p.sizes[sz] = Number(dbP.price);
                        }
                    });
                }

                // Colors Sync
                if (dbP.colors && Array.isArray(dbP.colors) && dbP.colors.length) {
                    p.colors = dbP.colors;
                }

                if (dbP.gsm !== undefined) p.gsm = dbP.gsm;
                if (dbP.material !== undefined) p.material = dbP.material;
                if (dbP.brand) p.brand = dbP.brand;
                if (dbP.sizeChartImg) p.sizeChartImg = dbP.sizeChartImg;
                if (dbP.customSpecs && typeof dbP.customSpecs === 'object') p.customSpecs = dbP.customSpecs;
                if (dbP.isNewArrival !== undefined) p.isNewArrival = (dbP.isNewArrival === true || dbP.isNewArrival === 'true');
                if (dbP.isFeatured !== undefined) p.isFeatured = (dbP.isFeatured === true || dbP.isFeatured === 'true');
                if (dbP.colorNames && typeof dbP.colorNames === 'object') {
                    p.colorNames = dbP.colorNames;
                    Object.assign(colorNames, dbP.colorNames);
                }
            }
        }

        // 2. Add dynamic products added via Admin Panel or Database Hub
        Object.keys(dbProductsMap).forEach(docId => {
            const dbP = dbProductsMap[docId];
            if (dbP.isDeleted === true || dbP.deleted === true) return;
            const exists = products.find(p => String(p.id) === String(docId));
            if (!exists) {
                const price = Number(dbP.price) || 1800;
                const oldPrice = Number(dbP.oldPrice) || (price + 200);
                const stockQty = dbP.status === 'out_of_stock' ? 0 : (dbP.stock !== undefined ? Number(dbP.stock) : 10);
                const dynamicProduct = {
                    id: String(docId),
                    name: dbP.name || 'Roohira Garment',
                    category: dbP.category || 'Regular Tee (Printed)',
                    sections: dbP.sections || ['Mens', 'Womens', 'Unisexs'],
                    images: Array.isArray(dbP.images) && dbP.images.length ? dbP.images : [dbP.image || 'logo.png'],
                    gsm: dbP.gsm || dbP.material || null,
                    material: dbP.material || dbP.gsm || null,
                    brand: dbP.brand || 'Roohira',
                    price: price,
                    oldPrice: oldPrice,
                    sizes: dbP.sizes || {
                        'Free Size': { price: price, oldPrice: oldPrice }
                    },
                    colors: Array.isArray(dbP.colors) && dbP.colors.length ? dbP.colors : ['#000000'],
                    stock: stockQty,
                    stockStatus: dbP.status || (stockQty === 0 ? 'out_of_stock' : 'in_stock'),
                    desc: dbP.desc || dbP.description || 'Exclusive luxury collection piece handcrafted by Roohira.',
                    sizeChartImg: dbP.sizeChartImg || '',
                    customSpecs: dbP.customSpecs || null,
                    colorNames: dbP.colorNames || null,
                    isNewArrival: (dbP.isNewArrival === true || dbP.isNewArrival === 'true'),
                    isFeatured: (dbP.isFeatured === true || dbP.isFeatured === 'true')
                };
                if (dbP.colorNames && typeof dbP.colorNames === 'object') {
                    Object.assign(colorNames, dbP.colorNames);
                }
                products.unshift(dynamicProduct); // Show newly added products at top
            }
        });

        console.log("⚡ [Real-Time Multi-Device Sync] Products synced successfully:", products.length);

        // Immediate dynamic UI refresh without full page reload
        const isCatalogPage = window.location.pathname.includes('shop.html') || window.location.pathname.includes('mens.html') || window.location.pathname.includes('womens.html') || window.location.pathname.includes('kids.html') || window.location.pathname.includes('other.html');
        if (isCatalogPage) {
            if (typeof renderDynamicShopCategories === 'function') renderDynamicShopCategories();
            if (typeof filterShop === 'function') filterShop();
            else if (typeof filterProducts === 'function') {
                const urlParams = new URLSearchParams(window.location.search);
                const catParam = urlParams.get('category');
                filterProducts(catParam || 'All');
            }
        }
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            if (typeof renderHomePageSections === 'function') renderHomePageSections();
            else if (typeof displayProducts === 'function') displayProducts(products.slice(0, 4));
            if (typeof renderHomeDepartmentProducts === 'function') renderHomeDepartmentProducts();
        }
        if (window.location.pathname.includes('wishlist.html')) {
            if (typeof renderWishlist === 'function') renderWishlist();
        }
        if (window.location.pathname.includes('product-detail.html')) {
            if (typeof loadAndRenderProductDetail === 'function') {
                loadAndRenderProductDetail();
            } else {
                const urlParams = new URLSearchParams(window.location.search);
                const pid = urlParams.get('id') || '1';
                const currentProduct = products.find(p => String(p.id) === String(pid));
                if (currentProduct) {
                    const priceEl = document.getElementById('detail-price');
                    if (priceEl) {
                        const curP = (currentProduct.sizes && currentProduct.sizes['M']) ? currentProduct.sizes['M'].price : (currentProduct.price || 1800);
                        const oldP = (currentProduct.sizes && currentProduct.sizes['M']) ? currentProduct.sizes['M'].oldPrice : currentProduct.oldPrice;
                        let html = `Rs. ${curP.toLocaleString()}.00`;
                        if (oldP) html += ` <span class="old-price">Rs. ${oldP.toLocaleString()}</span>`;
                        priceEl.innerHTML = html;
                    }
                    const addToCartBtn = document.getElementById('add-to-cart-btn');
                    if (addToCartBtn) {
                        if (currentProduct.stock === 0) {
                            addToCartBtn.innerHTML = '<i data-lucide="slash"></i> OUT OF STOCK';
                            addToCartBtn.disabled = true;
                            addToCartBtn.style.background = '#888';
                            addToCartBtn.style.opacity = '0.6';
                            addToCartBtn.style.cursor = 'not-allowed';
                        } else {
                            addToCartBtn.innerHTML = '<i data-lucide="shopping-bag"></i> ADD TO CART';
                            addToCartBtn.disabled = false;
                            addToCartBtn.style.background = '';
                            addToCartBtn.style.opacity = '1';
                            addToCartBtn.style.cursor = 'pointer';
                        }
                    }
                }
            }
            if (window.lucide) lucide.createIcons();
        }

        document.dispatchEvent(new CustomEvent('productsSynced', { detail: products }));
    }, err => {
        console.error("Firestore onSnapshot error:", err);
    });
}

window.liveCategories = window.liveCategories || [];
var liveCategories = window.liveCategories;

function syncCategoriesListener() {
    if (typeof db === 'undefined' || !db) return;
    db.collection('categories').onSnapshot(snap => {
        window.liveCategories = [];
        snap.forEach(doc => {
            const data = doc.data();
            if (data && data.name) window.liveCategories.push({ id: doc.id, ...data });
        });
        liveCategories = window.liveCategories;
        const isCatalogPage2 = window.location.pathname.includes('shop.html') || window.location.pathname.includes('mens.html') || window.location.pathname.includes('womens.html') || window.location.pathname.includes('kids.html') || window.location.pathname.includes('other.html');
        if (isCatalogPage2) {
            if (typeof renderDynamicShopCategories === 'function') renderDynamicShopCategories();
        }
    }, err => console.warn('Categories live sync note:', err));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Show the correct cart / wishlist counts immediately from localStorage,
    // without waiting for the Firestore product sync to finish. This keeps the
    // navbar numbers consistent on every page.
    updateCartCount();
    updateWishlistCount();

    syncCategoriesListener();
    syncProducts(() => {
        initThemeToggle();
        updateCartCount();
        updateWishlistCount();
        handleOfferNotification();
        if (window.location.pathname.includes('cart.html')) { renderCart(); }
        if (window.location.pathname.includes('profile.html')) { loadProfile(); }
        if (window.location.pathname.includes('wishlist.html')) { renderWishlist(); }
        const isCatalogPage3 = window.location.pathname.includes('shop.html') || window.location.pathname.includes('mens.html') || window.location.pathname.includes('womens.html') || window.location.pathname.includes('kids.html') || window.location.pathname.includes('other.html');
        if (isCatalogPage3) {
            const urlParams = new URLSearchParams(window.location.search);
            const catParam = urlParams.get('category');
            catParam ? filterProducts(catParam) : filterProducts('All');
            if (typeof renderDynamicShopCategories === 'function') renderDynamicShopCategories();
        }
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            if (typeof renderHomePageSections === 'function') renderHomePageSections();
            else if (typeof displayProducts === 'function') displayProducts(products.slice(0, 4));
        }
        if ((window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) && currentUser) {
            window.location.href = 'profile.html';
        }
        if (typeof lucide !== 'undefined') { lucide.createIcons(); }
        
        // Trigger a custom event to notify that products are synced
        document.dispatchEvent(new CustomEvent('productsSynced'));
    });

    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const closeBtn = document.getElementById('close-menu');
    if (menuBtn && mobileMenu && overlay) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
        });
        const closeHandler = () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        };
        overlay.addEventListener('click', closeHandler);
        if (closeBtn) closeBtn.addEventListener('click', closeHandler);
    }
    
    // Initialize Free Delivery Promo Bar if needed
    if (typeof initFreeDeliveryBar === 'function') {
        initFreeDeliveryBar();
    }
});

// ===== NEW DROP WAITLIST =====
function handleNewDropWaitlist() {
    const nameInput  = document.getElementById('nd-name-input');
    const phoneInput = document.getElementById('nd-phone-input');
    const btn        = document.getElementById('nd-notify-btn');
    const msg        = document.getElementById('nd-notify-msg');

    const name  = nameInput  ? nameInput.value.trim()  : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    // Reset message
    msg.className = 'nd-notify-msg';

    // Validation
    if (!name) {
        msg.textContent = '⚠️ Please enter your name.';
        msg.classList.add('error');
        if (nameInput) nameInput.focus();
        return;
    }
    if (!phone || !/^[0-9+\s\-]{7,15}$/.test(phone)) {
        msg.textContent = '⚠️ Please enter a valid phone number.';
        msg.classList.add('error');
        if (phoneInput) phoneInput.focus();
        return;
    }

    // Disable button to prevent double-submit
    if (btn) { btn.disabled = true; btn.textContent = 'Joining...'; }

    const waitlistEntry = { name: name, phone: phone, joinedAt: new Date().toISOString() };

    if (typeof db !== 'undefined' && db) {
        db.collection('waitlist').where('phone', '==', phone).get()
            .then(snap => {
                if (!snap.empty) {
                    msg.textContent = '✅ You are already on the waitlist!';
                    msg.classList.add('success');
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = '<i data-lucide="bell" style="width:16px;height:16px;"></i> Join Waitlist';
                        if (window.lucide) lucide.createIcons();
                    }
                    return;
                }
                
                db.collection('waitlist').add(waitlistEntry)
                    .then(() => {
                        msg.textContent = '🎉 You are successfully added to the waitlist!';
                        msg.classList.add('success');
                        
                        // Clear inputs
                        if (nameInput)  nameInput.value  = '';
                        if (phoneInput) phoneInput.value = '';
                        
                        // Save to localStorage waitlist
                        const waitlist = JSON.parse(localStorage.getItem('roohira_waitlist') || '[]');
                        // Filter out old phone entry if any to clean local cache
                        const filteredWaitlist = waitlist.filter(e => e.phone !== phone);
                        filteredWaitlist.push(waitlistEntry);
                        localStorage.setItem('roohira_waitlist', JSON.stringify(filteredWaitlist));
                    })
                    .catch(e => {
                        console.error("Error saving to waitlist database:", e);
                        msg.textContent = '⚠️ Error: Waitlist entry could not be saved to Firestore.';
                        msg.classList.add('error');
                    })
                    .finally(() => {
                        if (btn) {
                            btn.disabled = false;
                            btn.innerHTML = '<i data-lucide="bell" style="width:16px;height:16px;"></i> Join Waitlist';
                            if (window.lucide) lucide.createIcons();
                        }
                    });
            })
            .catch(e => {
                console.error("Error checking waitlist database:", e);
                // Fallback to direct insertion if lookup fails
                db.collection('waitlist').add(waitlistEntry)
                    .then(() => {
                        msg.textContent = '🎉 You are successfully added to the waitlist!';
                        msg.classList.add('success');
                        if (nameInput)  nameInput.value  = '';
                        if (phoneInput) phoneInput.value = '';
                    })
                    .catch(err => {
                        console.error(err);
                        msg.textContent = '⚠️ Error: Waitlist entry could not be saved.';
                        msg.classList.add('error');
                    })
                    .finally(() => {
                        if (btn) {
                            btn.disabled = false;
                            btn.innerHTML = '<i data-lucide="bell" style="width:16px;height:16px;"></i> Join Waitlist';
                            if (window.lucide) lucide.createIcons();
                        }
                    });
            });
    } else {
        // No firebase configuration loaded
        msg.textContent = '⚠️ Database connection is not available.';
        msg.classList.add('error');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i data-lucide="bell" style="width:16px;height:16px;"></i> Join Waitlist';
            if (window.lucide) lucide.createIcons();
        }
    }
}

// ========================================================
// HOME PAGE: 3 DEPARTMENT CARDS (MEN, WOMEN, KIDS) SHOWCASE
// ========================================================
let currentHomeDepartment = 'Mens'; // 'Mens', 'Womens', 'Kids'

function switchHomeDepartment(dept) {
    currentHomeDepartment = dept;
    const norm = dept.toLowerCase();

    ['mens', 'womens', 'kids'].forEach(d => {
        const card = document.getElementById(`dept-card-${d}`);
        const tab = document.getElementById(`dept-filter-tab-${d}`);
        const isMatch = (norm === d);

        if (card) {
            if (isMatch) {
                card.style.borderColor = '#1A120B';
                card.style.boxShadow = '0 8px 30px rgba(139, 90, 43, 0.2)';
                card.style.transform = 'translateY(-4px)';
                const btn = card.querySelector('.dept-preview-btn');
                if (btn) {
                    btn.classList.add('active');
                    btn.style.background = '#1A120B';
                    btn.style.color = '#FFFFFF';
                }
            } else {
                card.style.borderColor = 'rgba(26,18,11,0.2)';
                card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.06)';
                card.style.transform = 'none';
                const btn = card.querySelector('.dept-preview-btn');
                if (btn) {
                    btn.classList.remove('active');
                    btn.style.background = 'transparent';
                    btn.style.color = '#1A120B';
                }
            }
        }
        if (tab) {
            if (isMatch) {
                tab.style.background = '#1A120B';
                tab.style.color = '#FFFFFF';
            } else {
                tab.style.background = 'transparent';
                tab.style.color = '#1A120B';
            }
        }
    });

    const titleEl = document.getElementById('dept-title-label');
    const badgeEl = document.getElementById('dept-badge-label');
    if (titleEl && badgeEl) {
        if (dept === 'Mens') {
            titleEl.textContent = "Men's Apparel & Streetwear";
            badgeEl.textContent = "Men's Selection";
        } else if (dept === 'Womens') {
            titleEl.textContent = "Women's Frocks, Blouses & Dresses";
            badgeEl.textContent = "Women's Selection";
        } else if (dept === 'Kids') {
            titleEl.textContent = "Kids' & Teens Graphic Prints";
            badgeEl.textContent = "Kids' Selection";
        }
    }

    renderHomeDepartmentProducts();
}

function renderHomeDepartmentProducts() {
    const grid = document.getElementById('home-department-grid');
    if (!grid) return;

    const target = (currentHomeDepartment || 'Mens').toLowerCase();
    const deptProducts = products.filter(p => {
        const secs = (p.sections || []).map(s => s.toLowerCase());
        if (target === 'mens' || target === 'men') {
            return secs.includes('mens') || secs.includes('unisexs');
        } else if (target === 'womens' || target === 'women') {
            return secs.includes('womens') || secs.includes('unisexs') || p.category === 'Frock' || p.category === 'Blouse';
        } else if (target === 'kids' || target === 'kid') {
            return secs.includes('kids');
        }
        return false;
    });

    if (deptProducts.length === 0) {
        const dept = currentHomeDepartment || 'Mens';
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #FAF7F2; border: 1.5px dashed rgba(139, 90, 43, 0.35); border-radius: 4px;">
                <div style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.5;">👕</div>
                <h4 style="font-family: 'Playfair Display', serif; color: #1A120B; font-size: 1.1rem; margin: 0 0 8px;">No Products Yet</h4>
                <p style="color: #6D5D53; font-size: 0.88rem; margin: 0 0 14px;">No garments have been added to the <strong>${dept}'s</strong> collection yet.</p>
                <span style="display: inline-block; background: rgba(139, 90, 43, 0.1); color: #8B5A2B; border: 1px solid rgba(139, 90, 43, 0.3); font-size: 0.72rem; font-weight: 800; padding: 4px 12px; letter-spacing: 1px; text-transform: uppercase;">Check Back Soon</span>
            </div>
        `;
        return;
    }

    grid.innerHTML = '';
    deptProducts.slice(0, 4).forEach(p => {
        const hasSizes = p.sizes && typeof p.sizes === 'object';
        const displayPrice = hasSizes ? Object.values(p.sizes)[0].price : p.price;
        const displayOldPrice = hasSizes ? Object.values(p.sizes)[0].oldPrice : p.oldPrice;

        let discountBadge = '';
        if (displayOldPrice && displayOldPrice > displayPrice) {
            const discountPercent = Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100);
            discountBadge = `<span class="badge badge-sale" style="position: absolute; top: 12px; left: 12px; z-index: 10; background: #DC143C; color: white; padding: 3px 8px; font-size: 0.65rem; font-weight: 800;">${discountPercent}% OFF</span>`;
        }

        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.background = '#FFFFFF';
        card.style.border = '1px solid rgba(26,18,11,0.15)';
        card.innerHTML = `
            <div class="product-image-container" onclick="viewProduct('${p.id}')" style="cursor: pointer; position: relative;">
                ${discountBadge}
                <img src="${p.images[0]}" alt="${p.name}" class="product-image" loading="lazy">
                <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist('${p.id}')" title="Add to Wishlist" style="position: absolute; top: 12px; right: 12px; z-index: 10;">
                    <i data-lucide="heart" class="wishlist-icon-${p.id}"></i>
                </button>
            </div>
            <div class="product-info" style="padding: 16px 14px;">
                <div class="product-category" style="color: #8B5A2B; font-weight: 700; font-size: 0.72rem; text-transform: uppercase;">${p.category}</div>
                <h3 class="product-title" onclick="viewProduct('${p.id}')" style="cursor: pointer; font-size: 1.05rem; margin: 4px 0 8px;">${p.name}</h3>
                <div class="product-price" style="display: flex; align-items: baseline; gap: 8px;">
                    <span class="current-price" style="font-weight: 800; color: #1A120B;">Rs. ${Number(displayPrice).toLocaleString()}.00</span>
                    ${displayOldPrice ? `<span class="original-price" style="text-decoration: line-through; color: #8C7D73; font-size: 0.85rem;">Rs. ${Number(displayOldPrice).toLocaleString()}.00</span>` : ''}
                </div>
                <div class="product-actions" style="margin-top: 12px; display: flex; gap: 8px;">
                    <button class="btn btn-primary" onclick="viewProduct('${p.id}')" style="flex: 1; padding: 9px; font-size: 0.8rem; font-weight: 700; background: #1A120B; color: #fff; border: 1px solid #1A120B; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                        <i data-lucide="eye" style="width: 14px; height: 14px;"></i> View Details
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Auto-parse URL department section parameter or auto-set currentSection on section pages
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const secParam = urlParams.get('section');
    const path = window.location.pathname.toLowerCase();

    if (path.includes('mens.html')) {
        if (typeof selectSection === 'function') selectSection('Mens');
    } else if (path.includes('womens.html')) {
        if (typeof selectSection === 'function') selectSection('Womens');
    } else if (path.includes('kids.html')) {
        if (typeof selectSection === 'function') selectSection('Kids');
    } else if (path.includes('other.html')) {
        if (typeof selectSection === 'function') selectSection('Others');
    } else if (secParam && typeof selectSection === 'function') {
        const s = secParam.toLowerCase();
        if (s === 'mens' || s === 'men') selectSection('Mens');
        else if (s === 'womens' || s === 'women') selectSection('Womens');
        else if (s === 'kids' || s === 'kid') selectSection('Kids');
        else if (s === 'others' || s === 'other') selectSection('Others');
    }
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        renderHomeDepartmentProducts();
    }
});




// ==========================================================================
// FAST SCROLL REVEAL OBSERVER (Smooth, hardware-accelerated animations)
// ==========================================================================
function initFastScrollAnimations() {
    if (typeof window === 'undefined') return;

    // Target elements: category cards, department cards, product cards, sections
    const selectors = [
        '.category-square-card',
        '.product-card',
        '.featured-product-card',
        '.hero-content',
        '.exclusive-banner'
    ];

    const elements = document.querySelectorAll(selectors.join(', '));
    if (!elements || elements.length === 0) return;

    // Use fast IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target); // Reveal once fast, no lagging
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.08
        });

        elements.forEach((el, index) => {
            if (!el.classList.contains('scroll-reveal') && !el.classList.contains('revealed')) {
                el.classList.add('scroll-reveal');
                // Calculate stagger delay based on sibling index
                const parent = el.parentElement;
                let childIndex = 1;
                if (parent) {
                    const siblings = Array.from(parent.children);
                    childIndex = (siblings.indexOf(el) % 8) + 1;
                }
                el.setAttribute('data-reveal-delay', childIndex);
                observer.observe(el);
            }
        });
    } else {
        // Fallback for older browsers
        elements.forEach(el => el.classList.add('revealed'));
    }
}

// Automatically trigger on DOM load and after dynamic product renders
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initFastScrollAnimations, 50);
    });
}

// ==========================================================================
// DESIGN STUDIO - UNDER DEVELOPMENT / TEMPORARILY CLOSED NOTICE MODAL
// ==========================================================================
function openDesignStudioNotice(e) {
    if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
        e.stopPropagation();
    }

    let modal = document.getElementById('design-studio-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'design-studio-modal';
        modal.className = 'ds-modal-overlay';
        modal.innerHTML = `
            <div class="ds-modal-card" role="dialog" aria-modal="true" aria-labelledby="ds-title">
                <button class="ds-modal-close" onclick="closeDesignStudioNotice()" aria-label="Close modal">&times;</button>
                <div class="ds-badge-row">
                    <span class="ds-status-pill">
                        <span class="ds-pulse-dot"></span> Under Active Development
                    </span>
                </div>
                <div class="ds-icon-bubble">
                    <i data-lucide="wrench" class="ds-icon-tool"></i>
                </div>
                <h3 id="ds-title" class="ds-heading">Design Studio is Temporarily Closed</h3>
                <p class="ds-subheading">ක්‍රියාකාරී නවීකරණයක් සිදු කෙරෙමින් පවතී</p>
                <p class="ds-desc">
                    අපගේ <strong>Design Studio</strong> සේවාව මේ වන විට නවීන විශේෂාංග හා උසස් තාක්ෂණය සමඟින් සංවර්ධනය (Development) වෙමින් පවතින බැවින් තාවකාලිකව වසා ඇත.
                </p>
                <div class="ds-highlight-box">
                    <i data-lucide="sparkles" class="ds-sparkle-icon"></i>
                    <div>
                        <strong>ඉතා ඉක්මනින් ඔබ වෙත! (Launching Soon)</strong>
                        <p>ඔබටම අනන්‍ය වූ T-Shirt ත්‍රිමාණව (3D) නිර්මාණය කර ගැනීමේ නව අත්දැකීමක් ඉතා කඩිනමින් ඔබ වෙත ලැබෙනු ඇත.</p>
                    </div>
                </div>
                <div class="ds-actions">
                    <a href="shop.html" class="ds-btn ds-btn-primary">
                        <i data-lucide="shopping-bag" style="width: 16px; height: 16px;"></i> Browse Available Shop
                    </a>
                    <a href="https://wa.me/94757218786?text=Hello%20Roohira%2C%20I%20would%20like%20to%20order%20a%20custom%20design" target="_blank" class="ds-btn ds-btn-whatsapp">
                        <i data-lucide="message-circle" style="width: 16px; height: 16px;"></i> Custom Orders via WhatsApp
                    </a>
                    <button type="button" class="ds-btn ds-btn-close" onclick="closeDesignStudioNotice()">
                        Close
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeDesignStudioNotice();
            }
        });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function closeDesignStudioNotice() {
    const modal = document.getElementById('design-studio-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.body.style.overflow = '';
}

window.openDesignStudioNotice = openDesignStudioNotice;
window.closeDesignStudioNotice = closeDesignStudioNotice;

// Intercept all clicks on customize.html links across all pages
document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a[href*="customize.html"]');
    if (targetLink) {
        e.preventDefault();
        e.stopPropagation();
        openDesignStudioNotice(e);
    }
}, true);

// If user navigates directly to customize.html, display overlay immediately
if (typeof window !== 'undefined' && window.location.pathname.includes('customize.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            openDesignStudioNotice();
        }, 150);
    });
}

