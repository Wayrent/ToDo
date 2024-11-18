import { array } from './script.js';

export function saveTasksToLocalStorage() {
 localStorage.setItem('tasks', JSON.stringify(array)); 
}
