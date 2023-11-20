import { CategoryManager } from "./todos";
import { validateCategoryInput } from "./formValidator";
import { displayCategoryTodos } from "./displayManager";

const categoryListContainer = document.querySelector("#category-list");
const addCategoryModal = document.getElementById("add-category-modal");
const addCategoryBtn = document.getElementById("add-new-category-btn");
const modalBtn = document.getElementById("add-category-modal-btn");

const deleteModal = document.getElementById("delete-category-modal");
const deleteCategoryBtn = deleteModal.querySelector('#delete-category-btn');
let buttonsHidden = true;

const createCategory = () => {
    const name = document.getElementById("category-name");
    const symbol = document.getElementById("category-symbol");
    const validated = validateCategoryInput(name, symbol);
    if (!validated) return;
    const created = CategoryManager.createCategory(validated.name, validated.symbol);
    if (!created) return alert("Category already exists");
    addCategoryModal.close();
}

const updateCategoryList = (categories) => {
    categoryListContainer.innerHTML = "";
    for (const cat of categories) {
        const category = document.createElement("li");
        // Save index so category can be edited later
        const index = categories.indexOf(cat);
        const item = createCategoryItem(cat, index);
        const btnList = createCategoryButtonList(cat, index);
        category.appendChild(btnList);
        category.appendChild(item);
        categoryListContainer.appendChild(category);
    }
}

const toggleCategoryButtonVisibility = () => {
    buttonsHidden = !buttonsHidden;
    updateCategoryList(CategoryManager.getCategories());
}

// This function adds listener for clicks on each category, so todos from that category are loaded.
const createCategoryItem = (category, index) => {
    const categoryItem = document.createElement('div');
    categoryItem.classList.add('category-list-item');
    categoryItem.textContent = category.name;
    categoryItem.setAttribute('data-id', index);
    categoryItem.addEventListener("click", () => displayCategoryTodos(category));
    const icon = document.createElement('i');
    icon.textContent = category.symbol;
    categoryItem.appendChild(icon);
    return categoryItem;
}

const createCategoryButtonList = (category, index) => {
    const buttonList = document.createElement('div');
    if(buttonsHidden) buttonList.classList.add('category-list-btns', 'hidden');
    else buttonList.classList.add('category-list-btns');
    const deleteBtn = createCategoryDeleteButton(category.name);
    buttonList.appendChild(deleteBtn);
    return buttonList;
}

const createCategoryDeleteButton = (name) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'delete-category');
    const icon = createIcon("fa solid fa-trash");
    button.addEventListener("click", () => showDeleteCategoryModal(name));
    button.appendChild(icon);
    return button;
}

const showDeleteCategoryModal = (name) => {
    deleteModal.querySelector('strong').textContent = `${name}`;
    deleteCategoryBtn.setAttribute("data-name", name);
    deleteModal.showModal();
}

deleteCategoryBtn.addEventListener("click", (e) => {
    const name = e.target.getAttribute("data-name");
    CategoryManager.removeCategory(name);
    deleteModal.close();
});

const createIcon = (iconTypes) => {
    const icon = document.createElement('i');
    const types = iconTypes.split(" ");
    for (const type of types) {
        icon.classList.add(type);
    }
    return icon;
}

modalBtn.addEventListener('click', () => {
    addCategoryModal.showModal();
});
addCategoryBtn.addEventListener("click", createCategory);


export { updateCategoryList, toggleCategoryButtonVisibility }