import { arrUsers } from './data.js';

const container = document.getElementById('container');
const userListBtn = document.getElementById('getUsersList');
const list = document.createElement('ul');

let userList = false;
let ageBtn;
let sortAgeU = true;

function createUser (element) {
    const li = document.createElement('li');
    li.textContent = `${element.name} - ${element.age}`;
    list.appendChild(li);
}

userListBtn.addEventListener('click', () => {
    if (!userList) {
        list.innerHTML = '';
        arrUsers.forEach(user => {
            createUser(user);
        });
    }

    if(!ageBtn){
        ageBtn = document.createElement('button');
        ageBtn.textContent = 'Старше 30';

        ageBtn.addEventListener('click', () => {
            list.innerHTML = '';

            const sortUsers = [...arrUsers]
            .filter(user => user.age >=30)
            .sort((a, b) => sortAgeU ? a.age - b.age : b.age - a.age);

            sortUsers.forEach(user => createUser(user));

            sortAgeU = !sortAgeU;

            ageBtn.textContent = sortAgeU ? 'Сортировать по возрастаню ↑' : 'Сортировать по убыванию ↓';

            userList = false;
        });
    } else {
        ageBtn.textContent = 'Старше 30';
        sortAgeU = true;
    }
    
    container.appendChild(ageBtn);
    container.appendChild(list);

    userList = true;
});
