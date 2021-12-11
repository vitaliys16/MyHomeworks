const appData = {
    title: '', 
    screens: '', 
    screenPrice: 0, 
    adaptive: true, 
    rollback: 30, //любое число от 1 до 100
    service1: '', 
    service2: '', 
    fullPrice: 0, 
    servicePercentPrice: 0, //30% посреднику
    allServicePrices: 0, 
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num); //проверка на число
    },
    asking: function() {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные ");
        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");
        }
        while(!appData.isNumber(appData.screenPrice));

        appData.adaptive = confirm("Нужен ли адаптив на сайте?"); //булевое значение
    },
    getAllServicePrices: function() {
        let sum = 0;
        
        for (let i = 0; i < 2; i++) {

            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
            } else if (i === 1) {
                appData.service2 = prompt("Какой ещё дополнительный тип услуги Вам нужен?");
            }
            sum += (() => {
                let n;
                do {
                    n = prompt('Сколько это будет стоить?');
                } while (!appData.isNumber(n));
                return +n;
            })();
        }
        return sum;
    },
    getFullPrice () {
        return parseFloat(appData.screenPrice) + parseFloat(appData.allServicePrices);
    },

    getRollBackMessage: function() {
        switch(true) {
        case 30000 <= appData.fullPrice:
            console.log("Даем скидку в 10%");
            break
        case 15000 <= appData.fullPrice && appData.fullPrice < 30000:
            console.log("Даем скидку в 5%");
            break
        case 0 <= appData.fullPrice && appData.fullPrice < 15000: //меньше 15000 и больше 0
            console.log("Скидка не предусмотрена");
            break
        default: 
            console.log('Что то пошло не так'); 
        }
    },
    getTitle: function() {
        return appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },
    getServicePercentPrices: function () {
        return Math.ceil(parseFloat(appData.fullPrice) - (parseFloat(appData.fullPrice) * (appData.rollback / 100)));
    },
    start: function() {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
        appData.getRollBackMessage();
        switch (appData.adaptive) {
            case true:
                console.log('Адаптив должен быть!');
                break
            default: 
                console.log('Адаптива не будет');
        }
        appData.logger();
    },
    logger: function() {
        console.log('Вся необходимая информация: ');
        console.log('Всё в сумме: ' + appData.fullPrice);
        console.log('С вычетом процента: ' + appData.servicePercentPrice);
        for (let key in appData) {
            if (typeof appData[key] == "function") {
                console.log("Метод: " + key);    
            } else {
                console.log("Свойство: " + key);
            }
            }
    },
};
appData.start();