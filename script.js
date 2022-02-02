/*
const getData = () => {
    return fetch('./db/users.json').then(res => res.json());
};

getData().then(users => {
    const userID = users[0].id;

    fetch(`./db/${userID}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
});
*/

//await заставляет весь остальной код дождаться результата выполнения метода к которому он применён  
//await доступен только в ассинхронной функции (async)

const getData = async () => {
    const responseUsers = await fetch('./db/users.json');
    const users = await responseUsers.json();
    const responseUser = await fetch(`./db/${users[0].id}.json`);
    const user = await responseUser.json();

    return user;
};

getData().then(data => {
    console.log(data);
});