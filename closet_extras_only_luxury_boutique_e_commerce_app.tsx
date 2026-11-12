import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag, Heart, Search, Menu, X, ChevronRight, Star, 
  MessageCircle, ArrowRight, ShieldCheck, Truck, Sparkles, 
  Check, Phone, Mail, MapPin, ExternalLink, Filter, SlidersHorizontal,
  Trash2, Plus, Minus, Eye, RefreshCw, Send, HelpCircle, Instagram, Facebook
} from 'lucide-react';

// ==========================================
// CENTRAL BRAND CATALOGUE DATA
// ==========================================
const INITIAL_PRODUCTS = [
  // Core Quoted Clothing Items (Original prices set for discount demo where applicable)
  {
    id: 'ceo-001',
    name: 'Contrast Collar Sleeveless Skater Dress',
    category: 'fashion',
    subCategory: 'Casual & Skater Dresses',
    price: 8000,
    originalPrice: null,
    inStock: true,
    rating: 4.9,
    reviewsCount: 18,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A charming sleeveless skater dress featuring a crisp contrast collar, tailored waistline, and a flirty A-line skirt. Crafted for feminine elegance and effortless style.',
    colors: ['Black/White Collar', 'Navy/White Collar'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'ceo-002',
    name: 'Elegant Side-Ruched Maxi Dress',
    category: 'fashion',
    subCategory: 'Maxi Dresses',
    price: 12000,
    originalPrice: 16000,
    inStock: true,
    rating: 5.0,
    reviewsCount: 24,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sophisticated floor-length maxi dress styled with delicate side ruching that flatters every curve. Perfect for evening outings, cocktails, and special occasions.',
    colors: ['Champagne Gold', 'Emerald Green', 'Deep Plum'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'ceo-003',
    name: 'Halter Neck Ruched Mermaid Maxi Gown',
    category: 'fashion',
    subCategory: 'Elegant Outfits & Gowns',
    price: 14000,
    originalPrice: 18500,
    inStock: true,
    rating: 4.8,
    reviewsCount: 31,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A show-stopping halter neck gown designed with dramatic mermaid silhouetting and flattering center ruching. Turn heads at every glamorous gathering.',
    colors: ['Blush Pink', 'Midnight Black', 'Ruby Red'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'ceo-004',
    name: 'Polka Dot Tiered Ruffle Mini Dress',
    category: 'fashion',
    subCategory: 'Mini Dresses',
    price: 15000,
    originalPrice: 20000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 15,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Playful yet romantic mini dress detailed with chic polka dots, tiered ruffle layers, and breathable luxury fabric. Your go-to weekend statement outfit.',
    colors: ['Ivory Polka', 'Black Polka'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'ceo-005',
    name: 'Long Sleeve Graphic Print Bodycon Mini Dress',
    category: 'fashion',
    subCategory: 'Bodycon Dresses',
    price: 14000,
    originalPrice: null,
    inStock: true,
    rating: 4.7,
    reviewsCount: 19,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bold visual styling meets figure-hugging comfort. Features long sleeves, smooth stretch fabric, and an exclusive modern editorial print.',
    colors: ['Abstract Taupe', 'Electric Marble'],
    sizes: ['S', 'M', 'L']
  },

  // Skincare Category
  {
    id: 'ceo-006',
    name: 'Radiance Glow Vitamin C Face Serum',
    category: 'skincare',
    subCategory: 'Face Serums',
    price: 8500,
    originalPrice: 11000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 42,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Concentrated illuminating serum enriched with 15% Pure Vitamin C, Hyaluronic Acid, and Niacinamide to restore skin radiance and fade dark spots.',
    colors: ['30ml Glass Dropper'],
    sizes: ['30ml']
  },
  {
    id: 'ceo-007',
    name: 'Hydrating Botanical Facial Cleanser',
    category: 'skincare',
    subCategory: 'Facial Cleansers',
    price: 6500,
    originalPrice: 8000,
    inStock: true,
    rating: 4.8,
    reviewsCount: 28,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Gentle pH-balanced soothing cleanser infused with Chamomile, Rosewater, and Aloe Vera to cleanse impurities without stripping natural skin moisture.',
    colors: ['Clear Gel Formula'],
    sizes: ['150ml']
  },
  {
    id: 'ceo-008',
    name: 'Ultra-Nourishing Body Glow Scrub',
    category: 'skincare',
    subCategory: 'Body Scrubs',
    price: 7500,
    originalPrice: 9500,
    inStock: true,
    rating: 5.0,
    reviewsCount: 36,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1608248540487-19fae3ca4455?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Exfoliating organic cane sugar scrub enriched with Coconut Oil and Shea Butter for silky, luminous, baby-soft skin.',
    colors: ['Vanilla Honey'],
    sizes: ['250g Jar']
  },

  // Beauty & Fragrance Category
  {
    id: 'ceo-009',
    name: 'Glass Glow Hydrating Lip Oil Set',
    category: 'beauty',
    subCategory: 'Lip Gloss & Oils',
    price: 5500,
    originalPrice: 7500,
    inStock: true,
    rating: 4.9,
    reviewsCount: 50,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-shine, non-sticky luxury lip oil infused with Jojoba and Vitamin E. Delivers ultra-moisturizing shine with a soft hint of blush tone.',
    colors: ['Berry Kiss', 'Peach Sorbet', 'Clear Diamond'],
    sizes: ['Set of 3']
  },
  {
    id: 'ceo-010',
    name: 'Velvet Jasmine Eau De Parfum',
    category: 'beauty',
    subCategory: 'Perfumes & Mists',
    price: 18000,
    originalPrice: 24000,
    inStock: true,
    rating: 5.0,
    reviewsCount: 65,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An alluring fragrance featuring top notes of French Lavender and Jasmine Sambac, anchored by warm Vanilla and Amber woodiness.',
    colors: ['Luxury Gold Bottle'],
    sizes: ['50ml']
  },

  // Wristwatches Category
  {
    id: 'ceo-011',
    name: 'Royale Champagne Gold Quartz Watch',
    category: 'wristwatches',
    subCategory: 'Gold Watches',
    price: 22000,
    originalPrice: 30000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 39,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A timeless statement wrist timepiece crafted with polished stainless steel gold plating, scratch-resistant mineral glass, and Japanese movement.',
    colors: ['Champagne Gold', 'Rose Gold Accent'],
    sizes: ['Standard Mesh Adjust']
  },
  {
    id: 'ceo-012',
    name: 'Minimalist Diamond-Dial Silver Watch',
    category: 'wristwatches',
    subCategory: 'Silver Watches',
    price: 19500,
    originalPrice: 25000,
    inStock: true,
    rating: 4.8,
    reviewsCount: 22,
    isNew: false,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sleek ultra-thin silver watch featuring a understated sunray dial with delicate crystal hour markers. Sophistication for everyday wear.',
    colors: ['Silver Chrome', 'Silver/Black Dial'],
    sizes: ['Adjustable Strap']
  },

  // Jewellery & Accessories Category
  {
    id: 'ceo-013',
    name: '18K Gold Plated Layered Pendant Necklace',
    category: 'jewellery',
    subCategory: 'Necklaces',
    price: 9500,
    originalPrice: 13000,
    inStock: true,
    rating: 5.0,
    reviewsCount: 47,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tarnish-resistant, hypoallergenic layered gold chain with an elegant medallion pendant. Designed to add instant chic appeal to any neckline.',
    colors: ['18K Gold Finish'],
    sizes: ['One Size Adjustable']
  },
  {
    id: 'ceo-014',
    name: 'Celestial Pearl Drop Statement Earrings',
    category: 'jewellery',
    subCategory: 'Earrings',
    price: 7000,
    originalPrice: 9000,
    inStock: true,
    rating: 4.7,
    reviewsCount: 16,
    isNew: false,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Freshwater pearl drop earrings framed in polished champagne gold wire. Lightweight, graceful, and hypoallergenic.',
    colors: ['Pearl White / Gold'],
    sizes: ['One Size']
  },

  // Bags & Purses Category
  {
    id: 'ceo-015',
    name: 'Monogram Croc-Embossed Mini Shoulder Bag',
    category: 'bags',
    subCategory: 'Mini Bags',
    price: 16500,
    originalPrice: 22000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 53,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Structured vegan leather shoulder bag with luxe crocodile embossing and gold chain detailing. Fits all your daily essentials effortlessly.',
    colors: ['Nude Beige', 'Ebony Black', 'Dusty Rose'],
    sizes: ['Medium Mini']
  },
  {
    id: 'ceo-016',
    name: 'Quilted Chain Crossbody Luxury Purse',
    category: 'bags',
    subCategory: 'Crossbody Bags',
    price: 18500,
    originalPrice: 24500,
    inStock: true,
    rating: 4.8,
    reviewsCount: 34,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Iconic diamond-quilted crossbody featuring a versatile turn-lock clasp and woven chain shoulder strap. Perfect from day to evening.',
    colors: ['Ivory Cream', 'Classic Black'],
    sizes: ['Standard']
  }
];

// Calculate discount percentage utility
const getDiscountPercentage = (original, current) => {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
};

// Formatter for Nigerian Naira currency
const formatNaira = (amount) => {
  return '₦' + Number(amount).toLocaleString('en-NG');
};

// MAIN CONTAINER APPLICATION COMPONENT
export default function App() {
  // Navigation & Page Router State
  const [activePage, setActivePage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // E-Commerce Data States (Cart & Wishlist stored in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ceo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ceo_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState('all');
  const [onlySaleFilter, setOnlySaleFilter] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('');

  // Persist Cart & Wishlist
  useEffect(() => {
    localStorage.setItem('ceo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ceo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Cart Management
  const addToCart = (product, selectedColor = null, selectedSize = null, quantity = 1) => {
    const color = selectedColor || (product.colors && product.colors[0]) || 'Standard';
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
    const cartItemId = `${product.id}-${color}-${size}`;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, {
        ...product,
        cartItemId,
        selectedColor: color,
        selectedSize: size,
        quantity
      }];
    });

    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from cart.');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Toggle
  const toggleWishlist = (product) => {
    const isWished = wishlist.some(item => item.id === product.id);
    if (isWished) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed from Wishlist`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Added "${product.name}" to Wishlist`);
    }
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  // Cart Totals Calculation
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cart]);

  const cartTotalSavings = useMemo(() => {
    return cart.reduce((acc, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return acc + ((item.originalPrice - item.price) * item.quantity);
      }
      return acc;
    }, 0);
  }, [cart]);

  // Page Routing Helper
  const navigateTo = (page, category = 'all') => {
    setActivePage(page);
    setActiveCategory(category);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProductDetails = (product) => {
    setSelectedProduct(product);
    setActivePage('product-details');
    setQuickViewProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // WhatsApp Message Generator Helpers
  const openWhatsAppEnquiry = (product) => {
    const phone = '+2349161314677';
    const message = `Hello Closet Extras Only! ✨\n\nI am interested in ordering/enquiring about:\n*Product:* ${product.name}\n*Price:* ${formatNaira(product.price)}\n*Ref ID:* ${product.id}\n\nPlease confirm availability and details. Thank you!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  // Products Filter logic
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(product => {
      // Category Filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'fashion' && product.category !== 'fashion') return false;
        if (activeCategory === 'skincare' && product.category !== 'skincare') return false;
        if (activeCategory === 'beauty' && product.category !== 'beauty') return false;
        if (activeCategory === 'wristwatches' && product.category !== 'wristwatches') return false;
        if (activeCategory === 'jewellery' && product.category !== 'jewellery') return false;
        if (activeCategory === 'bags' && product.category !== 'bags') return false;
        if (activeCategory === 'new' && !product.isNew) return false;
        if (activeCategory === 'bestsellers' && !product.isBestSeller) return false;
        if (activeCategory === 'special-offers' && (!product.originalPrice || product.originalPrice <= product.price)) return false;
      }

      // Sale Filter
      if (onlySaleFilter && (!product.originalPrice || product.originalPrice <= product.price)) {
        return false;
      }

      // Search Filter
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        if (!matchName && !matchCat && !matchDesc) return false;
      }

      // Price filter
      if (priceFilter === 'under10k' && product.price >= 10000) return false;
      if (priceFilter === '10kto20k' && (product.price < 10000 || product.price > 20000)) return false;
      if (priceFilter === 'above20k' && product.price <= 20000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, onlySaleFilter, searchTerm, priceFilter, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#0A0A0A] font-sans selection:bg-[#F4DDE2] selection:text-[#0A0A0A]">
      
      {/* Dynamic Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#0A0A0A] text-[#FFFDF9] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#C6A36A] animate-bounce text-sm font-medium">
          <Sparkles className="w-4 h-4 text-[#C6A36A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating WhatsApp Support Widget */}
      <a
        href="https://wa.me/2349161314677?text=Hello%20Closet%20Extras%20Only!%20I%20have%20an%20enquiry%20regarding%20your%20boutique%20collection."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Customer Support on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-xs font-semibold pl-0 group-hover:pl-2">
          Chat With Us
        </span>
      </a>

      {/* 1. EDITABLE PROMOTIONAL ANNOUNCEMENT BAR */}
      <div className="bg-[#0A0A0A] text-[#FFFDF9] text-xs py-2.5 px-4 text-center tracking-widest uppercase font-medium flex justify-between items-center px-6 border-b border-[#C6A36A]/30">
        <div className="hidden sm:block text-[11px] text-[#A99489]">UGBOWO, BENIN CITY, NIGERIA</div>
        <div className="flex-1 text-center font-serif text-sm text-[#F4DDE2]">
          ✨ Discover Your Next Favourite Look — Free Local Collection Available in Benin City ✨
        </div>
        <a 
          href="https://chat.whatsapp.com/Foeb1GvWGiz3Lof6ZmHse6" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1 text-[#C6A36A] hover:underline text-[11px]"
        >
          <span>Join VIP WhatsApp Community</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* 2. MAIN HEADER & NAVIGATION */}
      <header className="sticky top-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E9DDCF] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#0A0A0A] hover:text-[#C6A36A] transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo & Slogan */}
          <div 
            onClick={() => navigateTo('home')} 
            className="cursor-pointer flex flex-col items-center lg:items-start group"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#0A0A0A] group-hover:text-[#A99489] transition-colors">
              CLOSET EXTRAS <span className="text-[#C6A36A]">ONLY</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#A99489] font-medium hidden sm:block">
              Your Extras, Your Style, Your Confidence.
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-widest uppercase font-medium text-[#0A0A0A]">
            <button 
              onClick={() => navigateTo('home')} 
              className={`hover:text-[#C6A36A] transition-colors pb-1 border-b-2 ${activePage === 'home' ? 'border-[#C6A36A] text-[#C6A36A]' : 'border-transparent'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('shop', 'all')} 
              className={`hover:text-[#C6A36A] transition-colors pb-1 border-b-2 ${activePage === 'shop' && activeCategory === 'all' ? 'border-[#C6A36A] text-[#C6A36A]' : 'border-transparent'}`}
            >
              Shop All
            </button>
            <button 
              onClick={() => navigateTo('shop', 'fashion')} 
              className={`hover:text-[#C6A36A] transition-colors pb-1 border-b-2 ${activeCategory === 'fashion' ? 'border-[#C6A36A] text-[#C6A36A]' : 'border-transparent'}`}
            >
              Fashion
            </button>
            <button 
              onClick={() => navigateTo('shop', 'skincare')} 
              className={`hover:text-[#C6A36A] transition-colors pb-1 border-b-2 ${activeCategory === 'skincare' ? 'border-[#C6A36A] text-[#C6A36A]' : 'border-transparent'}`}
            >
              Skincare
            </button>
            <button 
              onClick={() => navigateTo('shop', 'beauty')} 
              className={`hover:text-[#C6A36A] transition-colors pb-1 border-b-2 ${activeCategory === 'beauty' ? 'border-[#C6A36A] text-[#C6A36A]' : 'border-transparent'}`}
            >
              Beauty
            </button>
            <button 
              onClick={() => navigateTo('shop', 'wristwatches')} 
              className={`hover:text-[#C6A36A] transition-colors pb-1 border-b-2 ${activeCategory === 'wristwatches' ? 'border-[#C6A36A] text-[#C6A36A]' : 'border-transparent'}`}
            >
              Watches
            </button>
            <button 
              onClick={() => navigateTo('shop', 'special-offers')} 
              className="text-[#C6A36A] font-bold hover:text-[#0A0A0A] transition-colors flex items-center gap-1"
            >
              <span>Offers</span>
              <span className="bg-[#F4DDE2] text-[#0A0A0A] text-[9px] px-1.5 py-0.5 rounded-full">Sale</span>
            </button>
            <button 
              onClick={() => navigateTo('about')} 
              className={`hover:text-[#C6A36A] transition-colors pb-1 border-b-2 ${activePage === 'about' ? 'border-[#C6A36A] text-[#C6A36A]' : 'border-transparent'}`}
            >
              About
            </button>
            <button 
              onClick={() => navigateTo('contact')} 
              className={`hover:text-[#C6A36A] transition-colors pb-1 border-b-2 ${activePage === 'contact' ? 'border-[#C6A36A] text-[#C6A36A]' : 'border-transparent'}`}
            >
              Contact
            </button>
          </nav>

          {/* Action Icons (Search, Wishlist, Cart Drawer) */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-[#0A0A0A] hover:text-[#C6A36A] transition-colors relative"
              aria-label="Search Catalogue"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-[#0A0A0A] hover:text-[#C6A36A] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#C6A36A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setCartDrawerOpen(true)}
              className="p-2 bg-[#0A0A0A] text-[#FFFDF9] hover:bg-[#C6A36A] transition-colors rounded-full relative p-2.5 flex items-center justify-center"
              aria-label="Shopping Cart Drawer"
            >
              <ShoppingBag className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F4DDE2] text-[#0A0A0A] border border-[#0A0A0A] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-[#FFFDF9] h-full shadow-2xl flex flex-col p-6 overflow-y-auto border-r border-[#E9DDCF]">
            <div className="flex justify-between items-center pb-6 border-b border-[#E9DDCF]">
              <span className="font-serif text-lg font-bold">CLOSET EXTRAS ONLY</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="py-6 flex flex-col space-y-4 text-sm font-medium uppercase tracking-wider">
              <button onClick={() => navigateTo('home')} className="text-left py-2 hover:text-[#C6A36A]">Home</button>
              <button onClick={() => navigateTo('shop', 'all')} className="text-left py-2 hover:text-[#C6A36A]">Shop All Catalogue</button>
              <button onClick={() => navigateTo('shop', 'fashion')} className="text-left py-2 hover:text-[#C6A36A]">Fashion & Clothing</button>
              <button onClick={() => navigateTo('shop', 'skincare')} className="text-left py-2 hover:text-[#C6A36A]">Skincare Essentials</button>
              <button onClick={() => navigateTo('shop', 'beauty')} className="text-left py-2 hover:text-[#C6A36A]">Beauty & Perfumes</button>
              <button onClick={() => navigateTo('shop', 'wristwatches')} className="text-left py-2 hover:text-[#C6A36A]">Wristwatches</button>
              <button onClick={() => navigateTo('shop', 'jewellery')} className="text-left py-2 hover:text-[#C6A36A]">Jewellery & Accessories</button>
              <button onClick={() => navigateTo('shop', 'bags')} className="text-left py-2 hover:text-[#C6A36A]">Bags & Purses</button>
              <button onClick={() => navigateTo('shop', 'special-offers')} className="text-left py-2 text-[#C6A36A] font-bold">Special Offers (Sale)</button>
              <button onClick={() => navigateTo('about')} className="text-left py-2 hover:text-[#C6A36A]">About Us</button>
              <button onClick={() => navigateTo('contact')} className="text-left py-2 hover:text-[#C6A36A]">Contact & Support</button>
              <button onClick={() => navigateTo('faq')} className="text-left py-2 hover:text-[#C6A36A]">Customer FAQ</button>
            </div>

            <div className="mt-auto pt-6 border-t border-[#E9DDCF] text-xs text-[#A99489] space-y-2">
              <p className="font-semibold text-[#0A0A0A]">Location:</p>
              <p>Ugbowo, Benin City, Edo State, Nigeria</p>
              <p>WhatsApp: +2349161314677</p>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH OVERLAY MODAL */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div className="bg-[#FFFDF9] w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative border border-[#E9DDCF]">
            <button 
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#0A0A0A] hover:text-[#C6A36A]"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="font-serif text-xl font-bold mb-4">Search Boutique Collection</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search dresses, serums, watches, lip oils..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#C6A36A]"
                autoFocus
              />
              <Search className="w-5 h-5 absolute left-4 top-4 text-[#A99489]" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="text-[#A99489]">Popular Searches:</span>
              <button onClick={() => { setSearchTerm('Dress'); setSearchModalOpen(false); navigateTo('shop'); }} className="underline hover:text-[#C6A36A]">Dresses</button>
              <button onClick={() => { setSearchTerm('Serum'); setSearchModalOpen(false); navigateTo('shop'); }} className="underline hover:text-[#C6A36A]">Face Serum</button>
              <button onClick={() => { setSearchTerm('Watch'); setSearchModalOpen(false); navigateTo('shop'); }} className="underline hover:text-[#C6A36A]">Wristwatches</button>
              <button onClick={() => { setSearchTerm('Lip'); setSearchModalOpen(false); navigateTo('shop'); }} className="underline hover:text-[#C6A36A]">Lip Oils</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC PAGE ROUTING VIEWS */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomePageView 
            navigateTo={navigateTo} 
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
            setQuickViewProduct={setQuickViewProduct}
            viewProductDetails={viewProductDetails}
          />
        )}

        {activePage === 'shop' && (
          <ShopCatalogueView
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            filteredProducts={filteredProducts}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
            setQuickViewProduct={setQuickViewProduct}
            viewProductDetails={viewProductDetails}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            onlySaleFilter={onlySaleFilter}
            setOnlySaleFilter={setOnlySaleFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {activePage === 'product-details' && selectedProduct && (
          <ProductDetailsView
            product={selectedProduct}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
            openWhatsAppEnquiry={openWhatsAppEnquiry}
            navigateTo={navigateTo}
            viewProductDetails={viewProductDetails}
          />
        )}

        {activePage === 'wishlist' && (
          <WishlistView
            wishlist={wishlist}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            viewProductDetails={viewProductDetails}
            navigateTo={navigateTo}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPageView
            cart={cart}
            cartSubtotal={cartSubtotal}
            cartTotalSavings={cartTotalSavings}
            clearCart={clearCart}
            navigateTo={navigateTo}
          />
        )}

        {activePage === 'about' && (
          <AboutUsPageView navigateTo={navigateTo} />
        )}

        {activePage === 'contact' && (
          <ContactPageView />
        )}

        {activePage === 'faq' && (
          <FAQPageView />
        )}
      </main>

      {/* QUICK VIEW PRODUCT MODAL */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist(quickViewProduct.id)}
          viewProductDetails={viewProductDetails}
          openWhatsAppEnquiry={openWhatsAppEnquiry}
        />
      )}

      {/* SHOPPING CART SIDEBAR DRAWER */}
      {cartDrawerOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartDrawerOpen(false)}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          cartSubtotal={cartSubtotal}
          cartTotalSavings={cartTotalSavings}
          navigateTo={navigateTo}
        />
      )}

      {/* 4. LUXURY BRAND FOOTER */}
      <FooterSection navigateTo={navigateTo} />
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 1: HOME PAGE VIEW
// ==========================================
function HomePageView({ navigateTo, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, viewProductDetails }) {
  const featuredProducts = INITIAL_PRODUCTS.slice(0, 8);
  const newArrivals = INITIAL_PRODUCTS.filter(p => p.isNew).slice(0, 4);
  const specialOffers = INITIAL_PRODUCTS.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* EDITORIAL HERO SECTION */}
      <section className="relative min-h-[85vh] bg-[#F4DDE2]/40 flex items-center overflow-hidden border-b border-[#E9DDCF]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Fashion Editorial"
            className="w-full h-full object-cover object-center opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FFFDF9] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A36A]" />
              <span>Modern Feminine Boutique</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight">
              YOUR STYLE. <br />
              <span className="text-[#A99489] font-light italic">YOUR BEAUTY.</span> <br />
              <span className="text-[#C6A36A]">YOUR EXTRAS.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#0A0A0A]/80 max-w-xl font-light leading-relaxed">
              Discover beautiful fashion, skincare essentials, elegant wristwatches, jewellery, and everyday luxury favorites — thoughtfully selected to make every moment feel special.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => navigateTo('shop', 'all')}
                className="bg-[#0A0A0A] text-[#FFFDF9] px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-[#C6A36A] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>SHOP COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => navigateTo('shop', 'new')}
                className="bg-[#FFFDF9] border-2 border-[#0A0A0A] text-[#0A0A0A] px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-[#F4DDE2] transition-colors shadow-sm flex items-center justify-center"
              >
                EXPLORE NEW ARRIVALS
              </button>
            </div>

            {/* Quick stats strip */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#A99489]/30 text-center sm:text-left">
              <div>
                <p className="font-serif text-xl font-bold text-[#0A0A0A]">100%</p>
                <p className="text-[11px] text-[#A99489] uppercase tracking-wider">Curated Quality</p>
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-[#0A0A0A]">Fast Delivery</p>
                <p className="text-[11px] text-[#A99489] uppercase tracking-wider">Benin City & Nationwide</p>
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-[#0A0A0A]">Affordable</p>
                <p className="text-[11px] text-[#A99489] uppercase tracking-wider">Luxury Essentials</p>
              </div>
            </div>
          </div>

          {/* Hero Image Card Frame */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9] transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" 
                alt="Closet Extras Woman"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-[#FFFDF9]/90 backdrop-blur-md p-4 rounded-2xl border border-[#E9DDCF]">
                <p className="text-xs font-serif font-bold uppercase tracking-wider text-[#0A0A0A]">Featured Highlight</p>
                <p className="text-sm font-semibold text-[#C6A36A]">Polka Dot Tiered Ruffle Mini Dress</p>
                <p className="text-xs text-[#A99489]">{formatNaira(15000)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C6A36A] font-semibold">Boutique Catalogue</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Shop By Category</h2>
          <p className="text-sm text-[#A99489]">Explore our complete selection of feminine apparel, skincare, and luxury accessories.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: 'fashion', name: 'Fashion', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80' },
            { id: 'skincare', name: 'Skincare', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80' },
            { id: 'beauty', name: 'Beauty', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80' },
            { id: 'wristwatches', name: 'Wristwatches', img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80' },
            { id: 'jewellery', name: 'Jewellery', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80' },
            { id: 'bags', name: 'Bags & Purses', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80' }
          ].map(cat => (
            <div 
              key={cat.id}
              onClick={() => navigateTo('shop', cat.id)}
              className="group cursor-pointer rounded-2xl overflow-hidden relative h-64 bg-[#E9DDCF] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img 
                src={cat.img} 
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent flex flex-col justify-end p-4 text-center">
                <span className="text-[#FFFDF9] font-serif font-bold text-lg tracking-wide group-hover:text-[#F4DDE2] transition-colors">
                  {cat.name}
                </span>
                <span className="text-[10px] text-[#C6A36A] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore Collection →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 border-b border-[#E9DDCF] pb-4 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C6A36A] font-semibold">Handpicked Favorites</span>
            <h2 className="font-serif text-3xl font-bold">Featured Products</h2>
          </div>
          <button 
            onClick={() => navigateTo('shop', 'all')}
            className="text-xs font-bold uppercase tracking-wider hover:text-[#C6A36A] flex items-center gap-1"
          >
            <span>View All Catalogue ({INITIAL_PRODUCTS.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              isInWishlist={isInWishlist(product.id)}
              setQuickViewProduct={setQuickViewProduct}
              viewProductDetails={viewProductDetails}
            />
          ))}
        </div>
      </section>

      {/* SPECIAL OFFERS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A0A0A] text-[#FFFDF9] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-[#C6A36A]/40">
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="bg-[#C6A36A] text-[#0A0A0A] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                LIMITED TIME SALE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F4DDE2]">
                PRETTY FINDS. BETTER PRICES.
              </h2>
              <p className="text-sm text-[#A99489] max-w-lg">
                Enjoy exclusive discounted prices across selected dresses, serums, and accessories. Express your elegance without breaking the bank.
              </p>
              <button 
                onClick={() => navigateTo('shop', 'special-offers')}
                className="mt-4 inline-flex items-center gap-2 bg-[#F4DDE2] text-[#0A0A0A] px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-[#C6A36A] hover:text-white transition-colors"
              >
                <span>SHOP SPECIAL OFFERS NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {specialOffers.slice(0, 2).map(item => (
                <div key={item.id} className="bg-[#FFFDF9] text-[#0A0A0A] p-3 rounded-2xl shadow-lg border border-[#E9DDCF]">
                  <img src={item.images[0]} alt={item.name} className="w-full h-36 object-cover rounded-xl mb-2" />
                  <p className="text-xs font-semibold truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-[#0A0A0A]">{formatNaira(item.price)}</span>
                    <span className="text-[10px] line-through text-[#A99489]">{formatNaira(item.originalPrice)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STORY & PHILOSOPHY */}
      <section className="bg-[#E9DDCF]/30 py-16 border-y border-[#E9DDCF]">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#C6A36A] font-semibold">Our Philosophy</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">MORE THAN JUST THE EXTRAS</h2>
          <p className="text-base text-[#0A0A0A]/80 leading-relaxed max-w-3xl mx-auto font-light">
            Closet Extras Only is a modern feminine boutique dedicated to helping women express their beauty, confidence, and personal style through carefully selected, stylish, and affordable everyday essentials. We believe looking elegant and feeling confident should never require spending a fortune.
          </p>
          <div className="pt-4 italic font-serif text-lg text-[#C6A36A]">
            "Your Extras, Your Style, Your Confidence."
          </div>
        </div>
      </section>

      {/* WHY SHOP WITH US CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: 'Affordable Style', desc: 'High fashion & luxury skincare curated for accessible prices.' },
            { icon: ShieldCheck, title: 'Handpicked Quality', desc: 'Every product is personally inspected before reaching your closet.' },
            { icon: Truck, title: 'Convenient Delivery', desc: 'Fast local dispatch in Benin City and nationwide shipping.' },
            { icon: MessageCircle, title: 'Friendly Service', desc: 'Direct WhatsApp customer care available for tailored advice.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E9DDCF] shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-[#F4DDE2] text-[#0A0A0A] rounded-full flex items-center justify-center mx-auto">
                <item.icon className="w-6 h-6 text-[#C6A36A]" />
              </div>
              <h3 className="font-serif font-bold text-lg">{item.title}</h3>
              <p className="text-xs text-[#A99489] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHATSAPP COMMUNITY INVITATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#25D366]/10 via-[#F4DDE2] to-[#FFFDF9] p-8 sm:p-12 rounded-3xl border border-[#25D366]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
              <MessageCircle className="w-4 h-4" /> VIP WhatsApp Group
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">BE PART OF OUR PRETTY COMMUNITY</h3>
            <p className="text-sm text-[#0A0A0A]/70 max-w-xl">
              Join our exclusive WhatsApp community to get instant restock alerts, first access to new arrivals, and special member-only discounts.
            </p>
          </div>
          <a
            href="https://chat.whatsapp.com/Foeb1GvWGiz3Lof6ZmHse6"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
          >
            <span>JOIN OUR WHATSAPP COMMUNITY</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
}

// ==========================================
// SUB-COMPONENT 2: SHOP CATALOGUE VIEW
// ==========================================
function ShopCatalogueView({
  activeCategory, setActiveCategory, filteredProducts, addToCart,
  toggleWishlist, isInWishlist, setQuickViewProduct, viewProductDetails,
  priceFilter, setPriceFilter, onlySaleFilter, setOnlySaleFilter,
  sortBy, setSortBy, searchTerm, setSearchTerm
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#E9DDCF]/40 p-8 rounded-3xl border border-[#E9DDCF] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C6A36A] font-semibold">Boutique Catalogue</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wide">
            {activeCategory === 'all' ? 'Shop All Essentials' : `${activeCategory} Collection`}
          </h1>
          <p className="text-xs text-[#A99489] mt-1">Showing {filteredProducts.length} items available in boutique</p>
        </div>

        {/* Category Pills Slider */}
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          {['all', 'fashion', 'skincare', 'beauty', 'wristwatches', 'jewellery', 'bags', 'special-offers'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full uppercase tracking-wider transition-all ${
                activeCategory === cat 
                  ? 'bg-[#0A0A0A] text-[#FFFDF9] shadow-md' 
                  : 'bg-[#FFFDF9] border border-[#E9DDCF] text-[#0A0A0A] hover:bg-[#F4DDE2]'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E9DDCF] shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Price Range Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#C6A36A]" />
            <span className="font-bold">Price:</span>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-lg py-1.5 px-3 focus:outline-none"
            >
              <option value="all">All Prices</option>
              <option value="under10k">Under ₦10,000</option>
              <option value="10kto20k">₦10,000 - ₦20,000</option>
              <option value="above20k">Above ₦20,000</option>
            </select>
          </div>

          {/* Discount/Sale Filter Toggle */}
          <label className="flex items-center gap-2 cursor-pointer font-bold select-none">
            <input
              type="checkbox"
              checked={onlySaleFilter}
              onChange={(e) => setOnlySaleFilter(e.target.checked)}
              className="rounded text-[#C6A36A] focus:ring-[#C6A36A]"
            />
            <span className="text-[#C6A36A]">Discounted Items Only</span>
          </label>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="font-bold">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-lg py-1.5 px-3 focus:outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Main Catalogue Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              isInWishlist={isInWishlist(product.id)}
              setQuickViewProduct={setQuickViewProduct}
              viewProductDetails={viewProductDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#E9DDCF]/20 rounded-3xl border border-[#E9DDCF] space-y-4">
          <Search className="w-12 h-12 text-[#A99489] mx-auto" />
          <h3 className="font-serif text-2xl font-bold">No Products Found</h3>
          <p className="text-xs text-[#A99489]">Try resetting your filter parameters or search keyword.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setPriceFilter('all');
              setOnlySaleFilter(false);
              setSearchTerm('');
            }}
            className="bg-[#0A0A0A] text-[#FFFDF9] px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 3: PRODUCT CARD COMPONENT
// ==========================================
function ProductCard({ product, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, viewProductDetails }) {
  const discount = getDiscountPercentage(product.originalPrice, product.price);

  return (
    <div className="group bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#E9DDCF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {discount > 0 && (
          <span className="bg-[#0A0A0A] text-[#F4DDE2] border border-[#C6A36A] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {discount}% OFF
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#C6A36A] text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            NEW
          </span>
        )}
      </div>

      {/* Wishlist Heart Action Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 p-2 bg-[#FFFDF9]/80 backdrop-blur-md rounded-full shadow hover:bg-white transition-colors"
        aria-label="Wishlist"
      >
        <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-[#0A0A0A]'}`} />
      </button>

      {/* Product Image Frame */}
      <div 
        onClick={() => viewProductDetails(product)}
        className="relative h-72 bg-[#E9DDCF]/30 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Hover Quick View Trigger Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="bg-[#FFFDF9] text-[#0A0A0A] p-3 rounded-full shadow-lg hover:bg-[#C6A36A] hover:text-white transition-colors"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-grow space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-[#A99489] font-medium">
          {product.category}
        </span>
        
        <h3 
          onClick={() => viewProductDetails(product)}
          className="font-serif font-bold text-base text-[#0A0A0A] hover:text-[#C6A36A] cursor-pointer line-clamp-1 transition-colors"
        >
          {product.name}
        </h3>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-xs text-[#C6A36A]">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="font-bold">{product.rating}</span>
          <span className="text-[10px] text-[#A99489]">({product.reviewsCount})</span>
        </div>

        {/* Pricing System Display */}
        <div className="pt-2 flex items-baseline gap-2 mt-auto">
          <span className="font-serif text-lg font-bold text-[#0A0A0A]">
            {formatNaira(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs line-through text-[#A99489]">
              {formatNaira(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-3 bg-[#0A0A0A] text-[#FFFDF9] hover:bg-[#C6A36A] py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 4: PRODUCT DETAILS VIEW
// ==========================================
function ProductDetailsView({ product, addToCart, toggleWishlist, isInWishlist, openWhatsAppEnquiry, navigateTo, viewProductDetails }) {
  const [selectedImg, setSelectedImg] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : '');
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '');
  const [quantity, setQuantity] = useState(1);

  const discount = getDiscountPercentage(product.originalPrice, product.price);
  const relatedProducts = INITIAL_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#A99489]">
        <button onClick={() => navigateTo('home')} className="hover:underline">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('shop', product.category)} className="hover:underline capitalize">{product.category}</button>
        <span>/</span>
        <span className="text-[#0A0A0A] font-semibold">{product.name}</span>
      </div>

      {/* Main Detail Grid */}
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#E9DDCF]/30 rounded-3xl overflow-hidden border border-[#E9DDCF] h-[480px]">
            <img src={selectedImg} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImg === img ? 'border-[#C6A36A]' : 'border-[#E9DDCF]'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Specifications & CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C6A36A]">
              {product.category} — {product.subCategory}
            </span>
            <h1 className="font-serif text-3xl font-bold mt-1 text-[#0A0A0A]">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center text-xs text-[#C6A36A]">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-[#A99489]">| {product.reviewsCount} Boutique Reviews</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">In Stock</span>
            </div>
          </div>

          {/* Price Header */}
          <div className="bg-[#F4DDE2]/40 p-4 rounded-2xl border border-[#F4DDE2] flex items-baseline gap-4">
            <span className="font-serif text-3xl font-bold text-[#0A0A0A]">{formatNaira(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-sm line-through text-[#A99489]">{formatNaira(product.originalPrice)}</span>
                <span className="bg-[#0A0A0A] text-[#F4DDE2] text-xs font-bold px-2.5 py-1 rounded">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-[#0A0A0A]/80 leading-relaxed font-light">{product.description}</p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider">Select Shade / Color:</span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedColor === color
                        ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                        : 'bg-[#FFFDF9] border-[#E9DDCF] hover:bg-[#F4DDE2]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider">Select Size / Fit:</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      selectedSize === size
                        ? 'bg-[#C6A36A] text-white border-[#C6A36A]'
                        : 'bg-[#FFFDF9] border-[#E9DDCF] hover:bg-[#F4DDE2]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider">Quantity:</span>
            <div className="flex items-center border border-[#E9DDCF] w-32 rounded-xl bg-white p-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-[#0A0A0A] hover:bg-[#E9DDCF] rounded-lg"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="flex-1 text-center font-bold text-sm">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-[#0A0A0A] hover:bg-[#E9DDCF] rounded-lg"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Actions CTA Group */}
          <div className="space-y-3 pt-4 border-t border-[#E9DDCF]">
            <button
              onClick={() => addToCart(product, selectedColor, selectedSize, quantity)}
              className="w-full bg-[#0A0A0A] text-[#FFFDF9] py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#C6A36A] transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO SHOPPING BAG</span>
            </button>

            {/* Direct WhatsApp Product Enquiry Button */}
            <button
              onClick={() => openWhatsAppEnquiry(product)}
              className="w-full bg-[#25D366] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#20ba5a] transition-colors shadow flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>ENQUIRE ON WHATSAPP (+234 916 131 4677)</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="w-full bg-[#FFFDF9] border border-[#0A0A0A] text-[#0A0A0A] py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#F4DDE2] transition-colors flex items-center justify-center gap-2"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{isInWishlist(product.id) ? 'REMOVE FROM WISHLIST' : 'SAVE TO WISHLIST'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#E9DDCF] space-y-6">
          <h3 className="font-serif text-2xl font-bold">You May Also Love</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist(rel.id)}
                setQuickViewProduct={() => {}}
                viewProductDetails={viewProductDetails}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 5: QUICK VIEW MODAL
// ==========================================
function QuickViewModal({ product, onClose, addToCart, toggleWishlist, isInWishlist, viewProductDetails, openWhatsAppEnquiry }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative border border-[#E9DDCF] grid md:grid-cols-2">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white text-[#0A0A0A]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="h-80 md:h-full bg-[#E9DDCF]">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6A36A]">{product.category}</span>
            <h3 className="font-serif text-xl font-bold">{product.name}</h3>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold">{formatNaira(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs line-through text-[#A99489]">{formatNaira(product.originalPrice)}</span>
              )}
            </div>
            <p className="text-xs text-[#0A0A0A]/70 line-clamp-3">{product.description}</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="w-full bg-[#0A0A0A] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#C6A36A] transition-colors"
            >
              Add To Bag
            </button>
            <button
              onClick={() => {
                openWhatsAppEnquiry(product);
              }}
              className="w-full bg-[#25D366] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Enquire on WhatsApp</span>
            </button>
            <button
              onClick={() => {
                viewProductDetails(product);
                onClose();
              }}
              className="w-full text-center text-xs font-bold underline py-1 hover:text-[#C6A36A]"
            >
              View Full Product Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 6: CART SIDEBAR DRAWER
// ==========================================
function CartDrawer({ cart, onClose, updateCartQuantity, removeFromCart, cartSubtotal, cartTotalSavings, navigateTo }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#FFFDF9] h-full shadow-2xl flex flex-col p-6 overflow-y-auto border-l border-[#E9DDCF]">
        {/* Drawer Header */}
        <div className="flex justify-between items-center pb-4 border-b border-[#E9DDCF]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C6A36A]" />
            <h3 className="font-serif text-xl font-bold">Your Shopping Bag</h3>
          </div>
          <button onClick={onClose} className="p-2 text-[#0A0A0A] hover:text-[#C6A36A]">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Item List */}
        {cart.length > 0 ? (
          <>
            <div className="flex-1 py-4 space-y-4 overflow-y-auto">
              {cart.map(item => (
                <div key={item.cartItemId} className="flex gap-4 p-3 bg-[#E9DDCF]/20 rounded-2xl border border-[#E9DDCF]">
                  <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1 space-y-1">
                    <h4 className="font-serif text-xs font-bold text-[#0A0A0A] line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-[#A99489]">Shade/Size: {item.selectedColor} | {item.selectedSize}</p>
                    <p className="text-xs font-bold">{formatNaira(item.price)}</p>
                    
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-[#E9DDCF] rounded-lg bg-white">
                        <button onClick={() => updateCartQuantity(item.cartItemId, -1)} className="px-2 py-0.5 text-xs font-bold">-</button>
                        <span className="px-2 text-xs">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.cartItemId, 1)} className="px-2 py-0.5 text-xs font-bold">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-500 hover:text-red-700 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary Footer */}
            <div className="pt-4 border-t border-[#E9DDCF] space-y-3">
              {cartTotalSavings > 0 && (
                <div className="bg-[#F4DDE2] p-2.5 rounded-xl text-center text-xs font-bold text-[#0A0A0A]">
                  🎉 You are saving {formatNaira(cartTotalSavings)} on this order!
                </div>
              )}

              <div className="flex justify-between text-sm font-bold">
                <span>Subtotal:</span>
                <span className="font-serif text-lg">{formatNaira(cartSubtotal)}</span>
              </div>
              <p className="text-[10px] text-[#A99489]">Delivery charges calculated during WhatsApp checkout.</p>

              <button
                onClick={() => {
                  onClose();
                  navigateTo('checkout');
                }}
                className="w-full bg-[#0A0A0A] text-[#FFFDF9] py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#C6A36A] transition-colors shadow-xl"
              >
                PROCEED TO CHECKOUT →
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <ShoppingBag className="w-16 h-16 text-[#A99489]" />
            <p className="font-serif text-lg font-bold">Your shopping bag is empty</p>
            <button
              onClick={() => {
                onClose();
                navigateTo('shop');
              }}
              className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Start Shopping Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 7: CHECKOUT PAGE (WHATSAPP INTEGRATED)
// ==========================================
function CheckoutPageView({ cart, cartSubtotal, cartTotalSavings, clearCart, navigateTo }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Benin City',
    state: 'Edo State',
    notes: ''
  });

  const [deliveryFee] = useState(1500); // Standard Benin City delivery baseline
  const finalTotal = cartSubtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please complete all required fields (Name, Phone, and Address).');
      return;
    }

    // Build Formatted WhatsApp Order Summary String
    let itemsSummary = '';
    cart.forEach((item, idx) => {
      itemsSummary += `${idx + 1}. *${item.name}*\n   - Option: ${item.selectedColor} / ${item.selectedSize}\n   - Qty: ${item.quantity} x ${formatNaira(item.price)} = ${formatNaira(item.price * item.quantity)}\n\n`;
    });

    const message = `🛍️ *NEW BOUTIQUE ORDER — CLOSET EXTRAS ONLY* 🛍️\n\n` +
      `*CUSTOMER DETAILS:*\n` +
      `• Name: ${formData.fullName}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Email: ${formData.email || 'N/A'}\n` +
      `• Address: ${formData.address}, ${formData.city}, ${formData.state}\n` +
      (formData.notes ? `• Special Notes: ${formData.notes}\n\n` : `\n`) +
      `*ORDERED ITEMS:*\n${itemsSummary}` +
      `*ORDER SUMMARY:*\n` +
      `• Subtotal: ${formatNaira(cartSubtotal)}\n` +
      `• Total Discount Savings: ${formatNaira(cartTotalSavings)}\n` +
      `• Delivery Fee: ${formatNaira(deliveryFee)}\n` +
      `• *FINAL TOTAL:* ${formatNaira(finalTotal)}\n\n` +
      `Please confirm stock & payment instructions to complete my order! Thank you ✨`;

    const encoded = encodeURIComponent(message);
    const targetPhone = '+2349161314677';
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${targetPhone}?text=${encoded}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold">Your Bag is Empty</h2>
        <p className="text-xs text-[#A99489]">Add products to your cart before proceeding to checkout.</p>
        <button onClick={() => navigateTo('shop')} className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase">
          Explore Shop Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C6A36A]">Direct WhatsApp Ordering</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold">Checkout & Deliver</h1>
        <p className="text-xs text-[#A99489]">Fill in your details below to generate your order summary directly on WhatsApp.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Customer Information Form */}
        <form onSubmit={handleWhatsAppCheckout} className="lg:col-span-7 bg-[#FFFDF9] p-8 rounded-3xl border border-[#E9DDCF] shadow-sm space-y-6">
          <h3 className="font-serif text-xl font-bold pb-2 border-b border-[#E9DDCF]">Shipping Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Chinaza Nwachukwu"
                className="w-full bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#C6A36A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider">Phone Number (WhatsApp) *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 0916 131 4677"
                className="w-full bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#C6A36A]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider">Email Address (Optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. name@example.com"
              className="w-full bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#C6A36A]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider">Delivery Address *</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="House/Street address in Ugbowo or Benin City"
              className="w-full bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#C6A36A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl py-3 px-4 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl py-3 px-4 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider">Additional Delivery Notes</label>
            <textarea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Special instructions or landmark details..."
              className="w-full bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#C6A36A]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#25D366] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#20ba5a] transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>PLACE ORDER ON WHATSAPP (+234 916 131 4677)</span>
          </button>
        </form>

        {/* Order Summary Box */}
        <div className="lg:col-span-5 bg-[#E9DDCF]/30 p-6 rounded-3xl border border-[#E9DDCF] space-y-6">
          <h3 className="font-serif text-xl font-bold pb-2 border-b border-[#E9DDCF]">Order Summary</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.cartItemId} className="flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-[10px] text-[#A99489]">Qty: {item.quantity} ({item.selectedColor} / {item.selectedSize})</p>
                </div>
                <span className="font-bold">{formatNaira(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E9DDCF] pt-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatNaira(cartSubtotal)}</span>
            </div>
            {cartTotalSavings > 0 && (
              <div className="flex justify-between text-[#C6A36A] font-bold">
                <span>Total Discount Savings:</span>
                <span>-{formatNaira(cartTotalSavings)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Delivery Baseline:</span>
              <span>{formatNaira(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#0A0A0A] pt-2 border-t border-[#E9DDCF]">
              <span>Final Total:</span>
              <span className="font-serif text-xl">{formatNaira(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 8: WISHLIST VIEW
// ==========================================
function WishlistView({ wishlist, addToCart, toggleWishlist, viewProductDetails, navigateTo }) {
  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <Heart className="w-16 h-16 text-[#A99489] mx-auto" />
        <h2 className="font-serif text-3xl font-bold">Your Wishlist is Empty</h2>
        <p className="text-xs text-[#A99489]">Save your favourite dresses, serums, and accessories here.</p>
        <button onClick={() => navigateTo('shop')} className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase">
          Explore Boutique Items
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="font-serif text-3xl font-bold">Saved Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isInWishlist={true}
            setQuickViewProduct={() => {}}
            viewProductDetails={viewProductDetails}
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 9: ABOUT US PAGE VIEW
// ==========================================
function AboutUsPageView({ navigateTo }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#C6A36A] font-bold">About Closet Extras Only</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">Your Extras. Your Style. Your Confidence.</h1>
        <p className="text-sm text-[#A99489] max-w-2xl mx-auto">
          Located in the heart of Ugbowo, Benin City, Edo State, Nigeria.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-3xl overflow-hidden border-4 border-[#FFFDF9] shadow-2xl">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" alt="Boutique Environment" className="w-full h-[400px] object-cover" />
        </div>

        <div className="space-y-4 text-sm text-[#0A0A0A]/80 leading-relaxed">
          <h2 className="font-serif text-2xl font-bold text-[#0A0A0A]">Our Story & Mission</h2>
          <p>
            Closet Extras Only is a modern feminine fashion, beauty, and lifestyle boutique dedicated to helping women express their innate beauty, confidence, and personal style through carefully selected, stylish, and affordable everyday essentials.
          </p>
          <p>
            We offer a beautiful selection of elegant dresses, skincare essentials, beauty products, fashionable wristwatches, jewellery, handbags, and lifestyle accessories.
          </p>
          <p>
            Our mission is to make shopping for beautiful and stylish essentials convenient, enjoyable, and affordable. We firmly believe looking elegant and feeling confident should never require spending a fortune.
          </p>
          <button onClick={() => navigateTo('shop')} className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">
            Explore Our Catalogue
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 10: CONTACT PAGE VIEW
// ==========================================
function ContactPageView() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formatted = `Hello Closet Extras Only! ✨\n\n*CUSTOMER ENQUIRY*\n• Name: ${form.name}\n• Phone: ${form.phone}\n• Subject: ${form.subject}\n• Message: ${form.message}`;
    const encoded = encodeURIComponent(formatted);
    window.open(`https://wa.me/2349161314677?text=${encoded}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#C6A36A] font-bold">Get In Touch</span>
        <h1 className="font-serif text-4xl font-bold">Contact & Customer Care</h1>
        <p className="text-xs text-[#A99489]">We are always available to help you choose the right outfit or product.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E9DDCF] shadow-sm flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#C6A36A] shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-sm">Boutique Location</h4>
              <p className="text-xs text-[#A99489]">Ugbowo, Benin City, Edo State, Nigeria</p>
            </div>
          </div>

          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E9DDCF] shadow-sm flex items-start gap-4">
            <Phone className="w-6 h-6 text-[#C6A36A] shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-sm">Phone & WhatsApp Support</h4>
              <p className="text-xs text-[#A99489]">0916 131 4677 / +234 916 131 4677</p>
            </div>
          </div>

          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E9DDCF] shadow-sm flex items-start gap-4">
            <Mail className="w-6 h-6 text-[#C6A36A] shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-sm">Official Business Email</h4>
              <p className="text-xs text-[#A99489]">nwachukwuchinazaekpere5@gmail.com</p>
            </div>
          </div>
        </div>

        {/* WhatsApp Messaging Form */}
        <form onSubmit={handleContactSubmit} className="lg:col-span-7 bg-[#FFFDF9] p-8 rounded-3xl border border-[#E9DDCF] shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold">Send Direct WhatsApp Message</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Full Name"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl p-3 text-xs focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              required
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl p-3 text-xs focus:outline-none"
            />
          </div>

          <input
            type="text"
            placeholder="Subject (e.g. Size Availability / Skincare advice)"
            required
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            className="w-full bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl p-3 text-xs focus:outline-none"
          />

          <textarea
            rows="4"
            placeholder="Type your message here..."
            required
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full bg-[#E9DDCF]/30 border border-[#A99489]/30 rounded-xl p-3 text-xs focus:outline-none"
          />

          <button type="submit" className="w-full bg-[#25D366] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>SEND MESSAGE ON WHATSAPP</span>
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 11: FAQ PAGE VIEW
// ==========================================
function FAQPageView() {
  const faqs = [
    { q: 'Where is Closet Extras Only located?', a: 'Our physical hub is based in Ugbowo, Benin City, Edo State, Nigeria. We offer local collection and nationwide shipping across Nigeria.' },
    { q: 'How do I place an order?', a: 'Simply add items to your shopping cart and click "Proceed to Checkout". You can directly transmit your formatted order summary to our official WhatsApp line (+234 916 131 4677) for swift processing.' },
    { q: 'Are your skincare products suitable for sensitive skin?', a: 'All our skincare items are carefully curated and tested for safety. Detailed ingredients are listed under product specifications.' },
    { q: 'How long does delivery take?', a: 'Orders within Benin City are dispatched same-day or next-day. Nationwide deliveries across Nigeria take 2 to 4 business days.' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#C6A36A] font-bold">Frequently Asked Questions</span>
        <h1 className="font-serif text-3xl font-bold">Customer FAQ</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E9DDCF] shadow-sm space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#0A0A0A]">{faq.q}</h3>
            <p className="text-xs text-[#0A0A0A]/75 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT 12: BRAND FOOTER
// ==========================================
function FooterSection({ navigateTo }) {
  return (
    <footer className="bg-[#0A0A0A] text-[#FFFDF9] border-t border-[#C6A36A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <span className="font-serif text-xl font-bold tracking-wider">
            CLOSET EXTRAS <span className="text-[#C6A36A]">ONLY</span>
          </span>
          <p className="text-xs text-[#A99489] leading-relaxed">
            Modern feminine fashion, skincare, wristwatches, jewellery, and luxury lifestyle accessories designed to inspire confidence.
          </p>
          <div className="text-xs font-serif text-[#F4DDE2] italic">
            "Your Extras, Your Style, Your Confidence."
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 text-xs">
          <h4 className="font-serif text-sm font-bold text-[#C6A36A] uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2 text-[#A99489]">
            <li><button onClick={() => navigateTo('home')} className="hover:text-white">Home</button></li>
            <li><button onClick={() => navigateTo('shop', 'all')} className="hover:text-white">Shop Catalogue</button></li>
            <li><button onClick={() => navigateTo('shop', 'special-offers')} className="hover:text-white">Special Offers</button></li>
            <li><button onClick={() => navigateTo('about')} className="hover:text-white">About Us</button></li>
            <li><button onClick={() => navigateTo('contact')} className="hover:text-white">Contact & Support</button></li>
            <li><button onClick={() => navigateTo('faq')} className="hover:text-white">FAQ</button></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-3 text-xs">
          <h4 className="font-serif text-sm font-bold text-[#C6A36A] uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2 text-[#A99489]">
            <li><button onClick={() => navigateTo('shop', 'fashion')} className="hover:text-white">Fashion & Dresses</button></li>
            <li><button onClick={() => navigateTo('shop', 'skincare')} className="hover:text-white">Skincare Essentials</button></li>
            <li><button onClick={() => navigateTo('shop', 'beauty')} className="hover:text-white">Lip Oils & Perfumes</button></li>
            <li><button onClick={() => navigateTo('shop', 'wristwatches')} className="hover:text-white">Ladies Wristwatches</button></li>
            <li><button onClick={() => navigateTo('shop', 'jewellery')} className="hover:text-white">Jewellery & Accessories</button></li>
            <li><button onClick={() => navigateTo('shop', 'bags')} className="hover:text-white">Bags & Purses</button></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-xs text-[#A99489]">
          <h4 className="font-serif text-sm font-bold text-[#C6A36A] uppercase tracking-wider">Boutique Contact</h4>
          <p>Ugbowo, Benin City, Edo State, Nigeria</p>
          <p>Email: nwachukwuchinazaekpere5@gmail.com</p>
          <p>Phone: 0916 131 4677</p>
          <p>WhatsApp: +234 916 131 4677</p>
          <div className="pt-2">
            <a 
              href="https://chat.whatsapp.com/Foeb1GvWGiz3Lof6ZmHse6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline font-bold"
            >
              <span>Join WhatsApp VIP Community</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-[#A99489]/20 py-6 text-center text-xs text-[#A99489]">
        © {new Date().getFullYear()} CLOSET EXTRAS ONLY. All Rights Reserved. Luxury Feminine Fashion & Lifestyle.
      </div>
    </footer>
  );
}