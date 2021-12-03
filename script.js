let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = prompt('Сколько будет стоить данная работа?');
let rollback = 30; //любое число от 1 до 100
let adaptive = confirm("Нужен ли адаптив на сайте?"); //булевое значение
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Сколько это будет стоить?");
let service2 = prompt("Какой ещё дополнительный тип услуги Вам нужен?");
let servicePrice2 = prompt("Сколько так же это будет стоить?");
let fullPrice = parseFloat(screenPrice) + parseFloat(servicePrice1) + parseFloat(servicePrice2);//любое число (сколько хотите заработать)
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback / 100))); //30% посреднику
let allServicePrices = 0;
let fixTitle;

//FUNCTIONS
const getAllServicePrices = function(srvPrc1, srvPrc2) {
    return parseFloat (srvPrc1) + parseFloat (srvPrc2);
};
allServicePrices = getAllServicePrices (servicePrice1, servicePrice2)

function getFullPrice (mainPrice, otherPrice) {
    return parseFloat(mainPrice) + parseFloat(otherPrice);
}
fullPrice = getFullPrice (screenPrice, allServicePrices);

let getTitle = function(txt) {
    //ttl = ttl.split(' ').join('');
    txt = txt.trim();
    txt = txt.toLowerCase();
    return txt[0].toUpperCase() + txt.substring(1);
    //trim убирает пробелы в начале и конце строки
};

const getServicePercentPrices = function (allPrice, percent) {
    return Math.ceil(parseFloat(allPrice) - (parseFloat(allPrice) * (percent / 100)));
};
servicePercentPrice = getServicePercentPrices (fullPrice, rollback);

//-------
(screenPrice === '') ? (screenPrice = 0) : screenPrice;
(servicePrice1 === '') ? (servicePrice1 = 0) : servicePrice1;
(servicePrice2 === '') ? (servicePrice2 = 0) : servicePrice2;
switch (adaptive) {
    case true:
        console.log('Адаптив должен быть!');
        break
    default: 
        console.log('Адаптива не будет');
};

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

//Console
console.log('Название проекта: ' + getTitle(title));
console.log(screens.split(', '));
console.log('Стоимость работы: ' + screenPrice);
console.log('Дополнительный тип услуги: ' + service1 + ". Данная услуга будет стоить " + parseFloat(servicePrice1));
console.log('Ещё один дополнительный тип услуги: ' + service2 + ". Данная услуга будет стоить " + parseFloat(servicePrice2));
console.log('Цена за все доп. услуги: ' + allServicePrices);
console.log("fullPrice: " + fullPrice);
console.log('Итоговая стоимость за вычетом отката посреднику: ' + servicePercentPrice);