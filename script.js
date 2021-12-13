const appData = {
    title: '', 
    screens: [], 
    screenPrice: 0, 
    adaptive: true, 
    rollback: 30, //любое число от 1 до 100
    services: {},
    fullPrice: 0, 
    servicePercentPrice: 0, //30% посреднику
    allServicePrices: 0, 
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num); //проверка на число
    },
    asking: function() {
        do {
            appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        } while(appData.isNumber(appData.title));

        for (let i = 0; i < 2; i++) {
            let name = '';
            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while(appData.isNumber(name));

            let price = 0;
            do {
                price = prompt("Сколько будет стоить данная работа?");
            }
            while(!appData.isNumber(price));

            appData.screens.push({id: i, name: name, price: price})

            }
            
        for (let i = 0; i < 2; i++) {
            let name = '';
            do {
                name = prompt("Какой дополнительный тип услуги нужен?");
            } while(appData.isNumber(name));
            let price = 0;
            
            do {
                price = prompt("Сколько это будет стоить?");
            } while (!appData.isNumber(price));
            appData.services[name] = +price;
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?"); //булевое значение
    },
    addPrices: function() {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price; //считаем все price из объектов массива screens
        }
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];  //в свойство allServicePrices попадет сумма всех значений из объекта appData.services  
        }
    },

    getFullPrice () {
        appData.fullPrice = parseFloat(appData.screenPrice) + parseFloat(appData.allServicePrices);
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
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.ceil(parseFloat(appData.fullPrice) - (parseFloat(appData.fullPrice) * (appData.rollback / 100)));
    },
    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
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
appData.start();