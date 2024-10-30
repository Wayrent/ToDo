let array = [];

// Загружаем задачи из localStorage, если они уже есть (после перезагрузки пригодиться)
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  array = JSON.parse(storedTasks); // Преобразуем JSON-строку из localStorage обратно в массив объектов
}

function addTodo() {
  const input = document.getElementById('todo-input');
  const todoText = input.value.trim();

  if (todoText === '') {
    alert('Сначала введите задачу!');
    return;
  }

  array.push({ // Добавляем новую задачу в массив
    id: array.length, // Идентификатор для задачи
    text: todoText, // Сохраняем текст задачи
    status: false // По умолчанию задача не выполнена
  });

  input.value = '';
  RenderToDo(); // Обновляем отображение списка задач
  saveTasksToLocalStorage(); // Сохраняем обновленный массив задач в localStorage
}

function RenderToDo() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  for (let i = 0; i < array.length; i++) { // Проходим по каждой задаче в массиве ,создавая li
    const li = document.createElement('li');
    const span = document.createElement('span'); 
    span.textContent = array[i].text; // Записываем текст задачи в элемент span

    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');

    const completeIcon = document.createElement('span');
    completeIcon.classList.add('complete-icon');
    completeIcon.textContent = '✓';
    completeIcon.onclick = function(event) {
      event.stopPropagation(); // Предотвращаем распространение события клика на другие задачи
      li.classList.toggle('completed');
      array[i].status = !array[i].status;
      saveTasksToLocalStorage(); // Сохраняем изменения в localStorage
    };

    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.textContent = '✕';
    deleteIcon.onclick = function(event) {
      event.stopPropagation();
      li.remove();
      array.splice(i, 1); // Удаляем задачу из массива
      saveTasksToLocalStorage(); // Сохраняем изменения в localStorage
    };

    taskButtons.appendChild(completeIcon);
    taskButtons.appendChild(deleteIcon);
    li.appendChild(span);
    li.appendChild(taskButtons); // Добавляем контейнер кнопок в элемент списка
    todoList.appendChild(li); // Добавляем элемент списка в список задач на странице
  }
}

document.getElementById('todo-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

function saveTasksToLocalStorage() { // Функция для сохранения задач в localStorage
  localStorage.setItem('tasks', JSON.stringify(array)); // Преобразуем массив задач в JSON-строку и сохраняем в localStorage
}

RenderToDo();
