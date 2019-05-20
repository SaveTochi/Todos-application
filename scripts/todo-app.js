let todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false
};

renderTodos(todos, filters);

document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#new-todo").addEventListener("submit", e => {
  e.preventDefault();
  const text = e.target.elements.text.value;
  let id = uuidv4();
  if (text.length > 0) {
    document.querySelector(".warning").innerHTML = "";
    todos.push({
      text: text,
      completed: false,
      id: id
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.text.value = "";
  } else {
    generateWarningText();
  }
});

document.querySelector("#hide-completed").addEventListener("change", e => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
