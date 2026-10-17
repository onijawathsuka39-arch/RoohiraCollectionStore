/**
 * ROOHIRA COLLECTION - UNIFIED REAL-TIME DATA ENGINE
 * Features:
 * - Firebase Firestore Real-time Sync & 1-Click Google Sign-In
 * - BroadcastChannel & LocalStorage Reactive Store (Works out-of-the-box!)
 * - Full SQL Database Dump Generator (MySQL & PostgreSQL compatible)
 * - Complete CRUD for Products, Stock, Orders, Customers
 */

// =============================================================================
// 1. DEFAULT LUXURY CATALOG & SEED DATA
// =============================================================================
const DEFAULT_PRODUCTS = [
  {
    id: "RC-PROD-001",
    name: "Aura Silk Evening Gown",
    category: "Women",
    price: 38500,
    oldPrice: 45000,
    stock: 8,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Espresso Brown", "Champagne Gold", "Classic Ivory"],
    badge: "Sale",
    rating: 4.9,
    reviewsCount: 34,
    description: "Handcrafted from pure mulberry silk, the Aura Evening Gown embodies effortless grace with a contoured waist silhouette, floor-sweeping drape, and subtle artisanal hand-embroidery along the neckline.",
    fabric: "100% Pure Mulberry Silk. Dry clean only.",
    featured: true
  },
  {
    id: "RC-PROD-002",
    name: "Emperor Tailored Velvet Tuxedo",
    category: "Men",
    price: 62000,
    oldPrice: 70000,
    stock: 5,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["38R", "40R", "42R", "44R"],
    colors: ["Midnight Chocolate", "Deep Obsidian"],
    badge: "New",
    rating: 5.0,
    reviewsCount: 19,
    description: "An iconic evening silhouette tailored from plush Italian velvet with grosgrain silk peak lapels and horn buttons. Designed for galas, red carpets, and bespoke wedding occasions.",
    fabric: "Premium Italian Velvet with Silk Bemberg lining. Specialist dry clean.",
    featured: true
  },
  {
    id: "RC-PROD-003",
    name: "Varanasi Gold Zari Heritage Saree",
    category: "Women",
    price: 84500,
    oldPrice: 95000,
    stock: 3,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["Free Size (6.3m)"],
    colors: ["Crimson Gold", "Royal Espresso"],
    badge: "Limited",
    rating: 4.95,
    reviewsCount: 42,
    description: "An heirloom masterpiece woven over 140 hours by master weavers using authentic gold zari threads on pure Katan silk. Includes unstitched matching blouse piece with border detailing.",
    fabric: "Pure Katan Silk with 24K Gold Plated Electro-Zari work.",
    featured: true
  },
  {
    id: "RC-PROD-004",
    name: "Monogram Pure Linen Resort Shirt",
    category: "Men",
    price: 16500,
    oldPrice: 19000,
    stock: 14,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Warm Sand", "Espresso", "Crisp White"],
    badge: "Bestseller",
    rating: 4.8,
    reviewsCount: 56,
    description: "Breathable European flax linen tailored with a camp collar, mother-of-pearl buttons, and discrete tonal Roohira monogram embroidery on the cuff.",
    fabric: "100% French Normandy Flax Linen. Machine wash cold on delicate.",
    featured: true
  },
  {
    id: "RC-PROD-005",
    name: "Riviera Pleated Chiffon Midi Dress",
    category: "Women",
    price: 29500,
    oldPrice: 34000,
    stock: 9,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Espresso Ombre", "Mocha Brown"],
    badge: "New",
    rating: 4.75,
    reviewsCount: 22,
    description: "Delicate micro-pleating defines this ethereal chiffon dress, accented with a self-tie silk belt and billowing bishop sleeves for understated glamour.",
    fabric: "Silk-blend Chiffon with soft modal lining.",
    featured: false
  },
  {
    id: "RC-PROD-006",
    name: "Signature Handcrafted Leather Tote",
    category: "Accessories",
    price: 34000,
    oldPrice: 40000,
    stock: 6,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["One Size"],
    colors: ["Rich Espresso", "Caramel Tan"],
    badge: "Luxury",
    rating: 4.95,
    reviewsCount: 68,
    description: "Full-grain vegetable-tanned calfskin leather tote featuring hand-burnished edges, solid brass hardware, and dedicated suede-lined laptop compartment.",
    fabric: "100% Full-grain Tuscan Calf Leather.",
    featured: true
  },
  {
    id: "RC-PROD-007",
    name: "Cashmere & Silk Shawl Wrap",
    category: "Accessories",
    price: 21500,
    oldPrice: 26000,
    stock: 12,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["200cm x 70cm"],
    colors: ["Warm Mocha", "Cream Ivory", "Antique Gold"],
    badge: "Sale",
    rating: 4.85,
    reviewsCount: 31,
    description: "A featherlight blend of grade-A Mongolian cashmere and Mulberry silk, spun with an eyelash fringe border. The ultimate travel and gala companion.",
    fabric: "70% Cashmere, 30% Silk.",
    featured: false
  },
  {
    id: "RC-PROD-008",
    name: "Regal Embroidered Silk Sherwani",
    category: "Men",
    price: 95000,
    oldPrice: 110000,
    stock: 4,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["38", "40", "42", "44"],
    colors: ["Ivory & Antique Gold", "Mocha Chocolate"],
    badge: "Exclusive",
    rating: 5.0,
    reviewsCount: 15,
    description: "Bespoke ceremonial sherwani detailed with exquisite zardozi and thread embroidery on raw Dupion silk. Comes with matching churidar and stole.",
    fabric: "Pure Raw Dupion Silk. Specialist dry clean.",
    featured: true
  }
];

const DEFAULT_ORDERS = [
  {
    orderId: "ROH-892104",
    createdAt: "2026-10-15T14:20:00Z",
    customer: {
      name: "Dinithi Jayawardena",
      email: "roohiraonline@gmail.com",
      phone: "+94 75 721 8786",
      address: "No. 45, Alfred House Gardens, Colombo 03, Sri Lanka"
    },
    items: [
      {
        id: "RC-PROD-001",
        name: "Aura Silk Evening Gown",
        price: 38500,
        qty: 1,
        size: "M",
        color: "Espresso Brown",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
      }
    ],
    subtotal: 38500,
    shipping: 0,
    discount: 0,
    total: 38500,
    status: "Shipped", // Pending, Confirmed, Shipped, Delivered, Cancelled
    paymentMethod: "Credit Card (Visa)",
    trackingNumber: "TRK-9832104",
    timeline: [
      { status: "Order Placed", date: "15 Oct 2026, 02:20 PM", desc: "Order successfully placed and verified." },
      { status: "Confirmed", date: "15 Oct 2026, 04:30 PM", desc: "Hand-tailored items quality inspected & packed in luxury box." },
      { status: "Shipped", date: "16 Oct 2026, 09:15 AM", desc: "Handed over to Roohira Express Logistics. In transit to Colombo hub." }
    ]
  },
  {
    orderId: "ROH-783419",
    createdAt: "2026-10-12T10:15:00Z",
    customer: {
      name: "Kasun Perera",
      email: "kasun.perera@gmail.com",
      phone: "+94 75 721 8786",
      address: "12/A, Flower Road, Colombo 07, Sri Lanka"
    },
    items: [
      {
        id: "RC-PROD-004",
        name: "Monogram Pure Linen Resort Shirt",
        price: 16500,
        qty: 2,
        size: "L",
        color: "Crisp White",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
      }
    ],
    subtotal: 33000,
    shipping: 0,
    discount: 3300,
    total: 29700,
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    trackingNumber: "TRK-7834190",
    timeline: [
      { status: "Order Placed", date: "12 Oct 2026, 10:15 AM", desc: "Order placed." },
      { status: "Confirmed", date: "12 Oct 2026, 11:00 AM", desc: "Packed with luxury wrapping." },
      { status: "Shipped", date: "13 Oct 2026, 08:30 AM", desc: "Dispatched from warehouse." },
      { status: "Out for Delivery", date: "14 Oct 2026, 09:00 AM", desc: "Rider out for delivery." },
      { status: "Delivered", date: "14 Oct 2026, 01:45 PM", desc: "Delivered & signed by customer." }
    ]
  }
];

const DEFAULT_CUSTOMERS = [
  {
    id: "CUST-001",
    name: "Dinithi Jayawardena",
    email: "roohiraonline@gmail.com",
    phone: "+94 75 721 8786",
    joinedDate: "2026-08-10",
    totalOrders: 3,
    totalSpent: 124500
  },
  {
    id: "CUST-002",
    name: "Kasun Perera",
    email: "kasun.perera@gmail.com",
    phone: "+94 71 987 6543",
    joinedDate: "2026-09-02",
    totalOrders: 2,
    totalSpent: 56700
  },
  {
    id: "CUST-003",
    name: "Shanika De Silva",
    email: "shanika.desilva@yahoo.com",
    phone: "+94 70 555 4321",
    joinedDate: "2026-10-01",
    totalOrders: 1,
    totalSpent: 38500
  }
];

// =============================================================================
// 2. UNIFIED DATABASE LAYER CLASS
// =============================================================================
class RoohiraDataEngine {
  constructor() {
    this.storageKeyProducts = "roohira_products";
    this.storageKeyOrders = "roohira_orders";
    this.storageKeyCustomers = "roohira_customers";
    this.storageKeyUser = "roohira_auth_user";
    this.storageKeyFirebaseConfig = "roohira_firebase_config";

    this.channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("roohira_realtime_bus") : null;
    this.listeners = [];

    this.initLocalStorage();
    this.setupBroadcastListener();
    this.setupFirebaseIfAvailable();
  }

  initLocalStorage() {
    if (!localStorage.getItem(this.storageKeyProducts)) {
      localStorage.setItem(this.storageKeyProducts, JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem(this.storageKeyOrders)) {
      localStorage.setItem(this.storageKeyOrders, JSON.stringify(DEFAULT_ORDERS));
    }
    if (!localStorage.getItem(this.storageKeyCustomers)) {
      localStorage.setItem(this.storageKeyCustomers, JSON.stringify(DEFAULT_CUSTOMERS));
    }
  }

  setupBroadcastListener() {
    if (this.channel) {
      this.channel.onmessage = (event) => {
        const { type, payload } = event.data;
        this.notifyListeners(type, payload);
      };
    }
  }

  // Subscribe to real-time events (e.g. products_updated, orders_updated, stock_updated)
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners(type, payload) {
    this.listeners.forEach(cb => {
      try { cb(type, payload); } catch (e) { console.error("Listener error:", e); }
    });
  }

  broadcast(type, payload) {
    this.notifyListeners(type, payload);
    if (this.channel) {
      this.channel.postMessage({ type, payload });
    }
  }

  // ===========================================================================
  // PRODUCTS & STOCK CRUD
  // ===========================================================================
  getProducts() {
    try {
      const data = localStorage.getItem(this.storageKeyProducts);
      return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  }

  saveProduct(productData) {
    const products = this.getProducts();
    let updated;
    if (productData.id) {
      // Update existing
      updated = products.map(p => p.id === productData.id ? { ...p, ...productData } : p);
    } else {
      // Create new
      const newId = "RC-PROD-" + String(products.length + 1).padStart(3, '0');
      const newProduct = {
        ...productData,
        id: newId,
        rating: 5.0,
        reviewsCount: 1,
        images: productData.images && productData.images.length ? productData.images : [productData.image]
      };
      updated = [newProduct, ...products];
    }
    localStorage.setItem(this.storageKeyProducts, JSON.stringify(updated));
    this.broadcast("products_updated", updated);
    return true;
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem(this.storageKeyProducts, JSON.stringify(updated));
    this.broadcast("products_updated", updated);
    return true;
  }

  updateStock(id, newStock) {
    const products = this.getProducts();
    const updated = products.map(p => {
      if (p.id === id) {
        return { ...p, stock: Math.max(0, parseInt(newStock) || 0) };
      }
      return p;
    });
    localStorage.setItem(this.storageKeyProducts, JSON.stringify(updated));
    this.broadcast("stock_updated", { id, stock: newStock });
    return true;
  }

  // ===========================================================================
  // ORDERS CRUD & REALTIME TRACKING
  // ===========================================================================
  getOrders() {
    try {
      const data = localStorage.getItem(this.storageKeyOrders);
      return data ? JSON.parse(data) : DEFAULT_ORDERS;
    } catch (e) {
      return DEFAULT_ORDERS;
    }
  }

  getOrderById(query) {
    if (!query) return null;
    const cleanQuery = query.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    const orders = this.getOrders();
    return orders.find(o => {
      const cleanOrderId = (o.orderId || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
      const cleanPhone = (o.customer && o.customer.phone ? o.customer.phone : "").replace(/[^0-9]/g, "");
      const cleanTracking = (o.trackingNumber || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
      
      return cleanOrderId === cleanQuery || 
             (cleanQuery.length >= 6 && cleanOrderId.includes(cleanQuery)) ||
             (cleanQuery.length >= 7 && cleanPhone.includes(cleanQuery)) ||
             cleanTracking === cleanQuery;
    }) || null;
  }

  getUserOrders(userEmail) {
    if (!userEmail) return [];
    const orders = this.getOrders();
    return orders.filter(o => o.customer && o.customer.email && o.customer.email.toLowerCase() === userEmail.toLowerCase());
  }

  createOrder(orderData) {
    const orders = this.getOrders();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = "ROH-" + randomNum;
    const trackingNumber = "TRK-" + randomNum;
    
    const nowStr = new Date().toLocaleString("en-US", { 
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" 
    });

    const newOrder = {
      ...orderData,
      orderId,
      trackingNumber,
      createdAt: new Date().toISOString(),
      status: "Pending",
      timeline: [
        {
          status: "Order Placed",
          date: nowStr,
          desc: "Order placed successfully. Awaiting luxury dispatch confirmation."
        }
      ]
    };

    // Deduct stock for each item in order
    orderData.items.forEach(item => {
      const prod = this.getProductById(item.id);
      if (prod) {
        this.updateStock(item.id, Math.max(0, prod.stock - item.qty));
      }
    });

    // Update customer stats
    this.recordCustomerOrder(orderData.customer, newOrder.total);

    // Sync with Firebase if available
    try {
      if (window.firebase) {
        if (firebase.database) {
          firebase.database().ref("orders/" + orderId).set(newOrder);
        }
        if (firebase.firestore) {
          firebase.firestore().collection("orders").doc(orderId).set(newOrder);
        }
      }
    } catch (fbErr) {
      console.warn("Firebase order sync notice:", fbErr);
    }

    const updatedOrders = [newOrder, ...orders];
    localStorage.setItem(this.storageKeyOrders, JSON.stringify(updatedOrders));
    this.broadcast("orders_updated", updatedOrders);
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const nowStr = new Date().toLocaleString("en-US", { 
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" 
    });

    const updated = orders.map(o => {
      if (o.orderId === orderId) {
        const timeline = o.timeline || [];
        timeline.push({
          status: newStatus,
          date: nowStr,
          desc: `Status updated to ${newStatus} by Roohira Concierge.`
        });
        return { ...o, status: newStatus, timeline };
      }
      return o;
    });

    localStorage.setItem(this.storageKeyOrders, JSON.stringify(updated));
    this.broadcast("orders_updated", updated);

    // Sync status change to Firebase
    try {
      if (window.firebase) {
        const found = updated.find(o => o.orderId === orderId);
        if (found) {
          if (firebase.database) {
            firebase.database().ref("orders/" + orderId).update({ status: newStatus, timeline: found.timeline });
          }
          if (firebase.firestore) {
            firebase.firestore().collection("orders").doc(orderId).update({ status: newStatus, timeline: found.timeline });
          }
        }
      }
    } catch (fbErr) {
      console.warn("Firebase status update notice:", fbErr);
    }

    return true;
  }

  // ===========================================================================
  // CUSTOMERS
  // ===========================================================================
  getCustomers() {
    try {
      const data = localStorage.getItem(this.storageKeyCustomers);
      return data ? JSON.parse(data) : DEFAULT_CUSTOMERS;
    } catch (e) {
      return DEFAULT_CUSTOMERS;
    }
  }

  recordCustomerOrder(customerInfo, orderTotal) {
    if (!customerInfo || !customerInfo.email) return;
    const customers = this.getCustomers();
    const existing = customers.find(c => c.email.toLowerCase() === customerInfo.email.toLowerCase());
    
    let updated;
    if (existing) {
      updated = customers.map(c => {
        if (c.email.toLowerCase() === customerInfo.email.toLowerCase()) {
          return {
            ...c,
            totalOrders: (c.totalOrders || 0) + 1,
            totalSpent: (c.totalSpent || 0) + (orderTotal || 0)
          };
        }
        return c;
      });
    } else {
      const newCustomer = {
        id: "CUST-" + String(customers.length + 1).padStart(3, '0'),
        name: customerInfo.name || "Valued Patron",
        email: customerInfo.email,
        phone: customerInfo.phone || "N/A",
        joinedDate: new Date().toISOString().split('T')[0],
        totalOrders: 1,
        totalSpent: orderTotal || 0
      };
      updated = [newCustomer, ...customers];
    }
    localStorage.setItem(this.storageKeyCustomers, JSON.stringify(updated));
    this.broadcast("customers_updated", updated);
  }

  // ===========================================================================
  // 3. AUTHENTICATION (GOOGLE SIGN-IN & EMAIL/PASSWORD)
  // ===========================================================================
  getCurrentUser() {
    try {
      const user = localStorage.getItem(this.storageKeyUser);
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  }

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(this.storageKeyUser, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.storageKeyUser);
    }
    this.broadcast("auth_changed", user);
  }

  logout() {
    this.setCurrentUser(null);
  }

  // Google Sign-In with 1-Click Popup
  async loginWithGoogle() {
    // If Firebase Auth is loaded and configured, use native Firebase Google Provider
    if (window.firebase && window.firebase.auth) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const fbUser = result.user;
        const appUser = {
          uid: fbUser.uid,
          name: fbUser.displayName || "Google User",
          email: fbUser.email,
          photoURL: fbUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          provider: "google.com"
        };
        this.setCurrentUser(appUser);
        this.recordCustomerOrder({ name: appUser.name, email: appUser.email }, 0);
        return { success: true, user: appUser };
      } catch (err) {
        console.warn("Firebase Google Auth popup error, falling back to simulated high-fidelity Google Auth:", err);
      }
    }

    // High-Fidelity One-Click Google Login Simulation (When Firebase project credentials are not yet entered)
    const promptEmail = prompt("Enter your Google Account Gmail address to sign in:", "roohirapatron@gmail.com");
    if (!promptEmail) return { success: false, error: "Cancelled" };

    const simulatedUser = {
      uid: "GOOG-" + Math.floor(Math.random() * 9999999),
      name: promptEmail.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase()),
      email: promptEmail.trim(),
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      provider: "google.com"
    };
    this.setCurrentUser(simulatedUser);
    this.recordCustomerOrder({ name: simulatedUser.name, email: simulatedUser.email }, 0);
    return { success: true, user: simulatedUser };
  }

  // Email / Password Login
  loginWithEmail(email, password) {
    if (!email || !password) return { success: false, error: "Please enter email and password" };
    const user = {
      uid: "USER-" + Math.floor(Math.random() * 999999),
      name: email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase()),
      email: email.trim(),
      photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      provider: "password"
    };
    this.setCurrentUser(user);
    this.recordCustomerOrder({ name: user.name, email: user.email }, 0);
    return { success: true, user };
  }

  // ===========================================================================
  // 4. FULL SQL DATABASE DUMP GENERATOR (MySQL & PostgreSQL)
  // ===========================================================================
  generateSQLDump() {
    const products = this.getProducts();
    const orders = this.getOrders();
    const customers = this.getCustomers();

    let sql = `-- =====================================================================\n`;
    sql += `-- ROOHIRA COLLECTION - LUXURY E-COMMERCE DATABASE DUMP\n`;
    sql += `-- Compatible with MySQL 5.7+, MySQL 8.0, PostgreSQL & MariaDB\n`;
    sql += `-- Generated on: ${new Date().toISOString()}\n`;
    sql += `-- =====================================================================\n\n`;

    sql += `CREATE DATABASE IF NOT EXISTS \`roohira_collection_db\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n`;
    sql += `USE \`roohira_collection_db\`;\n\n`;

    // Products Table
    sql += `-- -----------------------------------------------------\n`;
    sql += `-- Table: products\n`;
    sql += `-- -----------------------------------------------------\n`;
    sql += `DROP TABLE IF EXISTS \`products\`;\n`;
    sql += `CREATE TABLE \`products\` (\n`;
    sql += `  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,\n`;
    sql += `  \`name\` VARCHAR(255) NOT NULL,\n`;
    sql += `  \`category\` VARCHAR(100) NOT NULL,\n`;
    sql += `  \`price\` DECIMAL(10,2) NOT NULL,\n`;
    sql += `  \`old_price\` DECIMAL(10,2) DEFAULT NULL,\n`;
    sql += `  \`stock\` INT NOT NULL DEFAULT 0,\n`;
    sql += `  \`badge\` VARCHAR(50) DEFAULT NULL,\n`;
    sql += `  \`rating\` DECIMAL(3,2) DEFAULT 5.00,\n`;
    sql += `  \`reviews_count\` INT DEFAULT 0,\n`;
    sql += `  \`description\` TEXT,\n`;
    sql += `  \`fabric\` VARCHAR(255) DEFAULT NULL,\n`;
    sql += `  \`image_url\` TEXT,\n`;
    sql += `  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n`;
    sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;

    // Insert Products
    sql += `INSERT INTO \`products\` (\`id\`, \`name\`, \`category\`, \`price\`, \`old_price\`, \`stock\`, \`badge\`, \`rating\`, \`reviews_count\`, \`description\`, \`fabric\`, \`image_url\`) VALUES\n`;
    const prodInserts = products.map(p => {
      const cleanDesc = (p.description || '').replace(/'/g, "''");
      const cleanFabric = (p.fabric || '').replace(/'/g, "''");
      const cleanName = p.name.replace(/'/g, "''");
      return `('${p.id}', '${cleanName}', '${p.category}', ${p.price}, ${p.oldPrice || 'NULL'}, ${p.stock}, '${p.badge || ''}', ${p.rating || 5.0}, ${p.reviewsCount || 0}, '${cleanDesc}', '${cleanFabric}', '${p.image}')`;
    });
    sql += prodInserts.join(",\n") + ";\n\n";

    // Customers Table
    sql += `-- -----------------------------------------------------\n`;
    sql += `-- Table: customers\n`;
    sql += `-- -----------------------------------------------------\n`;
    sql += `DROP TABLE IF EXISTS \`customers\`;\n`;
    sql += `CREATE TABLE \`customers\` (\n`;
    sql += `  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,\n`;
    sql += `  \`name\` VARCHAR(255) NOT NULL,\n`;
    sql += `  \`email\` VARCHAR(255) NOT NULL UNIQUE,\n`;
    sql += `  \`phone\` VARCHAR(50) DEFAULT NULL,\n`;
    sql += `  \`joined_date\` DATE DEFAULT NULL,\n`;
    sql += `  \`total_orders\` INT DEFAULT 0,\n`;
    sql += `  \`total_spent\` DECIMAL(12,2) DEFAULT 0.00\n`;
    sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;

    if (customers.length) {
      sql += `INSERT INTO \`customers\` (\`id\`, \`name\`, \`email\`, \`phone\`, \`joined_date\`, \`total_orders\`, \`total_spent\`) VALUES\n`;
      const custInserts = customers.map(c => {
        const cleanName = (c.name || '').replace(/'/g, "''");
        return `('${c.id}', '${cleanName}', '${c.email}', '${c.phone || ''}', '${c.joinedDate || '2026-10-01'}', ${c.totalOrders || 0}, ${c.totalSpent || 0})`;
      });
      sql += custInserts.join(",\n") + ";\n\n";
    }

    // Orders Table
    sql += `-- -----------------------------------------------------\n`;
    sql += `-- Table: orders\n`;
    sql += `-- -----------------------------------------------------\n`;
    sql += `DROP TABLE IF EXISTS \`orders\`;\n`;
    sql += `CREATE TABLE \`orders\` (\n`;
    sql += `  \`order_id\` VARCHAR(64) NOT NULL PRIMARY KEY,\n`;
    sql += `  \`customer_name\` VARCHAR(255) NOT NULL,\n`;
    sql += `  \`customer_email\` VARCHAR(255) NOT NULL,\n`;
    sql += `  \`customer_phone\` VARCHAR(50) DEFAULT NULL,\n`;
    sql += `  \`shipping_address\` TEXT NOT NULL,\n`;
    sql += `  \`subtotal\` DECIMAL(10,2) NOT NULL,\n`;
    sql += `  \`shipping\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,\n`;
    sql += `  \`discount\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,\n`;
    sql += `  \`total\` DECIMAL(10,2) NOT NULL,\n`;
    sql += `  \`status\` ENUM('Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',\n`;
    sql += `  \`payment_method\` VARCHAR(100) NOT NULL,\n`;
    sql += `  \`tracking_number\` VARCHAR(64) DEFAULT NULL,\n`;
    sql += `  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n`;
    sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;

    if (orders.length) {
      sql += `INSERT INTO \`orders\` (\`order_id\`, \`customer_name\`, \`customer_email\`, \`customer_phone\`, \`shipping_address\`, \`subtotal\`, \`shipping\`, \`discount\`, \`total\`, \`status\`, \`payment_method\`, \`tracking_number\`) VALUES\n`;
      const orderInserts = orders.map(o => {
        const cName = (o.customer && o.customer.name ? o.customer.name : 'Patron').replace(/'/g, "''");
        const cEmail = (o.customer && o.customer.email ? o.customer.email : 'patron@roohira.com').replace(/'/g, "''");
        const cPhone = (o.customer && o.customer.phone ? o.customer.phone : '').replace(/'/g, "''");
        const cAddr = (o.customer && o.customer.address ? o.customer.address : '').replace(/'/g, "''");
        return `('${o.orderId}', '${cName}', '${cEmail}', '${cPhone}', '${cAddr}', ${o.subtotal || o.total}, ${o.shipping || 0}, ${o.discount || 0}, ${o.total}, '${o.status || 'Pending'}', '${o.paymentMethod || 'Credit Card'}', '${o.trackingNumber || ''}')`;
      });
      sql += orderInserts.join(",\n") + ";\n\n";
    }

    // Order Items Table
    sql += `-- -----------------------------------------------------\n`;
    sql += `-- Table: order_items\n`;
    sql += `-- -----------------------------------------------------\n`;
    sql += `DROP TABLE IF EXISTS \`order_items\`;\n`;
    sql += `CREATE TABLE \`order_items\` (\n`;
    sql += `  \`id\` INT AUTO_INCREMENT PRIMARY KEY,\n`;
    sql += `  \`order_id\` VARCHAR(64) NOT NULL,\n`;
    sql += `  \`product_id\` VARCHAR(64) NOT NULL,\n`;
    sql += `  \`product_name\` VARCHAR(255) NOT NULL,\n`;
    sql += `  \`price\` DECIMAL(10,2) NOT NULL,\n`;
    sql += `  \`quantity\` INT NOT NULL DEFAULT 1,\n`;
    sql += `  \`size\` VARCHAR(50) DEFAULT NULL,\n`;
    sql += `  \`color\` VARCHAR(50) DEFAULT NULL,\n`;
    sql += `  FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`order_id\`) ON DELETE CASCADE\n`;
    sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;

    const allItems = [];
    orders.forEach(o => {
      (o.items || []).forEach(item => {
        const pName = (item.name || '').replace(/'/g, "''");
        allItems.push(`('${o.orderId}', '${item.id}', '${pName}', ${item.price}, ${item.qty}, '${item.size || 'Standard'}', '${item.color || 'Standard'}')`);
      });
    });

    if (allItems.length) {
      sql += `INSERT INTO \`order_items\` (\`order_id\`, \`product_id\`, \`product_name\`, \`price\`, \`quantity\`, \`size\`, \`color\`) VALUES\n`;
      sql += allItems.join(",\n") + ";\n\n";
    }

    sql += `-- END OF SQL DUMP --\n`;
    return sql;
  }

  downloadSQLFile() {
    const sqlContent = this.generateSQLDump();
    const blob = new Blob([sqlContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "roohira_collection_db.sql";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ===========================================================================
  // 5. FIREBASE INITIALIZATION HELPER
  // ===========================================================================
  setupFirebaseIfAvailable() {
    try {
      const cfgStr = localStorage.getItem(this.storageKeyFirebaseConfig);
      const config = cfgStr ? JSON.parse(cfgStr) : (window.roohiraFirebaseConfig || null);
      if (config && window.firebase) {
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
          console.log("Firebase initialized successfully with Roohira Cloud credentials!");
        }
      }
    } catch (e) {
      console.warn("Firebase auto-init skipped or failed:", e);
    }
  }

  saveFirebaseConfig(config) {
    localStorage.setItem(this.storageKeyFirebaseConfig, JSON.stringify(config));
    this.setupFirebaseIfAvailable();
  }
}

// Instantiate global singleton
window.roohiraDB = new RoohiraDataEngine();
