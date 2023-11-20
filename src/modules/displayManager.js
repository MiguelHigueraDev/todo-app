import { validateTodoInput, resetValidationErrors, validateCategoryInput } from "./formValidator";
import { hideMobileMenu } from "./responsiveManager";
import { CategoryManager, Todo } from "./todos";

const todoContainer = document.querySelector(".todos-container");

const addTodoButton = document.querySelector(".todos-header-add-new");
const editCategoryButton = document.querySelector(".todos-header-edit-category");
const submitAddTodoButton = document.querySelector("#add-todo-btn");
const submitEditTodoButton = document.querySelector("#edit-todo-btn");

const addTodoModal = document.querySelector("#create-todo-modal");
const editTodoModal = document.querySelector("#edit-todo-modal");

const titleInput = document.getElementById("todo-title");
const descriptionInput = document.getElementById("todo-description");
const dueDateInput = document.getElementById("todo-due-date");
const priorityInput = document.getElementById("todo-priority");
const checkedInput = document.getElementById("todo-checked");

const editTitleInput = document.getElementById("edit-todo-title");
const editDescriptionInput = document.getElementById("edit-todo-description");
const editDueDateInput = document.getElementById("edit-todo-due-date");
const editPriorityInput = document.getElementById("edit-todo-priority");
const editCheckedInput = document.getElementById("edit-todo-checked");

// Display todo grid
const getCategoryTodos = (category) => {
    return category.getTodos();
}

const getCategoryInfo = (category) => {
    const { name, symbol } = category;
    return { name, symbol };
}

const displayCategoryTodos = (category) => {
    const todos = getCategoryTodos(category);
    const { name, symbol } = getCategoryInfo(category);
    updateAddTodoButtonCategoryId(category);
    updateCategoryName(name);
    updateCategorySymbol(symbol);
    removeTodoDivs();
    // Hide sidebar
    hideMobileMenu();
    createTodoDivs(todos);
    
    if (todos.length === 0) displayNoTodosMessage();
}

const displayNoTodosMessage = () => {
    const message = document.createElement('h2');
    message.textContent = "This category has no todos. Press the + button to add the first one.";
    console.log(message);
    todoContainer.appendChild(message);
}

const createTodoDivs = (todos) => {
    for(const todo of todos) {
        const todoArticle = createTodoArticle(todos.indexOf(todo), todo.title, todo.description, todo.dueDate,  todo.priority, todo.checked);
        todoContainer.appendChild(todoArticle);
    }
}

const removeTodoDivs = () => {
    const todoContainer = document.querySelector(".todos-container");
    todoContainer.innerHTML = "";
}

const createTodoArticle = (index, title, description, dueDate, priority, checked) => {
    const todoArticle = document.createElement("article");
    todoArticle.classList.add("todo");
    todoArticle.classList.add(priority);
    if (checked) todoArticle.classList.add("todo-checked");
    todoArticle.setAttribute('data-id', index);
    const { heading, para } = createTodoText(title, description);
    const buttons = createTodoButtons();
    todoArticle.appendChild(heading);
    todoArticle.appendChild(para);
    todoArticle.appendChild(buttons);
    return todoArticle;
}

const createTodoText = (title, description) => {
    const heading = document.createElement("h4");
    heading.textContent = title;
    const para = document.createElement("p");
    para.textContent = description;
    return { heading, para };
}

const createTodoButtons = () => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add('todo-button-container');

    const toggleCheckedButton = document.createElement("button");
    toggleCheckedButton.classList.add("btn");
    const checkedIcon = createButtonIcon("fa solid fa-circle-check");
    toggleCheckedButton.addEventListener("click", toggleTodoChecked);
    toggleCheckedButton.appendChild(checkedIcon);

    const editButton = document.createElement("button");
    editButton.classList.add("btn");
    const editIcon = createButtonIcon("fa solid fa-pen-to-square");
    editButton.addEventListener("click", showEditTodoModal);
    editButton.appendChild(editIcon);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-delete-todo");
    const deleteIcon = createButtonIcon("fa solid fa-trash");
    deleteButton.addEventListener("click", deleteTodo);
    deleteButton.appendChild(deleteIcon);

    buttonContainer.appendChild(toggleCheckedButton);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    return buttonContainer;
}

const createButtonIcon = (classes) => {
    const icon = document.createElement("i");
    classes = classes.split(" ");
    icon.classList.add(...classes);
    return icon;
}

const updateAddTodoButtonCategoryId = (category) => {
    const index = CategoryManager.getCategoryIndex(category);
    addTodoButton.setAttribute("data-id", index);
}

const updateCategoryName = (name) => {
    const categoryName = document.querySelector(".category-name");
    categoryName.innerText = name;
}

const updateCategorySymbol = (symbol) => {
    const categorySymbol = document.querySelector(".category-symbol");
    categorySymbol.textContent = symbol;
}

const getCategory = () => {
    const categoryIndex = addTodoButton.getAttribute('data-id');
    const category = CategoryManager.getCategoryByIndex(categoryIndex);
    return category;
}

// Add todo
addTodoButton.addEventListener("click", () => {
    addTodoModal.showModal();
});

const createTodo = () => {
    const validated = validateTodoInput(titleInput, descriptionInput, dueDateInput, priorityInput, checkedInput);
    if (!validated) return;
    const category = getCategory();
    const { title, description, dueDate, priority, checked } = validated;
    const todo = new Todo(title, description, dueDate, priority, checked);
    category.addTodo(todo);
    addTodoModal.close();
    displayCategoryTodos(category);
}

submitAddTodoButton.addEventListener("click", createTodo);


// Edit category

const showEditCategoryModal = () => {
    const category = getCategory();
    const editCategoryModal = document.getElementById("edit-category-modal");
    const editCategoryName = document.getElementById("edit-category-name");
    const editCategorySymbol = document.getElementById("edit-category-symbol");
    editCategoryName.value = category.name;
    editCategorySymbol.value = category.symbol;
    const editBtn = document.getElementById("edit-category-btn");
    editBtn.addEventListener("click", () => {
        const categoryIndex = addTodoButton.getAttribute('data-id');
        const validated = validateCategoryInput(editCategoryName, editCategorySymbol);
        if(validated) {
            CategoryManager.editCategory(categoryIndex, validated.name, validated.symbol);
            updateCategoryName(validated.name);
            updateCategorySymbol(validated.symbol);
            editCategoryModal.close();
        } 
    });
    resetValidationErrors();
    editCategoryModal.showModal();
}

editCategoryButton.addEventListener("click", showEditCategoryModal);

// Handle todo buttons

const getTodoAndCategory = (index) => {
    const category = getCategory();
    const todo = category.getTodo(index);
    return { category, todo }
} 

const toggleTodoChecked = (e) => {
    const index = e.target.parentElement.parentElement.getAttribute("data-id");
    const { category, todo } = getTodoAndCategory(index);
    todo.toggleChecked();
    displayCategoryTodos(category);
}

const showEditTodoModal = (e) => {
    const index = e.target.parentElement.parentElement.getAttribute("data-id");
    const { todo } = getTodoAndCategory(index);

    editTitleInput.value = todo.title;
    editDescriptionInput.value = todo.description;
    editDueDateInput.value = todo.dueDate;
    editPriorityInput.value = todo.priority;
    editCheckedInput.checked = todo.checked;

    submitEditTodoButton.setAttribute("data-id", index);

    resetValidationErrors();
    editTodoModal.showModal();
}

const editTodo = (e) => {
    const index = e.target.getAttribute("data-id");
    const { category, todo } = getTodoAndCategory(index);

    const validated = validateTodoInput(editTitleInput, editDescriptionInput, editDueDateInput, editPriorityInput, editCheckedInput);

    if (validated) {
        const { title, description, dueDate, priority, checked } = validated;
        todo.editTodo(title, description, dueDate, priority, checked);
        displayCategoryTodos(category);
        editTodoModal.close();
    }

}

submitEditTodoButton.addEventListener("click", editTodo);

const deleteTodo = (e) => {
    const index = e.target.parentElement.parentElement.getAttribute("data-id");
    const { category } = getTodoAndCategory(index);
    category.removeTodo(index);
    displayCategoryTodos(category);
}


export { displayCategoryTodos }