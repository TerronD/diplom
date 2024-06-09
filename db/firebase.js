import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
    getFirestore,
    getDocs,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getUsers } from "./getUsers.js";
import { loadUserForm } from "./addUser.js";
import {getClients} from "./getClients.js";
import {loadClientForm} from "./addClient.js";

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

const clientsbutton = document.getElementById("out-button6");
clientsbutton.onclick = () => {
    getClients();
}

document.getElementById("out-button4").onclick = loadUserForm;

document.getElementById("out-button5").onclick = loadClientForm;

const getStocks = async () => {
    const StocksRef = await getDocs(collection(db, "Stocks"));
    const stocksContainer = document.getElementById("out-columm");
    stocksContainer.innerHTML = "";
    StocksRef.forEach((doc) => {
        const stockData = doc.data();
        console.log(doc.id, " => ", stockData);

        let button = document.createElement("button");
        button.innerText = `${stockData.name}, скидка: ${stockData.discount}%`;
        button.style.padding = "8px";
        button.onclick = () => {
            addStockToPrice(stockData);
        };
        stocksContainer.appendChild(button);
    });
}
const Stocksbutton = document.getElementById("out-button1");
Stocksbutton.onclick = () => {
    getStocks();
}

let currentStockData = null;
let currentStockButton = null;

const getFeedback = async() => {
    const feedbackRef = await getDocs(collection(db, 'feedback'));
    const feedbackContainer = document.getElementById('out-columm');
    feedbackContainer.innerHTML = "";
    feedbackRef.forEach((doc) => {
        const feedbackData = doc.data();
        console.log(doc.id, " =>", feedbackData);

        let messageDiv = document.createElement("div");
        messageDiv.style.border = "1px solid #ccc";
        messageDiv.style.padding = "10px";
        messageDiv.style.margin = "10px 0";

        let header = document.createElement("h3");
        header.innerText = feedbackData.header;

        let grade = document.createElement("p");
        grade.innerHTML = `<strong>Оценка:</strong> ${feedbackData.grade}`;

        let description = document.createElement("p");
        description.innerText = feedbackData.description;

        messageDiv.appendChild(header);
        messageDiv.appendChild(grade);
        messageDiv.appendChild(description);

        feedbackContainer.appendChild(messageDiv);
    });

    let feedbackButton = document.createElement("button");
    feedbackButton.id = "add-feedback-btn";
    feedbackButton.innerText = "Добавить отзыв";
    feedbackButton.style.margin = "20px auto";
    feedbackButton.style.backgroundColor = '#90EE90';
    feedbackButton.style.display = "block";
    feedbackButton.addEventListener("click", showFeedbackPopup);
    feedbackContainer.appendChild(feedbackButton);
}

const showFeedbackPopup = () => {
    document.getElementById("add-feedback-popup").style.display = "flex";
}

const closeFeedbackPopup = () => {
    document.getElementById("add-feedback-popup").style.display = "none";
}

const addFeedback = async () => {
    const header = document.getElementById("feedback-header").value;
    const grade = document.getElementById("feedback-grade").value;
    const description = document.getElementById("feedback-description").value;
    
    try {
        await addDoc(collection(db, "feedback"), {
            header: header,
            grade: grade,
            description: description
        });
        alert("Отзыв успешно добавлен!");
        closeFeedbackPopup();
        getFeedback();
    } catch (e) {
        console.error("Ошибка при добавлении отзыва: ", e);
    }
}

document.getElementById("close-popup-btn").addEventListener("click", closeFeedbackPopup);
document.getElementById("send-feedback-btn").addEventListener("click", addFeedback);
document.getElementById("out_button7").addEventListener("click", getFeedback);

const addStockToPrice= (productData) => {
    if (currentStockButton) {
        removeStockFromPrice2(currentStockButton, currentStockData);
    }
    currentStockData = productData;
    const stockElement = document.createElement("button");
    stockElement.innerText = `${productData.name}, скидка: ${productData.discount}%`;
    stockElement.style.padding = "8px";
    stockElement.onclick = () => {
        removeStockFromPrice2(stockElement, productData);
    }

    priceInfo.appendChild(stockElement);
    currentStockButton = stockElement;

    const discount = productData.discount / 100;
    totalPrice = totalPrice * (1 - discount);
    totalPriceElement.innerHTML = `Итоговая сумма: ${totalPrice.toFixed(2)}`;
}

const removeStockFromPrice2 = (button, stockData) => {
    priceInfo.removeChild(button);
    currentStockButton = null;

    // пересчитываем итоговую сумму без скидки
    const discount = stockData.discount / 100;
    totalPrice = totalPrice / (1 - discount); // восстанавливаем исходную сумму

    updateTotalPrice();
}

const updateTotalPrice = () => {
    totalPriceElement.innerText = totalPrice.toFixed(2);
}

const getTickets = async () => {
    const TicketsRef = await getDocs(collection(db, "Season tickets"));
    const ticketsContainer = document.getElementById("out-columm");
    ticketsContainer.innerHTML = "";
    TicketsRef.forEach((doc) => {
        const ticketData = doc.data();
        console.log(doc.id, " => ", ticketData);

        let button = createButtonWithText(ticketData, () => addTicketToPrice2(ticketData));
        ticketsContainer.appendChild(button);
    });
}
const Ticketsbutton = document.getElementById("out-button2");
Ticketsbutton.onclick = () => {
    getTickets();
}

const addTicketToPrice2 = (ticketData) => {
    const button = createButtonWithText(ticketData, () => removeTicketFromPrice2(button, ticketData));
    priceContainer.appendChild(button);
    totalPrice += ticketData.price;
    updateTotalPrice();
}

const removeTicketFromPrice2 = (button, ticketData) => {
    priceContainer.removeChild(button);
    totalPrice -= ticketData.price;
    updateTotalPrice();
}



const priceInfo = document.getElementById("price-2-info");
const priceContainer = document.getElementById("out-price2");
const totalPriceElement = document.getElementById("total-price");

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
    button.innerText = `${productData.name} (${productData.price || data.discount}р)`;
    button.style.padding = "8px";
    button.onclick = onClickHandler;
    return button;
}

const addProductToPrice2 = (productData) => {
    const button = createButtonWithText(productData, () => removeProductFromPrice2(button, productData));
    priceContainer.appendChild(button);
    totalPrice += productData.price;
    totalPriceElement.innerHTML = `Итоговая сумма: ${totalPrice}р`;
    updateTotalPrice();
}

const removeProductFromPrice2 = (button, productData) => {
    priceContainer.removeChild(button);
    totalPrice -= productData.price;
    totalPriceElement.innerHTML = `Итоговая сумма: ${totalPrice}р`;
    updateTotalPrice();
}

const Productsbutton = document.getElementById("out-button3");
Productsbutton.onclick = () => {
    getProducts();
};

const printButton = document.getElementById("print-button");

printButton.onclick = () => {
    if (priceContainer.children.length > 0) {
        alert("ПЕЧАТЬ ОДОБРЕНА");
    } else {
        alert("Добавьте товары/услуги.");
    }
}
