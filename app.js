// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_MSG_SENDER",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Customer Login
document.getElementById("loginBtn").onclick = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      document.getElementById("userName").innerText = result.user.displayName;
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("signupBtn").style.display = "none";
    })
    .catch(console.error);
};

// Load products from Firebase
const productsRef = ref(db, 'products');
const productList = document.getElementById('productList');

onValue(productsRef, (snapshot) => {
  productList.innerHTML = '';
  snapshot.forEach((child) => {
    const p = child.val();
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>৳${p.price}</p>
      <p>স্টক: ${p.quantity}</p>
      <p class="rating">${"★".repeat(p.rating)}${"☆".repeat(5-p.rating)}</p>
    `;
    card.onclick = () => openModal(p);
    productList.appendChild(card);
  });
});

// Modal
function openModal(product){
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalName").innerText = product.name;
  document.getElementById("modalDetails").innerText = product.details;
  document.getElementById("modalPrice").innerText = "৳"+product.price;
  document.getElementById("modalQuantity").innerText = product.quantity;
  document.getElementById("modalRating").innerText = product.rating;
  document.getElementById("modalBought").innerText = product.bought || 0;
  document.getElementById("productModal").style.display = "flex";
}
function closeModal(){
  document.getElementById("productModal").style.display = "none";
}
