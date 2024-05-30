// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);
const container = document.getElementById("out-columm");
const getUsers = async()=>{
    const usersRef = await getDocs(collection(db, "Users"));
    container.innerHTML = "";
    usersRef.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      container.innerHTML += `
      <table>
      
      ${doc.data().name}</table>
      `
    });
}
const userbutton = document.getElementById("out-button");
userbutton.onclick = ()=>{
    getUsers();
}

const getStocks = async()=>{
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
Stocksbutton.onclick = ()=>{
  getStocks();
}

const getTickets = async()=>{
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
Ticketsbutton.onclick = ()=>{
  getTickets();
}

const getProducts = async()=>{
  const ProductsRef = await getDocs(collection(db, "products"));
  container.innerHTML = "";
  ProductsRef.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    container.innerHTML += `
    <button>${doc.data().name}</button>
    `
  });
}
const Productsbutton = document.getElementById("out-button3");
Productsbutton.onclick = ()=>{
  getProducts();
}