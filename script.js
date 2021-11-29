'use strict';
let lang = 'ru';
let weekDay = {
  'keyRU': 'Пн Вт Ср Чт Пт Сб Вс',
  'keyEN': 'Mo Tu We Th Fr Sa Su',
};

//IF
if (lang === 'ru') {
    console.log(weekDay['keyRU']);
} else {
    console.log(weekDay['keyEN']); 
}

//switch
switch (lang === 'ru') {
    case lang !=='ru':
        console.log(weekDay['keyEN']);
        break
    default: 
        console.log(weekDay['keyRU']);
}

//lang !== 'ru' ? console.log(weekDay['key2']) : console.log(weekDay['key1']);

//многомерный массив
let langArray = [];
langArray['ru'] = ['Пн','Вт','СР','Чт','Пт','Сб','Вс'];
langArray['en'] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let anotherLang = 'en';
console.log('Многомерный масс: '+ langArray[anotherLang]);
//---------------------------------------------------------------------------
//Задача с тернальным оператором
let namePerson = 'Александр';
namePerson === 'Артем' ? console.log('Директор') : namePerson === 'Александр' ? console.log('Преподаватель') : console.log('Студент');
