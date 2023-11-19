import { CategoryManager } from "./todos";
import { resetCategoryValidationErrors, validateCategoryInput } from "./formValidator";

const categoryListContainer = document.querySelector("#category-list");
const addCategoryModal = document.getElementById("add-category-modal");
const addCategoryBtn = document.getElementById("add-new-category-btn");
const modalBtn = document.getElementById("add-category-modal-btn");
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
        const item = createCategoryItem(cat.name, cat.symbol);
        // Save index so category can be edited later
        const index = categories.indexOf(cat);
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

const createCategoryItem = (name, symbol) => {
    const categoryItem = document.createElement('div');
    categoryItem.classList.add('category-list-item');
    categoryItem.textContent = name;
    const icon = document.createElement('i');
    icon.textContent = symbol;
    categoryItem.appendChild(icon);
    return categoryItem;
}

const createCategoryButtonList = (category, index) => {
    const buttonList = document.createElement('div');
    if(buttonsHidden) buttonList.classList.add('category-list-btns', 'hidden');
    else buttonList.classList.add('category-list-btns');
    const editBtn = createCategoryEditButton(category, index);
    // Remove textContent lines
    editBtn.textContent = "E";
    buttonList.appendChild(editBtn);
    const deleteBtn = createCategoryDeleteButton(category.name);
    deleteBtn.textContent = "D";
    buttonList.appendChild(deleteBtn);
    return buttonList;
}

const createCategoryEditButton = (category, index) => {
    const button = document.createElement('button');
    button.classList.add('categories-btn', 'edit-category');
    const icon = createIcon("fa solid fa-plus");
    button.addEventListener("click", (e) => showEditCategoryModal(e, category));
    button.setAttribute('data-id', index);
    button.appendChild(icon);
    return button;
}

const createCategoryDeleteButton = (name) => {
    const button = document.createElement('button');
    button.classList.add('categories-btn', 'delete-category');
    const icon = createIcon("fa solid fa-plus");
    button.addEventListener("click", () => showDeleteCategoryModal(name));
    button.appendChild(icon);
    return button;
}

const showDeleteCategoryModal = (name) => {
    const deleteModal = document.getElementById("delete-category-modal");
    deleteModal.querySelector('strong').textContent = `${name}`;
    const deleteBtn = deleteModal.querySelector('#delete-category-btn');
    deleteBtn.addEventListener("click", () => {
        CategoryManager.removeCategory(name);
        deleteModal.close();
    });
    deleteModal.showModal();
}

const showEditCategoryModal = (e, category) => {
    resetCategoryValidationErrors();
    const index = e.target.getAttribute('data-id');
    const editModal = document.getElementById("edit-category-modal");
    const editCategoryName = document.getElementById("edit-category-name");
    const editCategorySymbol = document.getElementById("edit-category-symbol");
    editCategoryName.value = category.name;
    editCategorySymbol.value = category.symbol;
    const editBtn = document.getElementById("edit-category-btn");
    editBtn.setAttribute('data-id', index);
    editBtn.addEventListener("click", (e) => {
        const index = e.target.getAttribute('data-id');
        const validated = validateCategoryInput(editCategoryName, editCategorySymbol);
        if(validated) {
            CategoryManager.editCategory(index, validated.name, validated.symbol);
            editModal.close();
        } 
    });
    editModal.showModal();
}

const createIcon = (iconTypes) => {
    const icon = document.createElement('i');
    const types = iconTypes.split(" ");
    for(const type of types) {
        icon.classList.add(type);
    }
    return icon;
}

modalBtn.addEventListener('click', () => {
    addCategoryModal.showModal();
});
addCategoryBtn.addEventListener("click", createCategory);

export { updateCategoryList, toggleCategoryButtonVisibility }