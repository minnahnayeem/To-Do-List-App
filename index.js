// create todo
let todoItems = [];

function renderTodo(todo) {

    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
    const list = document.querySelector(".js-todo-list");

    const item = document.querySelector(`[data-key='${todo.id}']`);      

    //check if todo deleted
    if (todo.deleted) {
        item.remove();
        if (todoItems.length === 0) list.innerHTML = '';
        return;        
    }

    // if checked- assign it as done- store in isChecked; otherwise leave it empty
    const isChecked = todo.checked ? 'done' : '';
    const node = document.createElement("ul");

    node.setAttribute("class", `todo-item ${isChecked}`);
    node.setAttribute("data-key", todo.id);

    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span> ${todo.text} </span>
    <button class="delete-todo js-delete-todo">
    <svg> <use href="#delete-icon"></use> </svg> 
    </button>   
    `;

    if (item) {
        list.replaceChild(node, item);
    } else {
    list.append(node);
    }
}

// to add a todo
function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now()
    };
    todoItems.push(todo);
    // console.log(todoItems);
    renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    // new object is created
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    //reove the todo item by filter
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

const form = document.querySelector(".js-form");
form.addEventListener('submit', event => {
    event.preventDefault();

    const input = document.querySelector(".js-todo-input");

    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

const list = document.querySelector(".js-todo-list");

list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
        todoItems = JSON.parse(ref);
        todoItems.forEach(t => {
            renderTodo(t);
        });
    }
})
