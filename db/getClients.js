import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { db } from "./firebase.js";

const container = document.getElementById("out-columm");

export const getClients = async () => {
    const clientsRef = await getDocs(collection(db, "Clients"));
    container.innerHTML = "";
    clientsRef.forEach((doc) => {
        const data = doc.data();
        const clientName = data.name;
        const clientSurname = data.surname;
        const clientPhone = data.phone;
        const clientEmail = data.email;

        container.innerHTML += `
        <table class="custom-table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Почта</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${clientName}</td>
                <td>${clientSurname}</td>
                <td>${clientPhone}</td>
                <td>${clientEmail}</td>
              </tr>
            </tbody>
        </table>
      <br/>
        `;
    });
}