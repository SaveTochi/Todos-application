// Save todos data
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Get saved todos data from local storage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON !== null ? JSON.parse(todosJSON) : [];
  } catch {
    return [];
  }
};

// Render todos application data
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  document.querySelector("#content").innerHTML = "";
  document
    .querySelector("#content")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach(todo => {
    const todoItem = generateTodosDOM(todo);
    document.querySelector("#content").appendChild(todoItem);
  });
};

//Remove todo with remove todo button
const removeTodos = id => {
  const todosIndex = todos.findIndex(todo => todo.id === id);
  if (todosIndex > -1) {
    todos.splice(todosIndex, 1);
  }
};

//Toggle the selected todo's completed property with it's checkbox
const toggleCompleted = id => {
  const todo = todos.find(todo => todo.id === id);

  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

//Generates the DOM element structure
const generateTodosDOM = todo => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const completedToggle = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  //Setup the todo's checkbox to toggle completed
  completedToggle.setAttribute("type", "checkbox");
  completedToggle.checked = todo.completed;
  containerEl.appendChild(completedToggle);
  completedToggle.addEventListener("change", e => {
    toggleCompleted(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  //Seup the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  //Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  //Setup the remove button
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodos(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });
  return todoEl;
};

const generateSummaryDOM = todos => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${todos.length} todos left`;
  return summary;
};

const generateWarningText = () => {
  const warningText = document.querySelector(".warning");
  warningText.textContent = "Please enter text";
  warningText.style.color = "red";
};
