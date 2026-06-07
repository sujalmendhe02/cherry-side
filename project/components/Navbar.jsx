import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow bg-white">

      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        GiftStore
      </h1>

      <div className="flex gap-6 items-center">

        <button onClick={() => navigate("/")}>
          Home
        </button>

        <button onClick={() => navigate("/products")}>
          Products
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Cart
        </button>

      </div>
    </nav>
  );
}