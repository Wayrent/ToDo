import { saveTasksToLocalStorage } from './localStorage.js';

export function RenderToDo(array) {
  console.log(array);
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  for (let i = 0; i < array.length; i++) {
    const li = document.createElement('li');
    const span = document.createElement('span'); 
    span.textContent = array[i].text; 

    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');

    const completeIcon = document.createElement('span');
    completeIcon.classList.add('complete-icon');
    completeIcon.textContent = '✓';
    completeIcon.onclick = function(event) {
      event.stopPropagation();
      li.classList.toggle('completed');
      array[i].status = !array[i].status;
      saveTasksToLocalStorage();
    };

    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.textContent = '✕';
    deleteIcon.onclick = function(event) {
      event.stopPropagation();
      li.remove();
      array.splice(i, 1);
      saveTasksToLocalStorage();
    };

    taskButtons.appendChild(completeIcon);
    taskButtons.appendChild(deleteIcon);
    li.appendChild(span);
    li.appendChild(taskButtons);
    todoList.appendChild(li);
  }
}