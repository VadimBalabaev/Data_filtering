import { arrUsers } from './data.js';

const container = document.getElementById('container');
const userListBtn = document.getElementById('getUsersList');
const list = document.createElement('ul');

let isUserList = false;
let isSortAgeUsers = true;
let isAllUsers = true;

let ageBtn;
let sortBtn;

let newArrUsers = [...arrUsers];
let filteredUserList = [];

function createUser(element) {
    if (!element) {
        throw new Error('Не передан элемент');
    } else {
        const li = document.createElement('li');
        li.textContent = `${element.name} - ${element.age}`;
        list.appendChild(li);
    }
}

function filter(arr) {
    arr = arr
        .sort((a, b) => isSortAgeUsers ? a.age - b.age : b.age - a.age);
    arr.forEach(user => createUser(user));
}

userListBtn.addEventListener('click', () => {
    if (!isUserList) {
        list.innerHTML = '';
        arrUsers.forEach(user => createUser(user));
        isAllUsers = true;
    }

    if (!ageBtn) {
        ageBtn = document.createElement('button');
        ageBtn.textContent = 'Старше 30';

        ageBtn.addEventListener('click', () => {
            list.innerHTML = '';

            filteredUserList = newArrUsers
                .filter(user => user.age >= 30);


            filteredUserList.forEach(user => createUser(user));

            isUserList = false;
            isAllUsers = false;
        });
    }

    if (!sortBtn) {
        sortBtn = document.createElement('button');
        sortBtn.textContent = 'Сортировать по возрасту';

        sortBtn.addEventListener('click', () => {
            list.innerHTML = '';

            switch (isAllUsers) {
                case true:
                    filter(newArrUsers);
                    break;
                case false:
                    filter(filteredUserList);
                    break;
                default:
                    console.warn('Флаг isAllUsers имеет неизвестное значение');
                    break;
            }

            isSortAgeUsers = !isSortAgeUsers;

            sortBtn.textContent = isSortAgeUsers ? 'Сортировать по возрастаню ↑' : 'Сортировать по убыванию ↓';

            isUserList = false;
        });
    }

    container.appendChild(ageBtn);
    container.appendChild(sortBtn);
    container.appendChild(list);

    isUserList = true;
});
