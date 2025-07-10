// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyDLmDOVDYHMrx856WTVlC-AYhEhFUQvNec",
  authDomain: "witm-d28ce.firebaseapp.com",
  databaseURL: "https://witm-d28ce-default-rtdb.firebaseio.com",
  projectId: "witm-d28ce",
  storageBucket: "witm-d28ce.appspot.com",
  messagingSenderId: "361026083423",
  appId: "1:361026083423:web:1a207ba6efc173612e59ea",
  measurementId: "G-ZBD1D4NRT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM element where products will be displayed
const productList = document.getElementById("productList");

// Function to render a product card
function renderProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p class="price">R${product.price}</p>
    <button class="customize-btn">Customize</button>

    <div class="customize-options" style="display: none;">
      <label>Size:</label>
      <select class="size-select">
        <option value="">Select size</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      <label>Color:</label>
      <select class="color-select">
        <option value="">Select color</option>
        <option value="Red">Red</option>
        <option value="White">White</option>
        <option value="Black">Black</option>
        <option value="Blue">Blue</option>
        <option value="Pink">Pink</option>
      </select>

      <button class="add-to-cart-btn">Add to Cart</button>
    </div>
  `;

  // Toggle customize options
  card.querySelector(".customize-btn").addEventListener("click", () => {
    const options = card.querySelector(".customize-options");
    options.style.display = options.style.display === "none" ? "block" : "none";
  });

  // Add to cart functionality
  card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
    const size = card.querySelector(".size-select").value;
    const color = card.querySelector(".color-select").value;

    if (!size || !color) {
      alert("Please select a size and color.");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      size,
      color,
      price: product.price
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Item added to cart!");
  });

  productList.appendChild(card);
}

// Fetch products from Firebase
function fetchProducts() {
  const productsRef = ref(db, "products");

  onValue(productsRef, (snapshot) => {
    productList.innerHTML = ""; // Clear existing products
    const data = snapshot.val();

    if (data) {
      Object.keys(data).forEach((key) => {
        const product = data[key];
        renderProductCard(product);
      });
    } else {
      productList.innerHTML = "<p>No products available.</p>";
    }
  });
}

// Load products when page loads
fetchProducts();
