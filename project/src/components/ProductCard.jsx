import { useNavigate } from "react-router-dom";
import { addToCart } from "../../services/cart";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[320px] mx-auto">

      <div
        className="overflow-hidden bg-white cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[280px] object-cover transition duration-300 hover:scale-[1.03]"
        />
      </div>

      <div className="pt-4">

        <h3
          className="text-[14px] text-[#4b2e2e] leading-6 min-h-[48px] cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>

        <p className="mt-2 text-[18px] font-medium text-[#7A0016]">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-full mt-5 h-[46px] border border-[#7A0016] rounded-full bg-white text-[#7A0016] hover:bg-[#7A0016] hover:text-white transition"
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}