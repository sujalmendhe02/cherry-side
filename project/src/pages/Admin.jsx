// Admin.jsx

import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function AdminPanel() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    image: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}?sheet=Products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = async (file) => {
    if (!file) return;

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
      const payload = {
        type: "product",
        action: editingId ? "update" : "add",
        id: editingId || Date.now(),
        ...product,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(
          editingId
            ? "Product Updated Successfully"
            : "Product Added Successfully"
        );

        setProduct({
          name: "",
          category: "",
          price: "",
          description: "",
          stock: "",
          image: "",
        });

        setEditingId(null);
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setProduct({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      stock: item.stock,
      image: item.image,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          type: "product",
          action: "delete",
          id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Product Deleted Successfully");
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);

    setProduct({
      name: "",
      category: "",
      price: "",
      description: "",
      stock: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F1ED] py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* FORM */}

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-[#E8DDD6]">
          <h1 className="text-4xl font-bold text-center text-[#7A0016] mb-8">
            Cherry Side Admin Panel
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A0016]"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A0016]"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A0016]"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A0016]"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={product.stock}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A0016]"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files[0])}
              className="w-full p-3 border rounded-lg"
            />

            {loading && (
              <p className="font-semibold text-[#7A0016]">
                Uploading Image...
              </p>
            )}

            {product.image && (
              <img
                src={product.image}
                alt="preview"
                className="w-full h-72 object-cover rounded-xl border"
              />
            )}

            <div className="flex gap-3">

              <button
                type="submit"
                className="flex-1 bg-[#7A0016] hover:bg-[#5f0011] text-white py-3 rounded-lg font-semibold transition"
              >
                {editingId ? "Update Product" : "Add Product"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>

        {/* PRODUCTS */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold text-[#7A0016] mb-8 text-center">
            Manage Products
          </h2>

          {products.length === 0 ? (
            <p className="text-center text-gray-500">
              No Products Found
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover"
                  />

                  <div className="p-5">

                    <h3 className="font-bold text-xl text-[#7A0016]">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      {item.category}
                    </p>

                    <p className="font-bold text-lg mt-3">
                      ₹{item.price}
                    </p>

                    <p className="mt-2 text-sm">
                      <span className="font-semibold">
                        Stock:
                      </span>{" "}
                      {item.stock}
                    </p>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex gap-2 mt-5">

                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 bg-[#7A0016] text-white py-2 rounded-lg hover:bg-[#5f0011]"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}