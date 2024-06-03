import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { db } from "./firebase.js";
import { getUsers } from "./getUsers.js";

export async function addUser(user, notif) {
    try {
        const docRef = await addDoc(collection(db, "Users"), user);
        console.log("Document written with ID: ", docRef.id);
        notif.innerHTML = "Данные успешно отправлены.";
        notif.classList.add('success');
        getUsers();
    } catch (e) {
        console.error("Error updating document: ", e);
        notif.innerHTML = "Ошибка при отправке данных.";
        notif.classList.add('error');
    }
}

export const loadUserForm = () => {
    const container = document.getElementById("out-columm");
    container.innerHTML = `
    <div id="notification"></div>
    <div id="user-form-container">
        <form id="user-form">
          <label for="fname">Имя:</label>
          <input type="text" id="fname" name="fname"><br><br>
          
          <label for="lname">Фамилия:</label>
          <input type="text" id="lname" name="lname"><br><br>
          
          <label for="position">Должность:</label>
          <input type="text" id="position" name="position"><br><br>
          
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
            lname: userForm.lname.value,
            position: userForm.position.value,
            phone: userForm.phone.value
        };
        addUser(user, notif);
    }
}