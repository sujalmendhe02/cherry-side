const API_URL =
  "https://script.google.com/macros/s/AKfycby26m45Fi1BNqljjisVdz894yLeV1v1fKrV1Q5DUveHtqg5J0spPQM-GVNsCT-TawQQ/exec";

// Get Products
export const fetchProducts = async () => {
  try {
    const res = await fetch(
      `${API_URL}?sheet=Products`
    );

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Save Order
export const saveOrder = async (
  orderData
) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(orderData),
    });

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};