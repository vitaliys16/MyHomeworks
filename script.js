let title;
let screens;
let screenPrice;
let rollback = 30; //любое число от 1 до 100
let adaptive;

let service1;
//let servicePrice1 = prompt("Сколько это будет стоить?");
let service2;
//let servicePrice2 = prompt("Сколько так же это будет стоить?");

let fullPrice;
//let fullPrice = parseFloat(screenPrice) + parseFloat(servicePrice1) + parseFloat(servicePrice2);//любое число (сколько хотите заработать)
let servicePercentPrice; //30% посреднику
let allServicePrices;
let fixTitle;

//FUNCTIONS

const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num); //проверка на число
};

const asking = function() {
    title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные ");

    //screenPrice = prompt("Сколько будет стоить данная работа?");
    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");
    }
    while(!isNumber(screenPrice));

    adaptive = confirm("Нужен ли адаптив на сайте?"); //булевое значение
};

const getAllServicePrices = function() {
    let sum = 0;
    
    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            service2 = prompt("Какой ещё дополнительный тип услуги Вам нужен?");
        }
        /*while(!isNumber(sum)) {
            sum += prompt("Сколько это будет стоить?");
        }*/
        //----требуется пояснение этой конструкции----
        sum += (() => {
            let n;
            do {
                n = prompt('Сколько это будет стоить?');
            } while (!isNumber(n));
            return +n;
        })();
        //----требуется пояснение этой конструкции ВЫШЕ----
    }
    return sum;
    //return parseFloat (srvPrc1) + parseFloat (srvPrc2);
};

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

const getRollBackMessage = function() {
    switch(true) {
    case 30000 <= fullPrice:
        console.log("Даем скидку в 10%");
        break
    case 15000 <= fullPrice && fullPrice < 30000:
        console.log("Даем скидку в 5%");
        break
    case 0 <= fullPrice && fullPrice < 15000: //меньше 15000 и больше 0
        console.log("Скидка не предусмотрена");
        break
    default: 
        console.log('Что то пошло не так'); 
    }
};

function getFullPrice () {
    return parseFloat(screenPrice) + parseFloat(allServicePrices);
};

let getTitle = function(txt) {
    //ttl = ttl.split(' ').join('');
    txt = txt.trim();
    txt = txt.toLowerCase();
    return txt[0].toUpperCase() + txt.substring(1);
    //trim убирает пробелы в начале и конце строки
};

const getServicePercentPrices = function () {
    return Math.ceil(parseFloat(fullPrice) - (parseFloat(fullPrice) * (rollback / 100)));
};

//-------
/*
(screenPrice === '') ? (screenPrice = 0) : screenPrice;
(servicePrice1 === '') ? (servicePrice1 = 0) : servicePrice1;
(servicePrice2 === '') ? (servicePrice2 = 0) : servicePrice2;*/
switch (adaptive) {
    case true:
        console.log('Адаптив должен быть!');
        break
    default: 
        console.log('Адаптива не будет');
};

/*switch(true) {
    case 30000 <= fullPrice:
        console.log("Даем скидку в 10%");
        break
    case 15000 <= fullPrice && fullPrice < 30000:
        console.log("Даем скидку в 5%");
        break
    case 0 <= fullPrice && fullPrice < 15000: //меньше 15000 и больше 0
        console.log("Скидка не предусмотрена");
        break
    default: 
        console.log('Что то пошло не так'); 
}*/

//Переопределение значений переменным
asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
//title = getTitle();

//Console
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("fullPrice ", typeof fullPrice);
console.log("allServicePrices: ", allServicePrices);

console.log('Название проекта: ' + getTitle(title));
console.log(screens.split(', '));
console.log('Стоимость работы: ' + screenPrice);
/*console.log('Дополнительный тип услуги: ' + service1 + ". Данная услуга будет стоить " + parseFloat(servicePrice1));
console.log('Ещё один дополнительный тип услуги: ' + service2 + ". Данная услуга будет стоить " + parseFloat(servicePrice2));*/
console.log('Цена за все доп. услуги: ' + allServicePrices);
console.log("fullPrice: " + fullPrice);
console.log('Итоговая стоимость за вычетом отката посреднику: ' + servicePercentPrice);