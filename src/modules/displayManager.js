import { CategoryManager } from "./todos";

const getCategoryTodos = (category) => {
    return category.getTodos();
}

const getCategoryInfo = (category) => {
    const { name, symbol } = category;
    return { name, symbol };
}

const displayCategoryTodos = (index) => {
    const todos = getCategoryTodos(index);
    const { name, symbol } = getCategoryInfo(index);
    updateCategoryName(name);
    updateCategorySymbol(symbol);
    removeTodoDivs();
    createTodoDivs(todos);

}

const createTodoDivs = (todos) => {
    const todoContainer = document.querySelector(".todos-container");
    for(const todo of todos) {
        const todoArticle = createTodoArticle(todo.title, todo.description);
        todoContainer.appendChild(todoArticle);
    }
}

const removeTodoDivs = () => {
    const todoContainer = document.querySelector(".todos-container");
    todoContainer.innerHTML = "";
}

const createTodoArticle = (title, description) => {
    const todoArticle = document.createElement("article");
    todoArticle.classList.add("todo");
    const heading = document.createElement("h4");
    heading.textContent = title;
    todoArticle.appendChild(heading);
    const para = document.createElement("p");
    para.textContent = description;
    todoArticle.appendChild(para)
    return todoArticle;
}

const updateCategoryName = (name) => {
    const categoryName = document.querySelector(".category-name");
    categoryName.innerText = name;
}

const updateCategorySymbol = (symbol) => {
    const categorySymbol = document.querySelector(".category-symbol");
    categorySymbol.textContent = symbol;
}

export { displayCategoryTodos }