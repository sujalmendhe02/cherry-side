import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/cart";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-xl shadow p-3 bg-white">

      <img
        src={product.image}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h2 className="font-semibold mt-2">
        {product.name}
      </h2>

      <p className="text-gray-600">
        ₹{product.price}
      </p>

      <div className="flex gap-2 mt-3">

        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Add
        </button>

        <button
          onClick={() =>
            navigate(`/product/${product.id}`)
          }
          className="border px-3 py-1 rounded"
        >
          View
        </button>

      </div>

    </div>
  );
}