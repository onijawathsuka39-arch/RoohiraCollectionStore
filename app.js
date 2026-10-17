/**
 * ROOHIRA COLLECTION - APPLICATION CORE LOGIC
 * Manages Cart Drawer, User Auth Header state, Toasts, and Shared UI
 */

class RoohiraApp {
  constructor() {
    this.cartKey = "roohira_cart";
    this.couponKey = "roohira_applied_coupon";
    this.freeShippingThreshold = 50000; // Free shipping over LKR 50,000

    this.initCart();
    this.setupCartDrawer();
    this.updateHeaderAuth();
    this.bindGlobalEvents();

    // Listen to real-time events from db.js
    if (window.roohiraDB) {
      window.roohiraDB.subscribe((type, payload) => {
        if (type === "auth_changed") {
          this.updateHeaderAuth();
        } else if (type === "products_updated" || type === "stock_updated") {
          this.renderCart();
        }
      });
    }
  }

  // ===========================================================================
  // CURRENCY & FORMATTING
  // ===========================================================================
  formatPrice(amount) {
    const num = Math.round(Number(amount) || 0);
    return "LKR " + num.toLocaleString("en-US");
  }

  // ===========================================================================
  // CART LOGIC
  // ===========================================================================
  getCart() {
    try {
      const data = localStorage.getItem(this.cartKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart(cart) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateCartCount();
    this.renderCart();
  }

  addToCart(productId, qty = 1, size = null, color = null) {
    const prod = window.roohiraDB ? window.roohiraDB.getProductById(productId) : null;
    if (!prod) {
      this.showToast("Product not found", "error");
      return;
    }

    if (prod.stock <= 0) {
      this.showToast("Sorry, this item is sold out!", "warning");
      return;
    }

    const selectedSize = size || (prod.sizes && prod.sizes[0]) || "Standard";
    const selectedColor = color || (prod.colors && prod.colors[0]) || "Standard";

    let cart = this.getCart();
    const existingIndex = cart.findIndex(item => 
      item.id === productId && item.size === selectedSize && item.color === selectedColor
    );

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].qty;
      if (currentQty + qty > prod.stock) {
        this.showToast(`Only ${prod.stock} pieces available in stock.`, "warning");
        return;
      }
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        qty: Math.min(qty, prod.stock),
        size: selectedSize,
        color: selectedColor
      });
    }

    this.saveCart(cart);
    this.showToast(`Added "${prod.name}" to your bag`, "success");
    this.openCart();
  }

  updateQuantity(index, newQty) {
    let cart = this.getCart();
    if (!cart[index]) return;

    if (newQty <= 0) {
      this.removeFromCart(index);
      return;
    }

    const prod = window.roohiraDB.getProductById(cart[index].id);
    if (prod && newQty > prod.stock) {
      this.showToast(`Maximum ${prod.stock} items available.`, "warning");
      return;
    }

    cart[index].qty = newQty;
    this.saveCart(cart);
  }

  removeFromCart(index) {
    let cart = this.getCart();
    if (!cart[index]) return;
    const name = cart[index].name;
    cart.splice(index, 1);
    this.saveCart(cart);
    this.showToast(`Removed "${name}" from bag`, "info");
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
    this.updateCartCount();
    this.renderCart();
  }

  getCartSubtotal() {
    return this.getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  getAppliedDiscount() {
    const coupon = localStorage.getItem(this.couponKey);
    const subtotal = this.getCartSubtotal();
    if (!coupon || subtotal === 0) return 0;

    if (coupon.toUpperCase() === "ROOHIRA10") {
      return Math.round(subtotal * 0.10); // 10% off
    } else if (coupon.toUpperCase() === "WELCOME") {
      return Math.round(subtotal * 0.15); // 15% off
    }
    return 0;
  }

  getShippingCost() {
    const subtotal = this.getCartSubtotal();
    if (subtotal === 0 || subtotal >= this.freeShippingThreshold) {
      return 0;
    }
    return 1500; // Flat standard shipping
  }

  applyCoupon(code) {
    const cleanCode = code ? code.trim().toUpperCase() : "";
    if (cleanCode === "ROOHIRA10" || cleanCode === "WELCOME") {
      localStorage.setItem(this.couponKey, cleanCode);
      this.showToast(`Coupon "${cleanCode}" applied successfully!`, "success");
      this.renderCart();
      return true;
    } else {
      this.showToast("Invalid promo code. Try ROOHIRA10 or WELCOME", "error");
      return false;
    }
  }

  removeCoupon() {
    localStorage.removeItem(this.couponKey);
    this.renderCart();
  }

  // ===========================================================================
  // UI & DRAWER
  // ===========================================================================
  initCart() {
    this.updateCartCount();
  }

  updateCartCount() {
    const cart = this.getCart();
    const totalItems = cart.reduce((count, item) => count + item.qty, 0);
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(badge => {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? "flex" : "none";
    });
  }

  setupCartDrawer() {
    // Inject Drawer HTML into body if not present
    if (!document.getElementById("cartDrawerOverlay")) {
      const drawerHTML = `
        <div class="cart-drawer-overlay" id="cartDrawerOverlay">
          <div class="cart-drawer" id="cartDrawer">
            <div class="cart-drawer-header">
              <div class="d-flex align-center gap-2">
                <i class="fa-solid fa-bag-shopping text-gold"></i>
                <h3>Shopping Bag</h3>
              </div>
              <button class="cart-close-btn" id="closeCartBtn" aria-label="Close Bag">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div class="cart-free-shipping" id="cartShippingBanner">
              <div class="d-flex justify-between" id="shippingText">
                <span>Free Express Shipping</span>
                <span id="shippingDiffText"></span>
              </div>
              <div class="shipping-bar-container">
                <div class="shipping-bar-progress" id="shippingProgressBar" style="width: 0%;"></div>
              </div>
            </div>

            <div class="cart-drawer-body" id="cartItemsContainer">
              <!-- Dynamically populated -->
            </div>

            <div class="cart-drawer-footer" id="cartFooter">
              <div class="cart-subtotal-row">
                <span>Subtotal</span>
                <span id="cartSubtotalVal">LKR 0</span>
              </div>
              <div class="cart-subtotal-row" id="cartDiscountRow" style="display: none;">
                <span class="text-gold">Promotion Discount</span>
                <span class="text-gold" id="cartDiscountVal">- LKR 0</span>
              </div>
              <div class="cart-subtotal-row">
                <span>Estimated Shipping</span>
                <span id="cartShippingVal">Free</span>
              </div>
              <div class="cart-total-row">
                <span>Estimated Total</span>
                <span id="cartTotalVal">LKR 0</span>
              </div>
              <div class="d-flex flex-column gap-2">
                <a href="checkout.html" class="btn btn-primary btn-block">
                  <span>Proceed to Checkout</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
                <a href="cart.html" class="btn btn-outline btn-block btn-sm">View Full Bag</a>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", drawerHTML);

      // Event listeners for closing
      document.getElementById("closeCartBtn").addEventListener("click", () => this.closeCart());
      document.getElementById("cartDrawerOverlay").addEventListener("click", (e) => {
        if (e.target.id === "cartDrawerOverlay") this.closeCart();
      });
    }

    this.setupMobileNavAndWhatsApp();
    this.renderCart();
  }

  setupMobileNavAndWhatsApp() {
    // 1. Floating WhatsApp Button
    if (!document.getElementById("floatingWhatsAppBtn")) {
      const waBtn = document.createElement("a");
      waBtn.id = "floatingWhatsAppBtn";
      waBtn.className = "floating-whatsapp-btn";
      waBtn.href = "https://wa.me/94757218786?text=Hello%20Roohira%20Collection%2C%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20order.";
      waBtn.target = "_blank";
      waBtn.rel = "noopener noreferrer";
      waBtn.title = "Chat with Roohira Concierge on WhatsApp";
      waBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
      document.body.appendChild(waBtn);
    }

    // 2. App-Style Mobile Bottom Navigation Bar
    if (!document.getElementById("mobileBottomNav")) {
      const currentPath = window.location.pathname.split("/").pop() || "index.html";
      const navHTML = `
        <nav class="mobile-bottom-nav" id="mobileBottomNav">
          <a href="index.html" class="mobile-bottom-nav-item ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">
            <i class="fa-solid fa-house"></i>
            <span>Home</span>
          </a>
          <a href="shop.html" class="mobile-bottom-nav-item ${currentPath === 'shop.html' ? 'active' : ''}">
            <i class="fa-solid fa-bag-shopping"></i>
            <span>Shop</span>
          </a>
          <a href="customize.html" class="mobile-bottom-nav-item ${currentPath === 'customize.html' ? 'active' : ''}">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>Design</span>
          </a>
          <a href="dtf.html" class="mobile-bottom-nav-item ${currentPath === 'dtf.html' ? 'active' : ''}">
            <i class="fa-solid fa-layer-group"></i>
            <span>DTF Print</span>
          </a>
          <button class="mobile-bottom-nav-item" data-toggle="cart" style="background: none; border: none; cursor: pointer;">
            <i class="fa-solid fa-basket-shopping"></i>
            <span>Bag</span>
            <span class="nav-badge cart-count-badge" style="display: none;">0</span>
          </button>
        </nav>
      `;
      document.body.insertAdjacentHTML("beforeend", navHTML);
    }
  }

  openCart() {
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay) {
      this.renderCart();
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeCart() {
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay) {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  renderCart() {
    const container = document.getElementById("cartItemsContainer");
    if (!container) return;

    const cart = this.getCart();
    const subtotal = this.getCartSubtotal();
    const discount = this.getAppliedDiscount();
    const shipping = this.getShippingCost();
    const total = Math.max(0, subtotal - discount + shipping);

    // Free shipping progress bar
    const progressEl = document.getElementById("shippingProgressBar");
    const shippingDiffText = document.getElementById("shippingDiffText");
    if (progressEl && shippingDiffText) {
      const percentage = Math.min(100, Math.round((subtotal / this.freeShippingThreshold) * 100));
      progressEl.style.width = percentage + "%";
      if (subtotal >= this.freeShippingThreshold) {
        shippingDiffText.textContent = "Unlocked!";
      } else {
        const remaining = this.freeShippingThreshold - subtotal;
        shippingDiffText.textContent = `Add ${this.formatPrice(remaining)} for Free Delivery`;
      }
    }

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-bag-shopping"></i>
          <h4>Your bag is currently empty</h4>
          <p>Discover our curated haute couture and luxury attire.</p>
          <a href="shop.html" class="btn btn-primary btn-sm" style="margin-top: 1.25rem;">Explore Collection</a>
        </div>
      `;
      const footer = document.getElementById("cartFooter");
      if (footer) footer.style.display = "none";
      return;
    }

    const footer = document.getElementById("cartFooter");
    if (footer) footer.style.display = "block";

    container.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">
            ${item.size ? `<span>Size: <strong>${item.size}</strong></span>` : ''}
            ${item.color ? ` &bull; <span>${item.color}</span>` : ''}
          </div>
          <div class="cart-item-actions">
            <div class="qty-stepper">
              <button onclick="window.roohiraApp.updateQuantity(${index}, ${item.qty - 1})">-</button>
              <span>${item.qty}</span>
              <button onclick="window.roohiraApp.updateQuantity(${index}, ${item.qty + 1})">+</button>
            </div>
            <div class="d-flex align-center">
              <span class="cart-item-price">${this.formatPrice(item.price * item.qty)}</span>
              <button class="cart-item-remove" onclick="window.roohiraApp.removeFromCart(${index})">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `).join("");

    // Update totals
    const subtotalEl = document.getElementById("cartSubtotalVal");
    if (subtotalEl) subtotalEl.textContent = this.formatPrice(subtotal);

    const discountRow = document.getElementById("cartDiscountRow");
    const discountVal = document.getElementById("cartDiscountVal");
    if (discountRow && discountVal) {
      if (discount > 0) {
        discountRow.style.display = "flex";
        discountVal.textContent = "- " + this.formatPrice(discount);
      } else {
        discountRow.style.display = "none";
      }
    }

    const shippingEl = document.getElementById("cartShippingVal");
    if (shippingEl) shippingEl.textContent = shipping === 0 ? "Free" : this.formatPrice(shipping);

    const totalEl = document.getElementById("cartTotalVal");
    if (totalEl) totalEl.textContent = this.formatPrice(total);
  }

  // ===========================================================================
  // AUTH HEADER STATE
  // ===========================================================================
  updateHeaderAuth() {
    const userContainer = document.getElementById("headerUserAction");
    if (!userContainer) return;

    const user = window.roohiraDB ? window.roohiraDB.getCurrentUser() : null;

    if (user) {
      userContainer.innerHTML = `
        <a href="profile.html" class="action-btn" title="My Account (${user.name})">
          <img src="${user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}" 
               alt="${user.name}" 
               style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid var(--gold);">
        </a>
      `;
    } else {
      userContainer.innerHTML = `
        <a href="auth.html" class="action-btn" title="Sign In / Register">
          <i class="fa-regular fa-user"></i>
        </a>
      `;
    }
  }

  // ===========================================================================
  // TOAST NOTIFICATIONS
  // ===========================================================================
  showToast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "fa-solid fa-circle-info";
    if (type === "success") icon = "fa-solid fa-circle-check text-gold";
    if (type === "error") icon = "fa-solid fa-circle-exclamation text-danger";
    if (type === "warning") icon = "fa-solid fa-triangle-exclamation text-warning";

    toast.innerHTML = `
      <i class="${icon}"></i>
      <div>${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  bindGlobalEvents() {
    // Open cart drawer when clicking any element with [data-toggle="cart"]
    document.addEventListener("click", (e) => {
      const cartToggle = e.target.closest('[data-toggle="cart"]');
      if (cartToggle) {
        e.preventDefault();
        this.openCart();
      }
    });
  }
}

// Global instance
window.roohiraApp = new RoohiraApp();
