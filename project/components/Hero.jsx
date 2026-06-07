import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="bg-pink-50 py-20 text-center px-6">

      <h1 className="text-4xl md:text-6xl font-bold">
        Surprise Your Loved Ones 🎁
      </h1>

      <p className="mt-4 text-gray-600">
        Premium Gifts, Flowers & Hampers Delivered with Love
      </p>

      <button
        onClick={() => navigate("/products")}
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
      >
        Shop Now
      </button>

    </div>
  );
}