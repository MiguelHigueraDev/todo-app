import { CategoryManager } from "./todos";

const categoryListContainer = document.querySelector("#category-list");

const updateCategoryList = (categories) => {
    categoryListContainer.innerHTML = "";
    for(const c of categories) {
        const cat = document.createElement("li");
        const item = createCategoryItem(c.name, c.symbol);
        const btnList = createCategoryButtonList(c);
        cat.appendChild(btnList);
        cat.appendChild(item);
        categoryListContainer.appendChild(cat);
    }
}

const toggleCategoryButtonVisibility = () => {
    const buttonContainers = document.querySelectorAll(".category-list-btns");
    for (const container of buttonContainers) {
        if (container.classList.contains("hidden")) container.classList.remove("hidden");
        else container.classList.add("hidden");
    }
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

const createCategoryButtonList = (category) => {
    const buttonList = document.createElement('div');
    buttonList.classList.add('category-list-btns', 'hidden');
    const editBtn = createCategoryEditButton(category);
    // Remove textContent lines
    editBtn.textContent = "E";
    buttonList.appendChild(editBtn);
    const deleteBtn = createCategoryDeleteButton(category.name);
    deleteBtn.textContent = "D";
    buttonList.appendChild(deleteBtn);
    return buttonList;
}

const createCategoryEditButton = (category) => {
    const button = document.createElement('button');
    button.classList.add('categories-btn', 'edit-category');
    const icon = createIcon("fa solid fa-plus");
    button.addEventListener("click", () => showEditCategoryModal(category));
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

const showEditCategoryModal = (category) => {
    const editModal = document.getElementById("edit-category-modal");
    const editCategoryName = document.getElementById("edit-category-name");
    const editCategorySymbol = document.getElementById("edit-category-symbol");
    editCategoryName.value = category.name;
    editCategorySymbol.value = category.symbol;
    const editBtn = document.getElementById("edit-category-btn");
    editBtn.addEventListener("click", () => {
        const deleted = CategoryManager.editCategory(category, editCategoryName.value, editCategorySymbol.value);
        if (deleted) editModal.close();
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

export { updateCategoryList, toggleCategoryButtonVisibility }