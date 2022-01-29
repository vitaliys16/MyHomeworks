const getData = (url, sendDataUrl) => {
    return fetch(url, {
            method: 'GET',
            body: JSON.stringify(),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); 
                sendData({ //вызов sendData
                    url: sendDataUrl, 
                    data: data,
                });
            })
            .catch(error => {
                console.log("АХАХА, Я ОШИБКА");
            });
};

const sendData = ({ url, data={}, method='POST' }) => {
    return fetch( url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Я вроде бы отправил получается');
        console.log(data);
    })
    .catch(error => {
        console.log("АХАХА, ОШИБКА V.2");
    });
};

getData('db.json', 'https://jsonplaceholder.typicode.com/posts');
