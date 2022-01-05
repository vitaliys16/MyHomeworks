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
const rlbk = 0;

const appData = {
    title: '', 
    screens: [], 
    screenPrice: 0, 
    adaptive: true, 
    rollback: 0, //любое число от 1 до 100
    servicesPercent: {},
    servicesNumber: {},
    fullPrice: 0, 
    servicePercentPrice: 0, //rollback (%) посреднику
    servicePricesPercent: 0, 
    servicePricesNumber: 0, 
    count: 0,
    init: function() {
        this.addTitle();
        startBtn.addEventListener('click', this.start.bind(this));//при нажатии на кнопку startBtn вызываем метод start
        buttonPlus.addEventListener('click', this.addScreenBlock);
        resetBtn.addEventListener('click', this.reset.bind(this));//при нажатии на кнопку resetBtn вызываем метод reset
    },
    addTitle: function() {
        document.title = title.textContent; //называем сайт через переменную title
        console.log(title.textContent); //получаем название тэга h1
    },
    changeRollback: function(event){ 
        spanRange.textContent = event.target.value + '%'; //подставляем значение в текст тега span
        this.rollback = event.target.value; //заносим значение в rollback
    },
    refreshVariables: function () {
        this.rollback = 0;
		this.screens = [];
		this.screenPrice = 0;
		this.screenNumber = 0;
		this.servicesPercent = {};
		this.servicesNumber = {};
		this.servicePricesPercent = 0;
		this.servicePricesNumber = 0;
	},
    start: function() {
            this.addScreens.bind(this)();
            if (
			!this.screens.find((screen) => {
				return screen.name === "Тип экранов" || screen.price <= 0;
			})
		) {
            this.addServices.bind(this)();
            this.addPrices.bind(this)();
            this.showResult.bind(this)();
            console.log(this.screens);
            this.refreshVariables.bind(this)();
        } else {
            alert("Один из типов экрана или количество заполнено некорректно");
			this.refreshVariables();
        }       
    },
    reset: function() {
        //обнуление инпутов
        total.value = 0;
        totalCount.value = 0;
        totalCountOther.value = 0;
        fullTotalCount.value = 0;
        totalCountRollback.value = 0;
        range.value = 0;
        spanRange.textContent = '0%';

        //снятие чекбоксов
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });
        document.getElementsByClassName('custom-checkbox')[7].checked = false;

        //обнуление значение в массиве appData
        this.refreshVariables.bind(this)();
        //переопределяем скрины
        screens = document.querySelectorAll('.screen');
        //конвертируем NodeList в array для выполнения if 
        let newScreen = Array.prototype.slice.call(screens);
        screens.forEach((screen) => {
                document.querySelector('.screen > .main-controls__input > input').removeAttribute('disabled', 'disabled');
                document.querySelector('.screen > .main-controls__input > input').value = '';
                document.querySelector('.screen > .main-controls__select > select').removeAttribute('disabled', 'disabled');
                screen = document.querySelector('.screen');
                if (newScreen.length == 1) {
                    return;
                } else if (newScreen.length > 1) {
                    newScreen.length = newScreen.length - 1; 
                    screen.remove(); 
                    console.log(newScreen.length);       
                }   
        });
        startBtn.removeAttribute('style', 'display:none');
        resetBtn.setAttribute('style', 'display:none');

    },
    showResult: function() {
        alert('showResult');
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.count;

        //блокируем все инпуты путём перебора
        screens = document.querySelectorAll('.screen'); //чтобы в коллекцию попали новые элементы, мы должны
        screens.forEach((screen) => {
            let input = screen.querySelector('.screen > .main-controls__input > input');
            let select = screen.querySelector('.screen > .main-controls__select > select'); 
            input.setAttribute('disabled', 'disabled');
            select.setAttribute('disabled', 'disabled');
        });
        startBtn.setAttribute('style', 'display:none');
        resetBtn.removeAttribute('style', 'display:none');
    },
    addScreens: function() {
        screens = document.querySelectorAll('.screen'); //чтобы в коллекцию попали новые элементы, мы должны переопределить данную коллекцию перед каждым рассчетом (РАЗОБРАТЬ!)
        //перевод на стрелочную функцию
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select'); //достаем тэг select
            const input = screen.querySelector('input');    //достаем тэг input
            const selectName = select.options[select.selectedIndex].textContent; //достаем название услуги из списка
                this.screens.push({
                    id: index, 
                    name: selectName, 
                    price: +select.value * +input.value, //считаем стоимость экранов, + ставим для перевода в Number
                    number: parseFloat(input.value), //кол-во экранов
                });
        });
    },
    addServices: function() {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) { //поставлена галка или нет (ПОЧИТАТЬ!)
                this.servicesPercent[label.textContent] = +input.value; //нужно получать числа (ставим +)
            }
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) { //поставлена галка или нет (ПОЧИТАТЬ!)
                this.servicesNumber[label.textContent] = +input.value; //нужно получать числа (ставим +)
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
        this.screenPrice = this.screens.reduce((sum, item) => {
            return sum += +item.price;
        }, 0);

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];  //в свойство servicePricesNumber попадет сумма всех значений из объекта appData.servicesNumber
        }
        for (let key in this.servicesPercent) { //формула подсчета процентов
            this.servicePricesPercent += parseFloat(this.screenPrice) * (this.servicesPercent[key] / 100)
        }
        //подсчитываем всю стоимость
        this.fullPrice = parseFloat(this.screenPrice) + parseFloat(this.servicePricesPercent) + parseFloat(this.servicePricesNumber);

        this.servicePercentPrice = Math.ceil(parseFloat(this.fullPrice) - (parseFloat(this.fullPrice) * (this.rollback / 100))); //минус процент посреднику
        
        //Подсчет количества экранов методом перебора appdata.screens
        this.count = this.screens.reduce((p,c) =>{
                return +(p+c.number);
            },'');
    },
    //logger пока нигде не используется
    logger: function() {
        console.log('Вся необходимая информация: ');
        console.log('Всё в сумме: ' + this.fullPrice);
        console.log('С вычетом процента: ' + this.servicePercentPrice);
        console.log(this.screens);
        console.log(this.services);
        for (let key in this) {
            if (typeof this[key] == "function") {
                console.log("Метод: " + key);    
            } else {
                console.log("Свойство: " + key);
            }
            }
    },
};
appData.init();
range.addEventListener('input', appData.changeRollback.bind(appData));


//this.start.bind(this)
//() => this.start()
//console.log(document.querySelector('.screen > .main-controls__input > input'));
//console.log(document.querySelector('.screen > .main-controls__select > select').value);
