import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  getCartTotal,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../services/cart";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const loadCart = () => {
    const cartItems = getCart();
    setCart(cartItems);
    setTotal(getCartTotal());
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleIncrease = (id) => {
    increaseQuantity(id);
    loadCart();
  };

  const handleDecrease = (id) => {
    decreaseQuantity(id);
    loadCart();
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    loadCart();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-8">
          Shopping Cart
        </h1>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold mb-3">
              Your Cart is Empty 🛒
            </h2>

            <p className="text-gray-500 mb-6">
              Add some products to continue shopping.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center gap-5"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 rounded-lg object-cover"
                  />

                  {/* Product Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-lg font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleDecrease(item.id)
                      }
                      className="w-9 h-9 border rounded-lg text-lg"
                    >
                      -
                    </button>

                    <span className="font-semibold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleIncrease(item.id)
                      }
                      className="w-9 h-9 border rounded-lg text-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="font-bold text-lg">
                    ₹
                    {item.price *
                      item.quantity}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      handleRemove(item.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  Total Amount
                </h2>

                <span className="text-2xl font-bold">
                  ₹{total}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate("/checkout")
                }
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}