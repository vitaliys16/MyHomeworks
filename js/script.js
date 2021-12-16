'use strict';

const books = document.querySelectorAll('.books');
const book = document.querySelectorAll('.book');

const body = document.querySelector('body');

const titleLink = document.querySelectorAll('.book > h2 > a');
const copyTitleLink = titleLink[4].cloneNode(true);

const secondBook = document.querySelectorAll('.book')[0];
const liSecondBook = secondBook.querySelectorAll('ul > li');

const fiveBook = document.querySelectorAll('.book')[5];
const liFiveBook = fiveBook.querySelectorAll('ul > li');

const bookChapter = book[2].querySelectorAll('ul > li');
const newChapter = bookChapter[8].cloneNode(true); 


books[0].append(book[2]);
book[2].before(book[3]);
book[0].before(book[1]);
book[3].after(book[5]);

//2 задача - Заменить картинку заднего фона на другую из папки image
console.log(body);
body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

//3 задача - Исправить заголовок в книге 3

copyTitleLink.innerHTML = 'Книга 3. this и <b style="font-weight: 900">Прототипы</b> Объектов';
titleLink[4].replaceWith(copyTitleLink);

//4 задача - УДАЛИТЬ рекламу со страницы
document.querySelector('.adv').remove();

//5 задача - Восстановить порядок глав во второй и пятой книге

//Книга 2
liSecondBook[10].before(liSecondBook[2]);
liSecondBook[4].before(liSecondBook[6]);
liSecondBook[4].before(liSecondBook[8]);

//Книга 5
liFiveBook[2].before(liFiveBook[9]);
liFiveBook[2].before(liFiveBook[3]);
liFiveBook[2].before(liFiveBook[4]);
liFiveBook[8].before(liFiveBook[5]);

//6 задача - Добавление новой главы в шестой книге

newChapter.textContent = "Глава 8: За пределами ES6";
book[2].querySelector('ul').append(newChapter);
bookChapter[9].before(newChapter);


//Консоль
console.log(secondBook);
console.log(liSecondBook);

console.log(fiveBook);
console.log(liFiveBook);

console.log(bookChapter);
console.log(newChapter);
