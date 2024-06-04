import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { db } from "./firebase.js";
import { getClients } from "./getClients.js";

export async function addClient(client, notif) {
    try {
        const docRef = await addDoc(collection(db, "Clients"), client);
        console.log("Document written with ID: ", docRef.id);
        notif.innerHTML = "Данные успешно отправлены.";
        notif.classList.add('success');
        getClients();
    } catch (e) {
        console.error("Error updating document: ", e);
        notif.innerHTML = "Ошибка при отправке данных.";
        notif.classList.add('error');
    }
}

export const loadClientForm = () => {
    const container = document.getElementById("out-columm");
    container.innerHTML = `
    <div id="notification"></div>
    <div id="user-form-container">
        <form id="user-form">
          <label for="fname">Имя:</label>
          <input type="text" id="fname" name="fname"><br><br>
          
          <label for="lname">Фамилия:</label>
          <input type="text" id="lname" name="lname"><br><br>
          
          <label for="email">Почта:</label>
          <input type="text" id="email" name="email"><br><br>
          
          <label for="phone">Номер телефона:</label>
          <input type="text" id="phone" name="phone"><br><br>
          
          <button type="submit" style="width: 150px">Добавить пользователя</button>
        </form>
    </div>
    
    `;

    const userForm = document.getElementById("user-form");
    const notif = document.getElementById("notification");

    userForm.onsubmit = (e) => {
        e.preventDefault();
        const user = {
            name: userForm.fname.value,
            surname: userForm.lname.value,
            email: userForm.email.value,
            phone: userForm.phone.value
        };
        addClient(user, notif);
    }
}