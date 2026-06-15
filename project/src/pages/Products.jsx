import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/googleSheets";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6efe7]">

      {/* Header */}
      <div className="text-center pt-16 pb-12">
        <p className="text-[#7A0016] uppercase tracking-[3px] text-sm">
          Cherry Side Collection
        </p>

        <h1 className="text-5xl font-serif text-[#7A0016] mt-4">
          All Products
        </h1>

        <p className="text-[#6b4d4d] mt-3">
          Discover our curated gifting collection
        </p>
      </div>

      {/* Toolbar */}
      <div className="max-w-[1400px] mx-auto px-8 mb-10">
        <div className="flex justify-between items-center border-b border-[#dccfc4] pb-4">
          <div className="flex gap-8 text-[#6b4d4d] text-sm">
            <span className="text-[#6b4d4d] text-sm font-medium">
              Filter:
            </span>

            {/* Availability */}
            <select
              className="border border-[#d8c8bc] bg-white px-4 py-2 rounded-full text-sm text-[#5a3a3a] outline-none"
            >
              <option value="">Availability</option>
              <option value="all">All Products</option>
              <option value="instock">In Stock</option>
              <option value="lowstock">Low Stock (Below 5)</option>
              <option value="outofstock">Out of Stock</option>
            </select>
            {/* Price */}
            <select
              className="border border-[#d8c8bc] bg-white px-4 py-2 rounded-full text-sm text-[#5a3a3a] outline-none"
            >
              <option value="">Price</option>
              <option value="0-499">₹0 - ₹499</option>
              <option value="500-999">₹500 - ₹999</option>
              <option value="1000-1999">₹1000 - ₹1999</option>
              <option value="2000-4999">₹2000 - ₹4999</option>
              <option value="5000+">₹5000+</option>
            </select>
          </div>

          <span className="text-[#6b4d4d] text-sm">
            {products.length} Products
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1400px] mx-auto px-8 pb-20">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </div>
  );
}