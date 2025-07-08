const products = [
  {
    id: 1,
    name: "Hoodie",
    description: "100% Cotton, Unisex fit",
    image: "images/sample-hoodie.png",
    price: 150
  },
  {
    id: 2,
    name: "T-Shirt",
    description: "100% Cotton, Female or Unisex cut",
    image: "images/sample-shirt.png",
    price: 120
  },
  // Add more items...
];

const productList = document.getElementById("productList");

products.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p class="price">R${product.price}</p>
    <button class="customize-btn" onclick="toggleCustomize(this)">Customize</button>

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

      <button class="add-to-cart-btn" onclick="addToCart(${product.id}, this)">Add to Cart</button>
    </div>
  `;
  productList.appendChild(card);
});

function toggleCustomize(btn) {
  const options = btn.nextElementSibling;
  options.style.display = options.style.display === "none" ? "block" : "none";
}

function addToCart(productId, button) {
  const card = button.closest(".product-card");
  const size = card.querySelector(".size-select").value;
  const color = card.querySelector(".color-select").value;
  const product = products.find(p => p.id === productId);

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
}
