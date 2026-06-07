import React, { useState } from "react";

const API_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";

const CLOUD_NAME = "YOUR_CLOUD_NAME";
const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

export default function AdminPanel() {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = async (file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setProduct((prev) => ({
        ...prev,
        image: data.secure_url,
      }));
    } catch (err) {
      console.log(err);
      alert("Image Upload Failed");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.image) {
      return alert("Upload image first");
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          type: "product",
          action: "add",
          id: Date.now(),
          ...product,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Product Added Successfully");

        setProduct({
          name: "",
          category: "",
          price: "",
          description: "",
          stock: "",
          image: "",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin Panel
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            rows={4}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              uploadImage(e.target.files[0])
            }
            className="w-full border p-3 rounded"
          />

          {loading && (
            <p className="text-blue-600">
              Uploading Image...
            </p>
          )}

          {product.image && (
            <img
              src={product.image}
              alt="preview"
              className="w-full h-60 object-cover rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}