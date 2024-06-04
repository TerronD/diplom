import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
    getFirestore,
    getDocs,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getUsers } from "./getUsers.js";
import { loadUserForm } from "./addUser.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7b4bYV2grScxP0wcdZ_Q7yNQCCVFOJmU",
    authDomain: "diplom-949a2.firebaseapp.com",
    databaseURL: "https://diplom-949a2-default-rtdb.firebaseio.com",
    projectId: "diplom-949a2",
    storageBucket: "diplom-949a2.appspot.com",
    messagingSenderId: "274258681940",
    appId: "1:274258681940:web:10e9da0d3820319b214dc1",
    measurementId: "G-VX942RYMX1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

console.log(db);

const container = document.getElementById("out-columm");

const userbutton = document.getElementById("out-button");
userbutton.onclick = () => {
    getUsers();
}

document.getElementById("out-button4").onclick = loadUserForm;

const getStocks = async () => {
    const StocksRef = await getDocs(collection(db, "Stocks"));
    container.innerHTML = "";
    StocksRef.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        container.innerHTML += `
    <button>${doc.data().name}</button>
    `
    });
}
const Stocksbutton = document.getElementById("out-button1");
Stocksbutton.onclick = () => {
    getStocks();
}

const getTickets = async () => {
    const TicketsRef = await getDocs(collection(db, "Season tickets"));
    container.innerHTML = "";
    TicketsRef.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        container.innerHTML += `
    <button>${doc.data().name}</button>
    `
    });
}
const Ticketsbutton = document.getElementById("out-button2");
Ticketsbutton.onclick = () => {
    getTickets();
}

const priceContainer = document.getElementById("out-price2");
const totalPriceElement = document.querySelector(".price-2-info p");

let totalPrice = 0;

const getProducts = async () => {
    const ProductsRef = await getDocs(collection(db, "products"));
    const productContainer = document.getElementById("out-columm");
    productContainer.innerHTML = "";
    ProductsRef.forEach((doc) => {
        const productData = doc.data();
        console.log(doc.id, " => ", doc.data());

        let button = createButtonWithText(productData, () => addProductToPrice2(productData));
        productContainer.appendChild(button);
    });
}

const createButtonWithText = (productData, onClickHandler) => {
    const button = document.createElement("button");
    button.innerText = `${productData.name} (${productData.price}р)`;
    button.style.padding = "8px";
    button.onclick = onClickHandler;
    return button;
}

const addProductToPrice2 = (productData) => {
    const button = createButtonWithText(productData, () => removeProductFromPrice2(button, productData));
    priceContainer.appendChild(button);
    totalPrice += productData.price;
    totalPriceElement.innerHTML = `Итоговая сумма: ${totalPrice}р`;
}

const removeProductFromPrice2 = (button, productData) => {
    priceContainer.removeChild(button);
    totalPrice -= productData.price;
    totalPriceElement.innerHTML = `Итоговая сумма: ${totalPrice}р`;
}

const Productsbutton = document.getElementById("out-button3");
Productsbutton.onclick = () => {
    getProducts();
};

