// Get cart items
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// Add product to cart
export const addToCart = (product) => {
  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Remove item completely
export const removeFromCart = (id) => {
  const cart = getCart().filter(
    (item) => item.id !== id
  );

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Increase quantity
export const increaseQuantity = (id) => {
  const cart = getCart();

  const item = cart.find(
    (item) => item.id === id
  );

  if (item) {
    item.quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Decrease quantity
export const decreaseQuantity = (id) => {
  let cart = getCart();

  const item = cart.find(
    (item) => item.id === id
  );

  if (item) {
    item.quantity -= 1;
  }

  cart = cart.filter(
    (item) => item.quantity > 0
  );

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Total price
export const getCartTotal = () => {
  const cart = getCart();

  return cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
};

// Clear cart
export const clearCart = () => {
  localStorage.removeItem("cart");
};