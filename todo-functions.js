// Save todos data
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Get saved todos data from local storage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    const todos = JSON.parse(todosJSON);
    return todos;
  } else {
    return [];
  }
};

// Render todos application data
const renderTodos = function(todos, filters) {
  const filteredTodos = todos.filter(function(todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(function(todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach(function(todo) {
    const todoItem = generateTodosDOM(todo);
    document.querySelector("#todos").appendChild(todoItem);
  });
};

// This generate todos DOM elements
const generateTodosDOM = todo => {
  const todoContainer = document.createElement("div");
  const todoCompletedToggle = document.createElement("input");
  const todoText = document.createElement("span");
  const removeTodoButton = document.createElement("button");

  todoCompletedToggle.setAttribute("type", "checkbox");

  todoText.textContent = todo.text;
  removeTodoButton.textContent = "X";

  todoContainer.appendChild(todoCompletedToggle);
  todoContainer.appendChild(todoText);
  todoContainer.appendChild(removeTodoButton);

  return todoContainer;
};

const generateSummaryDOM = todos => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${todos.length} todos left`;
  return summary;
};
