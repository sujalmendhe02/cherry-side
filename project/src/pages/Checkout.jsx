//checkout.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, getCartTotal, clearCart } from "../../services/cart";

const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPI_ID = import.meta.env.VITE_UPI_ID;

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    transactionId: "",
  });

  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    const cartItems = getCart();

    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    setCart(cartItems);
    setTotal(getCartTotal());
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadScreenshot = async () => {
    const data = new FormData();

    data.append("file", screenshot);
    data.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handlePayment = () => {
    const upiLink =
      `upi://pay?pa=${UPI_ID}` +
      `&pn=Gift Store` +
      `&am=${total}` +
      `&cu=INR`;

    window.location.href = upiLink;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.customerName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.transactionId ||
      !screenshot
    ) {
      alert("Please fill all fields & upload screenshot");
      return;
    }

    try {
      const screenshotUrl = await uploadScreenshot();
      const orderId = `ORD${Date.now()}`;

      const orderData = {
        type: "order", 
        orderId,
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,

        products: cart
          .map((item) => `${item.name} x ${item.quantity}`)
          .join(", "),

        total,
        transactionId: formData.transactionId,
        paymentScreenshot: screenshotUrl,
        orderDate: new Date().toLocaleString(),
        status: "Pending",
      };

      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(orderData),
      });

      clearCart();

      alert(`Order Placed Successfully!\nOrder ID: ${orderId}`);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Order Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-5">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-3">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Pay ₹{total}
          </button>
        </div>

        {/* CHECKOUT FORM */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-5">
            Delivery Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="customerName"
              placeholder="Full Name"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              rows="4"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
            <input
              type="text"
              name="transactionId"
              placeholder="Transaction ID / UTR Number"
              value={formData.transactionId}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
            {/* SCREENSHOT UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}