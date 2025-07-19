import { arrUsers } from './data.js';

//////////////////// ЗАДАНИЕ 1 //////////////////////////
const users = [
    { id: 1, name: 'Alice', is_active: true },
    { id: 2, name: 'Bob', is_active: false }
];

const updatedUsers = users.map(user => {
    return {
        label: user.name,
        value: user.id,
        status: user.is_active ? "active" : "inactive",
    };
});
console.log(updatedUsers);

const items = [
    { id: 1, name: 'Apple', category: 'fruit' },
    { id: 2, name: 'Carrot', category: 'vegetable' },
    { id: 3, name: 'Banana', category: 'fruit' }
];

function updatedItems(arr) {
    const result = {};

    arr.forEach(item => {
        const key = item.category;

        if (!result[key]) {
            result[key] = [];
        }

        result[key].push({
            id: item.id,
            name: item.name
        });
    });

    return result;
}

console.log(updatedItems(items));
///////////////////////////////////////////////////////////////



//////////////////// ЗАДАНИЕ 2 //////////////////////////
let queryString = '?page=2&sort=desc';
function parseQuery(queryString){
    if (!queryString){
        console.log('');
        return;
    };
    const keys = [];
    const values = [];

    const createSortArr = queryString.match(/\b\w+=(\d+|\w+)/g);
    createSortArr.forEach(item => {
        keys.push(item.split("=")[0]);
        values.push(item.split("=")[1]);
    });
    const result = keys.reduce((obj, key, index) => {
        obj[key] = values[index];
        return obj;
    }, {});
    console.log(result);
}
parseQuery(queryString);

let user = { name: 'Alex', password: '123' };
let required = ['name', 'email', 'password'];

function refundOfArrayRequiredProperties(obj, required) { 
    if(!obj || !required){
        console.log('');
        return;
    }
    const result = [];
    required.forEach(key => {
        if(!Object.keys(obj).includes(key)){
            result.push(key);
        }
    });
    console.log(result);
}
refundOfArrayRequiredProperties(user, required);

////////////////////////////////////////////////////////////

////////////////////////// ЗАДАЧА 3 ////////////////////////
const listQuest3 = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 1, name: 'C' }
];
const newListQuest3 = listQuest3.filter((obj, index, arr) => {
    return arr.findIndex(o => o.id === obj.id) === index;
});
console.log(newListQuest3);

const mockUsers = {
    1: 'Alice',
    2: 'Bob'
};
function fetchUserName(userId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const name = mockUsers[userId];

            if(name){
                resolve(name);
            } else {
                reject("Пользователь не найден");
            }
        }, 1000);
    });
}
fetchUserName(1)
    .then(name => console.log("Имя:", name))
    .catch(err => console.log("Ошибка:", err));
////////////////////////////////////////////////////////////
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
