import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../services/googleSheets";
import { addToCart } from "../services/cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      const found = data.find((p) => p.id === id);
      setProduct(found);
    };
    load();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="p-6 grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          className="w-full h-[400px] object-cover rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-3">
            {product.description}
          </p>

          <p className="text-2xl font-bold mt-4">
            ₹{product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
          >
            Add to Cart
          </button>
        </div>

      </div>

      <Footer />
    </>
  );
}