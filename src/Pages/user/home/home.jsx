import React, { useState, useEffect } from 'react';
import { getProduct } from "../../../services/products/getProduct";
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  // 1. Function jo product ka data receive karke checkout par bhejega
  const handleDirectCheckout = (product) => {
    navigate("/checkout", {
      state: { 
        cartItems: [product], // Is product ko array mein bhej rahe hain
        total: product.price   // Iska price total ban jayega
      }
    });
  };

  const categoryData = [
    { name: 'All', icon: 'grid_view' },
    { name: 'Electronics', icon: 'devices' },
    { name: 'Fashion', icon: 'checkroom' },
    { name: 'Home', icon: 'chair' },
    { name: 'Beauty', icon: 'face_6' }
  ];

  const profile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct();
        setProducts(response.getProduct);
      } catch (err) {
        console.log(`Products not Found ${err.message}`);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesCategory = activeCategory === 'All' ||
      item.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
const logintredirect = () => {
    navigate("/login");
  };

  return (
    <div className="home-wrapper">
      {/* --- Navbar --- */}
      <nav className="main-nav">
        <div className="nav-content container">
          <div className="logo-section" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
            <div className="logo-icon">
              <span className="material-symbols-outlined">shopping_bag</span>
            </div>
            <span className="logo-name">ShopModern</span>
          </div>

          <div className="search-container">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search products, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="nav-actions">
            <button className="nav-icon-btn">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <button className="nav-icon-btn" onClick={profile}>
              <span className="material-symbols-outlined">person</span>
            </button>
            <button className="nav-icon-btn" onClick={logintredirect}>
              <span className="">login</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container main-content">
        {/* --- Hero Banner Section --- */}
        <section className="hero-banner">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070"
            alt="Hero Banner"
            className="hero-img"
          />
          <div className="hero-text">
            <span className="hero-tag">New Collection 2026</span>
            <h1>Experience the Future of E-commerce</h1>
            <p>Get exclusive deals and personalized recommendations on top brands.</p>
            <button className="hero-btn">Shop Now</button>
          </div>
        </section>

        {/* --- Shop by Category Section --- */}
        <section className="category-section">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <button className="view-all-btn">View All</button>
          </div>

          <div className="category-grid-layout">
            {categoryData.map((cat) => (
              <div
                key={cat.name}
                className={`category-card ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                <div className="category-icon-wrapper">
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <span className="category-card-name">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Product Grid --- */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item._id} className="product-card">
                <div className="card-img-box">
                  <img src={item.image || "https://via.placeholder.com/300"} alt={item.name} />
                  <span className="img-category-tag">{item.category}</span>
                </div>
                <div className="card-info">
                  <span className="item-cat-label">{item.category}</span>
                  <h3 className="item-name">{item.name}</h3>
                  <div className="card-footer-row">
                    <span className="item-price">${item.price}</span>
                    <div className="action-btns">
                      {/* 2. Button par click hone par handleDirectCheckout call ho raha hai */}
                      <button className="add-btn" onClick={() => handleDirectCheckout(item)}>
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <span className="material-symbols-outlined">inventory_2</span>
              <h3>No products found</h3>
            </div>
          )}
        </div>
      </div>

      {/* --- Footer --- */}
      <footer className="main-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo-section">
              <div className="logo-icon">
                <span className="material-symbols-outlined">shopping_bag</span>
              </div>
              <span className="logo-name">ShopModern</span>
            </div>
            <p className="brand-desc">
              Experience the future of shopping with our curated collection of premium products.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>About Us</li>
              <li>Latest Products</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Customer Support</h4>
            <ul>
              <li>Track Your Order</li>
              <li>Contact: support@shopmodern.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container bottom-flex">
            <p>© 2026 ShopModern. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;