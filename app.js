const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Завантаження із localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Рендеринг списку
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.addEventListener("click", () => toggleComplete(index));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Видалити";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", () => deleteTodo(index));

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

// Додавання завдання
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    todoInput.value = "";
    saveTodos();
    renderTodos();
  }
});

// Позначити як виконане
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Видалення завдання
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Зберігаємо в localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Початковий рендер
renderTodos();
