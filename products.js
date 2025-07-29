// DOM element where products will be displayed
const productList = document.getElementById("productList");

// Static product data (replace or expand as needed)
const products = [
  {
    id: 1,
    name: "T-shirt",
    description: "100% Cotton, Unisex fit",
    price: 150,
    image: "images/t-shrt.png",
    category: "shirts"
  },
  {
    id: 2,
    name: "Hoodie",
    description: "Warm and cozy",
    price: 300,
    image: "images/hoodie.png",
    category: "hoodies"
  },
  {
    id: 3,
    name: "Cap",
    description: "Stylish accessory",
    price: 100,
    image: "images/cap.png",
    category: "accessories"
  }
];

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

// Render all products on page load
function loadProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    renderProductCard(product);
  });
}

loadProducts();
