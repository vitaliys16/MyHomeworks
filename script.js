let num = 266219;
//console.log(typeof num); //указываю тип переменной

let stringNum = num.toString().split(''); //перевожу в строковый тип для деления на массив
/*console.log(stringNum);
console.log(stringNum[0]*stringNum[1]*stringNum[2]*stringNum[3]*stringNum[4]*stringNum[5]);

let numResult = stringNum[0]*stringNum.length; //stringNum.length;
console.log(numResult);*/

let totalNum = stringNum.reduce( (prevValue, currentElem) => {
    return prevValue * currentElem;
}, 1); //где 1 - начальное значание, которое мы устанавливаем сами

console.log(totalNum);

let degreeNum = totalNum ** 3; //Возводим полученное число totalNum в степень 3, используя только 1 оператор (Math.pow не подходит)
//console.log(degreeNum);
console.log(degreeNum.toString().substring(0,2));