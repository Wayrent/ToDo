import { RenderToDo } from './renderToDo.js';
import { addTodo } from './addTodo.js';

export let array = []; // Экспорт переменной array как массив

async function fetchTodos() {
  const response = await fetch('http://localhost:3000/todos');
  const todos = await response.json();
  array = todos;
  RenderToDo(array);
}

document.addEventListener('DOMContentLoaded', fetchTodos);

document.getElementById('todo-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', addTodo);

export async function addTodoToServer(todoText) {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: todoText, status: false })
  });

  return await response.json();
}

export async function toggleComplete(id, status) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
}

export async function deleteTodo(id) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE'
  });
}
