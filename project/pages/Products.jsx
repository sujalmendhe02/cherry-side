import { useEffect, useState } from "react";
import { fetchProducts } from "../services/googleSheets";
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
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        All Products
      </h1>

      <div className="grid md:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </div>
  );
}