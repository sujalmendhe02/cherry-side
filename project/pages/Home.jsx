import { useEffect, useState } from "react";
import { fetchProducts } from "../services/googleSheets";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data.slice(0, 4)); // featured
    };
    load();
  }, []);

  return (
    <div>

      <Hero />

      <section className="p-6">
        <h2 className="text-3xl font-bold mb-6">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}