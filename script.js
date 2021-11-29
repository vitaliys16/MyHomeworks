let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = prompt('Сколько будет стоить данная работа?');
let rollback = 15; //любое число от 1 до 100
let adaptive = confirm("Нужен ли адаптив на сайте?"); //булевое значение
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Сколько это будет стоить?");
let service2 = prompt("Какой ещё дополнительный тип услуги Вам нужен?");
let servicePrice2 = prompt("Сколько так же это будет стоить?");
let fullPrice = parseFloat(screenPrice) + parseFloat(servicePrice1) + parseFloat(servicePrice2);//любое число (сколько хотите заработать)
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * 0.30)); //30% посреднику
/*console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase().split(", "));
console.log("Процент отката посреднику за работ: " + fullPrice * (rollback/100));*/
console.log('Название проекта: ' + title);
console.log(screens.split(', '));
console.log('Стоимость работы: ' + parseFloat(screenPrice));
switch (adaptive) {
    case true:
        console.log('Адаптив должен быть!');
        break
    default: 
        console.log('Адаптива не будет');
};

//если будет пустая строка
servicePrice1 === '' ? servicePrice1 = 0 : servicePrice1;
servicePrice2 === '' ? servicePrice2 = 0 : servicePrice2;
//________________________
console.log('Дополнительный тип услуги: ' + service1 + ". Данная услуга будет стоить " + parseFloat(servicePrice1));
console.log('Ещё один дополнительный тип услуги: ' + service2 + ". Данная услуга будет стоить " + parseFloat(servicePrice2));


console.log("fullPrice: " + fullPrice);
console.log('Итоговая стоимость за вычетом отката посреднику: ' + servicePercentPrice);

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