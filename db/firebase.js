import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

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
console.log(db);
const container = document.getElementById("out-columm");

const getUsers = async()=>{
    const usersRef = await getDocs(collection(db, "Users"));
    container.innerHTML = "";
  usersRef.forEach((doc) => {
    const data = doc.data();
    const userName = data.name;
    const userLname = data.lname;
    const userPhone = data.phone;
    const userPosition = data.position;

    // добавляем новую строку таблицы с данными пользователя
    container.innerHTML += `
      <table class="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${userName}</td>
            <td>${userLname}</td>
            <td>${userPhone}</td>
            <td>${userPosition}</td>
          </tr>
        </tbody>
      </table>
      <br/>
    `;
  });
}

const userbutton = document.getElementById("out-button");
userbutton.onclick = ()=>{
    getUsers();
}

async function addUser(user, notif) {
  try {
    const docRef = await addDoc(collection(db, "Users"), user);
    console.log("Document written with ID: ", docRef.id);
    notif.innerHTML = "Данные успешно отправились";
    notif.classList.add('success');
  } catch (e) {
    console.error("Error adding document: ", e);
    notif.innerHTML = "Ошибка при отправке данных";
    notif.classList.add('error');
  }
}

const loadUserForm = () => {
  container.innerHTML = `
    <form id="user-form">
      <label for="fname">Имя:</label>
      <input type="text" id="fname" name="fname"><br><br>
      
      <label for="lname">Фамилия:</label>
      <input type="text" id="lname" name="lname"><br><br>
      
      <label for="position">Должность:</label>
      <input type="text" id="position" name="position"><br><br>
      
      <label for="phone">Номер телефона:</label>
      <input type="text" id="phone" name="phone"><br><br>
      
      <button type="submit">Добавить пользователя</button>
    </form>
    <div id="notification"></div>
  `;

  const userForm = document.getElementById("user-form");
  const notif = document.getElementById("notification");

  userForm.onsubmit = (e) => {
    e.preventDefault();
    const user = {
      name: userForm.fname.value,
      lname: userForm.lname.value,
      position: userForm.position.value,
      phone: userForm.phone.value,
    };
    addUser(user, notif);
  };
};

document.getElementById("out-button4").onclick = loadUserForm;

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