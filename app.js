let itemIndex = localStorage.getItem("itemIndex")
  ? localStorage.getItem("itemIndex")
  : 0;

//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  //create Div
  const todoDiv = document.createElement("div");
  todoDiv.setAttribute("data-index", itemIndex);
  todoDiv.classList.add("todo");
  //create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Save to Local Storage
  saveLocalTodos(todoInput.value, false, itemIndex);
  //CheckMark Button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  //Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Append Div to List
  todoList.appendChild(todoDiv);
  //Clear todoInput value
  todoInput.value = "";
  itemIndex++;
  localStorage.setItem("itemIndex", itemIndex);
}

function deleteCheck(e) {
  const item = e.target;
  //delete btn
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //completed btn
  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
    statusLocalTodos(item.parentElement);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo, status, id) {
  // check if local storage is empty or not
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push({ id: Number(id), todo, status });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // check if local storage is empty or not
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // display data from local storage
  todos.forEach(function ({ id, todo, status }) {
    //create Div
    console.log({ id, todo, status });
    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("data-index", id);
    if (status) {
      todoDiv.classList.add("todo");
      todoDiv.classList.add("completed");
    } else {
      todoDiv.classList.add("todo");
    }
    //create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CheckMark Button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append Div to List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  const todoIndex = todo.dataset.index;
  // check if local storage is empty or not
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const newTodos = todos.filter((item) => item.id != todoIndex);
  localStorage.setItem("todos", JSON.stringify(newTodos));
}

function statusLocalTodos(todo) {
  const todoIndex = todo.dataset.index;
  // check if local storage is empty or not
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const newTodos = todos.map((item) => {
    if (item.id == todoIndex) {
      return { id: item.id, todo: item.todo, status: !item.status };
    }
    return { id: item.id, todo: item.todo, status: item.status };
  });
  localStorage.setItem("todos", JSON.stringify(newTodos));
}
