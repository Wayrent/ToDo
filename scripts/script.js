let array = [ 
    { 
        id:0, 
        text: '', 
        status: false 
    }, 
    // { 
    //     id:1, 
    //     text: 'jhgjkkg', 
    //     status: false 
    // } 
];

function addTodo() { 
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

    input.value = ''; // Clear the input field 
    RenderToDo(); 
} 

function RenderToDo() { 
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Clear the existing list

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
        }; 

        const deleteIcon = document.createElement('span'); 
        deleteIcon.classList.add('delete-icon'); 
        deleteIcon.textContent = '✕'; 
        deleteIcon.onclick = function(event) { 
            event.stopPropagation(); 
            li.remove(); 
            array.splice(i, 1); 
        }; 

        taskButtons.appendChild(completeIcon);  
        taskButtons.appendChild(deleteIcon);  
        li.appendChild(span);  
        li.appendChild(taskButtons);  
        todoList.appendChild(li); 
    }
} 

// Handle Enter Key
document.getElementById('todo-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Initial rendering 
RenderToDo(); 

