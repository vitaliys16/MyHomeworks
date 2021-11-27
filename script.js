let title = "Homework Lesson 2";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 235;
let rollback = 15; //любое число от 1 до 100
let fullPrice = 60000;//любое число (сколько хотите заработать)
let adaptive = false; //булевое значение

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase().split(", "));
console.log("Процент отката посреднику за работ: " + fullPrice * (rollback/100));