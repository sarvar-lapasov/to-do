/*  All Todos */
let getLocalTodos = JSON.parse(window.localStorage.getItem("todos"));
let allTodos = getLocalTodos ? getLocalTodos : [];

/* Elements */
let todoForm = document.querySelector(".js-form");
let todoInput = document.querySelector(".js-input");

let allCount = document.querySelector(".all-count");
let complatedCount = document.querySelector(".complated-count");
let unComplatedCount = document.querySelector(".uncomplated-count");

let todosList = document.querySelector(".js-todos-list");

/* Template */
let todoItemTemplate = document.querySelector("#todo-item").content;

/* Complated todo function */
function complatedTodo(evt) {
    let todoId = evt.currentTarget.dataset.id;

    let foundElement = allTodos.find((todo) => todo.id == todoId);

    foundElement.is_complated = !foundElement.is_complated;

    window.localStorage.setItem("todos", JSON.stringify(allTodos));
    renderTodo(allTodos);
}

/* Delete todo function */
function deleteTodo(evt) {
    let todoId = evt.currentTarget.dataset.id;

    let foundTodoIndex = allTodos.findIndex((todo) => todo.id == todoId);
    allTodos.splice(foundTodoIndex, 1);

    window.localStorage.setItem("todos", JSON.stringify(allTodos));
    renderTodo(allTodos);
}

/* render todo function */

function renderTodo(todosArray) {
    todosList.innerHTML = "";

    /* Complated count */
    let bajarilganlarSoni = 0;
    let bajarilmaganlarSoni = 0;

    todosArray.forEach((todo) => {
        if (todo.is_complated === true) {
            bajarilganlarSoni += 1;
        } else {
            bajarilmaganlarSoni += 1;
        }
    });

    allCount.textContent = todosArray.length;
    complatedCount.textContent = bajarilganlarSoni;
    unComplatedCount.textContent = bajarilmaganlarSoni;

    todosArray.forEach((todo) => {
        let elTodo = todoItemTemplate.cloneNode(true);

        elTodo.querySelector(".js-todo-name").textContent = todo.todo_name;
        elTodo.querySelector(".js-delete-btn").dataset.id = todo.id;
        elTodo.querySelector(".js-complated").dataset.id = todo.id;
        elTodo.querySelector(".js-complated").checked = todo.is_complated;

        // if (todo.is_complated === true) {
        //     elTodo.querySelector(".js-todo-name").classList.add("line-through");
        // }

        let deleteButton = elTodo.querySelector(".js-delete-btn");
        let complatedCheckbox = elTodo.querySelector(".js-complated");

        deleteButton.addEventListener("click", deleteTodo);
        complatedCheckbox.addEventListener("change", complatedTodo);

        todosList.appendChild(elTodo);
    });
}

/* create new todo function */
function createTodo(e) {
    e.preventDefault();

    let todoInputValue = todoInput.value;

    let uniqueId = allTodos[allTodos.length - 1] ?
        allTodos[allTodos.length - 1].id :
        1;

    let newTodo = {
        id: uniqueId + 1,
        todo_name: todoInputValue,
        is_complated: false,
    };

    allTodos.push(newTodo);

    window.localStorage.setItem("todos", JSON.stringify(allTodos));

    renderTodo(allTodos);
    todoInput.value = "";
}

renderTodo(allTodos);
/*  Events */
todoForm.addEventListener("submit", createTodo);

/* ------------------- theme light and dark mode ----------------------- */
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
    updateIcon();
});

function themeMode() {
    // checking if theme key exists
    if (localStorage.getItem("theme") !== null) {
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.remove("dark");
        } else {
            document.body.classList.add("dark");
        }
    }
    updateIcon();
}
themeMode();

function updateIcon() {
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    } else {
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
}