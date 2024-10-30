import { array } from './script.js';
import { RenderToDo } from './renderToDo.js';
import { saveTasksToLocalStorage } from './localStorage.js';

export function addTodo() {
 const input = document.getElementById('todo-input');
 const todoText = input.value.trim();

 if (todoText === '') {
  alert('Сначала введите задачу!');
  return;
 }

 array.push({
  id: array.length,
  text: todoText,
  status: false
 });

 input.value = '';
 RenderToDo();
 saveTasksToLocalStorage();
}
