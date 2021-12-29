const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const render = function() {
    //удаление localStorage если toDoData пуста
    if (toDoData.length == 0) {
            localStorage.removeItem('toDoData');
        }

    todoList.innerHTML = ''; //каждый раз при добавлении очищаем элементы дабы избежать дублей
    todoCompleted.innerHTML = ''; //каждый раз при добавлении очищаем элементы дабы избежать дублей
    toDoData.forEach(function(item) {
        //console.log(item);
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
        '<div class="todo-buttons">' + 
		'<button class="todo-remove"></button>' +
		'<button class="todo-complete"></button>' +
		'</div>';

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        //делаем кнопку
        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed; //меняем у item'a свойство completed

            localStorage.setItem('toDoData', JSON.stringify(toDoData));

            render(); //и снова запускаем функцию для обновления данных на странице
        });
        //удаление элементов
        li.querySelector('.todo-remove').addEventListener('click', function () {
            console.log(toDoData);
            item.delete = "yes";
            const idx = toDoData.findIndex(item => item.delete === "yes");
            if (idx > -1) {
                // удаляем элемент по индексу idx из массива
                toDoData.splice(idx, 1);
            }
            console.log(toDoData);

            localStorage.setItem('toDoData', JSON.stringify(toDoData));

            render();
        });
        console.log(li);
    }) //при каждой итерации мфы будем получать каждый очередной объект

    //console.log(toDoData);
};

//submit отправляет данные формы (отправляет все значения input)
todoControl.addEventListener('submit', function(event) {
    headerInput.value = headerInput.value.trim(); //удаляются лишние пробелы
    event.preventDefault(); //для остановки перезагрузки страницы
    //ниже - условие на недобавление пустых дел
    if (headerInput.value == '' || headerInput.value == null || headerInput.value == ' ') {          
            alert('Напиши план');
            console.log(toDoData);
            return
        }

    const newToDo = {
        text: headerInput.value,
        completed: false,
        delete: "no"
    };
    toDoData.push(newToDo);
    headerInput.value = '';
    
    localStorage.setItem('toDoData', JSON.stringify(toDoData));

    render();
});
//ПРОВЕРКА ХРАНИЛИЩА
    if (localStorage.getItem('toDoData') == null){
        alert ('В локальном хранилище пусто');
    } else if (localStorage.getItem('toDoData') == '[]') {
        alert ('В локальном хранилище есть пустой массив');
        localStorage.removeItem('toDoData');
        render();
    } else {
        alert ('В локальном хранилище что-то есть ...');
            toDoData = JSON.parse(localStorage.getItem('toDoData'));
            render();
    }
