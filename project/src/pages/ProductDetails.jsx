//productdetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../services/googleSheets";
import { addToCart } from "../../services/cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      console.log(data);
      console.log(id);
      const found = data.find(
        (p) => String(p.id).trim() === String(id).trim()
      );
      setProduct(found);
      console.log("Found Product:", found);
    };
    load();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.name}
            </h1>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {product.description}
            </p>

            <p className="text-3xl font-bold mt-6 text-gray-800">
              ₹{product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-6 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      
    </>
  );
}