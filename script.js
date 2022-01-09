'use strict';

class First {
    hello() {
        console.log('Привет я метод родителя!');
    }
}

class Second extends First {    
    hello(myMessage) {
        super.hello();
        console.log(myMessage);
    }
}

const sec = new Second();

sec.hello('А я наследуемый метод!');