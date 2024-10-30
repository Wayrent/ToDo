import { addTodo } from './addTodo.js';
import { RenderToDo } from './renderToDo.js';
import { saveTasksToLocalStorage } from './localStorage.js'; 

export let array = [{
  id: 0,
  text: 'Выпить кофе',
  status: false
 },
 {
  id: 1,
  text: 'Поесть шаурму',
  status: false
 },
 {
  id: 2,
  text: 'Выпить ещё кофе',
  status: false
 }];
 
 // Загружаем задачи из localStorage
 localStorage.setItem('tasks', JSON.stringify(array));
 const storedTasks = localStorage.getItem('tasks');
 if (storedTasks) {
  array = JSON.parse(storedTasks);
 }
 
 document.addEventListener('DOMContentLoaded', function() {
  RenderToDo(array);
 });
 document.getElementById('todo-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});
 
 const addButton = document.querySelector('.add-button');
 addButton.addEventListener('click', addTodo);
 

 
 saveTasksToLocalStorage();
