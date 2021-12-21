'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

const range = document.querySelector('input[type=range]');
const spanRange = document.querySelector('.range-value');

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '', 
    screens: [], 
    screenPrice: 0, 
    adaptive: true, 
    rollback: 30, //любое число от 1 до 100
    servicesPercent: {},
    servicesNumber: {},
    fullPrice: 0, 
    servicePercentPrice: 0, //rollback (%) посреднику
    servicePricesPercent: 0, 
    servicePricesNumber: 0, 
    count: 0,
    init: function() {
        appData.addTitle();
        startBtn.addEventListener('click', function() {
            if (document.querySelector('.screen > .main-controls__input > input').value !== '' && document.querySelector('.screen > .main-controls__select > select').value !== '') {
                appData.start();
            } else {
                alert('Ничего не указано');
                console.log(appData.screens);
            }
        }); //при нажатии на кнопку startBtn вызываем метод start
        buttonPlus.addEventListener('click', appData.addScreenBlock);
    },
    addTitle: function() {
        document.title = title.textContent; //называем сайт через переменную title
        console.log(title.textContent); //получаем название тэга h1
    },
    changeRollback: function(event){ 
        spanRange.textContent = event.target.value + '%'; //подставляем значение в текст тега span
        appData.rollback = event.target.value; //заносим значение в rollback
    },
    start: function() {
            appData.addScreens();
            appData.addServices();
            appData.addPrices();
    /* 
            appData.getServicePercentPrices();
            switch (appData.adaptive) {
                case true:
                    console.log('Адаптив должен быть!');
                    break
                default: 
                    console.log('Адаптива не будет');
            }
            appData.logger();
    */
            appData.showResult();
            console.log(appData.screens);
    },
    showResult: function() {
        alert('showResult');
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
        totalCount.value = appData.count;
        //console.log(appData.screens[{number}]);
    },
    addScreens: function() {
        screens = document.querySelectorAll('.screen'); //чтобы в коллекцию попали новые элементы, мы должны переопределить данную коллекцию перед каждым рассчетом (РАЗОБРАТЬ!)
        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select'); //достаем тэг select
            const input = screen.querySelector('input');    //достаем тэг input
            const selectName = select.options[select.selectedIndex].textContent; //достаем название услуги из списка
                appData.screens.push({
                    id: index, 
                    name: selectName, 
                    price: +select.value * +input.value, //считаем стоимость экранов, + ставим для перевода в Number
                    number: parseFloat(input.value) //кол-во экранов
                });
        });
    },
    addServices: function() {
        otherItemsPercent.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) { //поставлена галка или нет (ПОЧИТАТЬ!)
                appData.servicesPercent[label.textContent] = +input.value; //нужно получать числа (ставим +)
            }
        });
        otherItemsNumber.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) { //поставлена галка или нет (ПОЧИТАТЬ!)
                appData.servicesNumber[label.textContent] = +input.value; //нужно получать числа (ставим +)
            }
        });
    },
    addScreenBlock: function() {
        screens = document.querySelectorAll('.screen');
        const cloneScreen = screens[0].cloneNode(true); //true для того, чтобы скопировать всю вложенность данного элемента
        console.log(cloneScreen);
        screens[screens.length - 1].after(cloneScreen); // -1 (минус один - обращение к самому последнему элементу массива)
    },
    addPrices: function() {
        appData.screenPrice = appData.screens.reduce(function(sum, item){
            return sum += +item.price;
        }, 0);

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];  //в свойство servicePricesNumber попадет сумма всех значений из объекта appData.servicesNumber
        }
        for (let key in appData.servicesPercent) { //формула подсчета процентов
            appData.servicePricesPercent += parseFloat(appData.screenPrice) * (appData.servicesPercent[key] / 100)
        }
        //подсчитываем всю стоимость
        appData.fullPrice = parseFloat(appData.screenPrice) + parseFloat(appData.servicePricesPercent) + parseFloat(appData.servicePricesNumber);

        appData.servicePercentPrice = Math.ceil(parseFloat(appData.fullPrice) - (parseFloat(appData.fullPrice) * (appData.rollback / 100))); //минус процент посреднику
        
        //Подсчет количества экранов методом перебора appdata.screens
        appData.count = appData.screens.reduce(function(p,c) {
                return +(p+c.number);
            },'');
    },
    logger: function() {
        console.log('Вся необходимая информация: ');
        console.log('Всё в сумме: ' + appData.fullPrice);
        console.log('С вычетом процента: ' + appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services);
        for (let key in appData) {
            if (typeof appData[key] == "function") {
                console.log("Метод: " + key);    
            } else {
                console.log("Свойство: " + key);
            }
            }
    },
};
appData.init();
range.addEventListener('input', appData.changeRollback);
//console.log(document.querySelector('.screen > .main-controls__input > input'));
//console.log(document.querySelector('.screen > .main-controls__select > select').value);
