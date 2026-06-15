import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HamperAddons.css";

export default function HamperAddons() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("budget");

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const budgetHampers = [
    { id: 201, name: "Luxury Grand Hampers", label: "Premium Selection", max: 1500, img: "/gift1.jpeg" },
    { id: 202, name: "Hampers Under 999", label: "Mid Tier Elegance", max: 999, img: "/gift2.jpeg" },
    { id: 203, name: "Hampers Under 699", label: "Thoughtful Budget", max: 699, img: "/gift3.jpeg" },
    { id: 204, name: "Hampers Under 499", label: "Sweet & Minimalist", max: 499, img: "/gift4.jpeg" },
  ];

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?sheet=Products"
        );

        const data = await res.json();
        setAllProducts(data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // FILTER FUNCTION (optional UI use)
  const handleBudgetClick = (maxPrice) => {
    const filtered = allProducts.filter(
      (p) => Number(p.price) <= maxPrice
    );

    setFilteredProducts(filtered);
    setActiveTab("budget");
  };

  return (
    <section className="cherry-addons-section">

      {/* HEADER */}
      <div className="cherry-addons-studio-bar">
        <div className="addons-title-stack">
          <span className="addons-super-tag">FINISHING TOUCHES</span>
          <h2 className="addons-studio-title">Tailor To Fit Your Intent</h2>
        </div>

        <div className="cherry-luxury-tab-switch">
          <button
            className={`lux-switch-btn ${activeTab === "budget" ? "is-active" : ""}`}
            onClick={() => setActiveTab("budget")}
          >
            Budget Hampers
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="cherry-addons-render-view">

        {activeTab === "budget" && (
          <>
            <div className="cherry-budget-deck-grid">
              {budgetHampers.map((hamper) => (
                <div
                  key={hamper.id}
                  className="cherry-budget-clean-card"
                  onClick={() =>
                    navigate(
                      `/products?maxPrice=${
                        hamper.id === 201 ? 5000 : hamper.max
                      }`
                    )
                  }
                >
                  <div className="budget-card-visual">
                    <img src={hamper.img} alt={hamper.name} />
                  </div>

                  <div className="budget-card-text-dock">
                    <span className="budget-meta-label">{hamper.label}</span>
                    <h3 className="budget-primary-name">{hamper.name}</h3>
                    <div className="budget-footer-trigger">
                      <span className="budget-value-span">
                        Under ₹{hamper.max}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional results preview */}
            {filteredProducts.length > 0 && (
              <div className="cherry-budget-results">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="result-card">
                    <img src={p.image} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p>₹{p.price}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}