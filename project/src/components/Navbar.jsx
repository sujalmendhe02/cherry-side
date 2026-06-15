import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const giftCategories = [
    "Curated Hampers",
    "Handmade Keepsakes",
    "Premium Gift Boxes",
    "Custom Ribbons",
    "Scrunchies & Clips"
  ];

  return (
    <header className="cherry-luxury-header">

      {/* Top Strip */}
      <div className="cherry-top-strip">
        Where gifting feels personal 🍒 Ships Across India
      </div>

      {/* Main Nav */}
      <div className="cherry-nav-container">

        {/* Brand */}
        <div className="cherry-brand-block" onClick={() => navigate("/")}>
          <div className="cherry-logo-transparent-frame">
            <img
              src="/cherry_logo.png"
              alt="Cherry Side"
              className="cherry-isolated-element"
            />
          </div>

          <div className="cherry-brand-text">
            CHERRY SIDE
          </div>
        </div>

        {/* Center Menu */}
        <div className="cherry-links-hub">

          <button className="cherry-menu-item" onClick={() => navigate("/")}>
            HOME
          </button>

          {/* Dropdown */}
          <div className="cherry-menu-item" style={{ position: "relative" }}>
            GIFTS & HAMPERS ▼

            <div className="cherry-dropdown">
              {giftCategories.map((item, i) => (
                <button
                  key={i}
                  className="cherry-dropdown-item"
                  onClick={() =>
                    navigate(`/products?category=${item.toLowerCase().replace(/\s+/g, "-")}`)
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button className="cherry-menu-item" onClick={() => navigate("/products")}>
            ALL PRODUCTS
          </button>

          <button className="cherry-menu-item" onClick={() => navigate("/about")}>
            OUR STORY
          </button>

          {/* FIXED */}
          <button className="cherry-menu-item" onClick={() => navigate("/policies")}>
            POLICIES
          </button>

        </div>

        {/* Right Icons (ONLY USER + CART, SEARCH REMOVED) */}
        <div className="cherry-utils-group">

          {/* Contact */}
          <button
            className="cherry-icon-btn"
            onClick={() => navigate("/contact")}
            aria-label="Contact Us"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="22"
              height="22"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a1.5 1.5 0 0 0 1.5-1.5v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.5 1.5 0 0 0-1.465.417l-.97.97a12.035 12.035 0 0 1-5.357-5.357l.97-.97a1.5 1.5 0 0 0 .417-1.465L8.213 3.852A1.5 1.5 0 0 0 7.122 3H5.75a1.5 1.5 0 0 0-1.5 1.5v2.25Z"
              />
            </svg>
          </button>

          {/* Cart */}
          <button className="cherry-icon-btn" onClick={() => navigate("/cart")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.3-1.9 1.2 12a1.1 1.1 0 0 1-1.1 1.2H4.2a1.1 1.1 0 0 1-1.1-1.2l1.2-12" />
            </svg>

            <span className="cherry-cart-badge">0</span>
          </button>

        </div>

      </div>
    </header>
  );
}