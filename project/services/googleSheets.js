//googlesheets.js

const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;
console.log(API_URL);
export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}?sheet=Products`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Save Order
export const saveOrder = async (orderData) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};