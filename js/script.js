'use strict';

const title = document.getElementsByTagName('h1');
const btn = document.getElementsByClassName('handler_btn');
const plusBtn = document.querySelector('.screen-btn');
const items1 = document.querySelectorAll('.percent');
const items2 = document.querySelectorAll('.number');
const rollback = document.querySelector('.main-controls__range > [type=range]');
const span = document.querySelector('.rollback > div >.range-value');
const totalInput = document.getElementsByClassName('total-input');
let screenClass = document.querySelectorAll('.screen');

console.log(title[0]); //заголовок "Калькулятор верстки"
console.log(btn[0]); //получение кнопки "Рассчитать"
console.log(btn[1]); //получение кнопки "Сброс"
console.log(plusBtn); //получение кнопки "+"
console.log(items1); //получение other-items c классом percent
console.log(items2); //получение other-items c классом number
console.log(rollback); //получение input type=range
console.log(span); //получение range-value

for (let key of totalInput) {
    console.log(key); //получаем total-input элементами 
}
console.log(screenClass); //получение range-value
