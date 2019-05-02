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

  document.querySelector(".content").innerHTML = "";
  document
    .querySelector(".content")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach(function(todo) {
    const todoItem = generateTodosDOM(todo);
    document.querySelector(".content").appendChild(todoItem);
  });
};

//Remove todo with remove todo button
const removeTodos = function(id) {
  const todosIndex = todos.findIndex(todo => {
    return todo.id === id;
  });
  if (todosIndex > -1) {
    todos.splice(todosIndex, 1);
  }
};

//Toggle the selected todo's completed property with its checkbox
const toggleCompleted = function(id) {
  const todo = todos.find(todo => {
    return todo.id === id;
  });

  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

//Generates the DOM element structure
const generateTodosDOM = todo => {
  const todoContainer = document.createElement("div");
  const todoCompletedToggle = document.createElement("input");
  const todoText = document.createElement("span");
  const removeTodoButton = document.createElement("button");

  //Set the todo's checkbox to show completed or not
  todoCompletedToggle.checked = todo.completed;

  todoCompletedToggle.addEventListener("change", e => {
    toggleCompleted(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  removeTodoButton.addEventListener("click", () => {
    removeTodos(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

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
