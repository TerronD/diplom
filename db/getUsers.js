import {getDocs, collection, doc} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { db } from "./firebase.js";

const container = document.getElementById("out-columm");

export const getUsers = async () => {
    const usersRef = await getDocs(collection(db, "Users"));
    container.innerHTML = "";
    usersRef.forEach((doc) => {
        const data = doc.data();
        const userName = data.name;
        const userLname = data.lname;
        const userPhone = data.phone;
        const userPosition = data.position;

        container.innerHTML += `
        <table class="custom-table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Должность</th>
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