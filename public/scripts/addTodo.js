import { RenderToDo } from './renderToDo.js';
import { addTodoToServer, array } from './script.js'; // Правильный импорт переменной array

export async function addTodo() {
  const input = document.getElementById('todo-input');
  const todoText = input.value.trim();

  if (todoText === '') {
    alert('Сначала введите задачу!');
    return;
  }

  const todo = await addTodoToServer(todoText);
  array.push(todo); // Убедитесь, что array является массивом

  input.value = '';
  RenderToDo(array);
}
