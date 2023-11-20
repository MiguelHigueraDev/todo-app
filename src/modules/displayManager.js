import { validateTodoInput, resetValidationErrors, validateCategoryInput } from "./formValidator";
import { CategoryManager, Todo } from "./todos";

const addTodoButton = document.querySelector(".todos-header-add-new");
const editCategoryButton = document.querySelector(".todos-header-edit-category");
const submitAddTodoButton = document.querySelector("#add-todo-btn");

const addTodoModal = document.querySelector("#create-todo-modal");
const editTodoModal = document.querySelector("#edit-todo-modal");

const titleInput = document.getElementById("todo-title");
const descriptionInput = document.getElementById("todo-description");
const dueDateInput = document.getElementById("todo-due-date");
const priorityInput = document.getElementById("todo-priority");
const checkedInput = document.getElementById("todo-checked");

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
    createTodoDivs(todos);  
}

const createTodoDivs = (todos) => {
    const todoContainer = document.querySelector(".todos-container");
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
    if(checked) todoArticle.classList.add("todo-checked");
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
    editButton.addEventListener("click", editTodo);
    editButton.appendChild(editIcon);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-delete-todo");
    deleteButton.addEventListener("click", deleteTodo);
    const deleteIcon = createButtonIcon("fa solid fa-trash");
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
    resetValidationErrors();
    const category = getCategory();
    const editModal = document.getElementById("edit-category-modal");
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
            editModal.close();
        } 
    });
    editModal.showModal();
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

const editTodo = (e) => {
    resetValidationErrors();
    const index = e.target.parentElement.parentElement.getAttribute("data-id");
    const { category, todo } = getTodoAndCategory(index);
    editTodoModal.showModal();
    console.log(todo);
    
    const title = document.getElementById("edit-todo-title");
    const description = document.getElementById("edit-todo-description");
    const dueDate = document.getElementById("edit-todo-due-date");
    const priority = document.getElementById("edit-todo-priority");
    const checked = document.getElementById("edit-todo-checked");

    title.value = todo.title;
    description.value = todo.description;
    dueDate.value = todo.dueDate;
    priority.value = todo.priority;
    checked.checked = todo.checked;

    const editBtn = document.getElementById("edit-todo-btn");
    editBtn.addEventListener("click", () => {
        const validated = validateTodoInput(title, description, dueDate, priority, checked);
        if (validated) {
            const { title, description, dueDate, priority, checked } = validated;
            todo.editTodo(title, description, dueDate, priority, checked);
            displayCategoryTodos(category);
            editTodoModal.close();
        }
    });

    editTodoModal.showModal();
}

const deleteTodo = (e) => {
    const index = e.target.parentElement.parentElement.getAttribute("data-id");
    const { category } = getTodoAndCategory(index);
    category.removeTodo(index);
    displayCategoryTodos(category);
}


export { displayCategoryTodos }