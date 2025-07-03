let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart Function (with image support)
function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1, image });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

// Update Cart Count in Navbar
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").textContent = count;
}

// Open Cart Modal and Render Items
function openCart() {
  const modal = document.getElementById("cart-modal");
  const itemsList = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  itemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
        <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover; border-radius:5px;">
        <div style="flex:1">
          <strong>${item.name}</strong><br>
          ₹${item.price} × 
          <input type="number" min="1" value="${item.qty}" onchange="changeQty(${index}, this.value)" style="width:40px;">
          <button onclick="removeItem(${index})" style="margin-left:10px;">❌</button>
        </div>
      </div>
    `;
    itemsList.appendChild(li);
  });

  totalDisplay.textContent = total;
  modal.classList.remove("hidden");
  modal.classList.add("active");
}

// Close Cart Modal
function closeCart() {
  const modal = document.getElementById("cart-modal");
  modal.classList.add("hidden");
  modal.classList.remove("active");
}

// Change Quantity in Cart
function changeQty(index, qty) {
  cart[index].qty = Math.max(1, parseInt(qty));
  localStorage.setItem("cart", JSON.stringify(cart));
  openCart();
  updateCartCount();
}

// Remove Item from Cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  openCart();
  updateCartCount();
}

// Update cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
