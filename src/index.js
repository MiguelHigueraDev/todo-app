import { Todo, Category, CategoryManager, Note, CheckListItem } from './modules/todos';
import { validateCategoryInput } from './modules/formValidator';
import { toggleCategoryButtonVisibility } from './modules/sidebarManager';

CategoryManager.createCategory("General", "📄");
CategoryManager.createCategory("Gaming", "🎮");

const createCategory = () => {
    const name = document.getElementById("category-name");
    const symbol = document.getElementById("category-symbol");
    const validated = validateCategoryInput(name, symbol);
    if(!validated) return;
    const created = CategoryManager.createCategory(validated.name, validated.symbol);
    if(!created) return alert("Category already exists");
    addCategoryModal.close();
}

const addCategoryBtn = document.getElementById("add-new-category-btn");
addCategoryBtn.addEventListener("click", createCategory);

const toggleButtonVisibilityBtn = document.getElementById("edit-categories-btn");
toggleButtonVisibilityBtn.addEventListener("click", toggleCategoryButtonVisibility);

const addCategoryModal = document.getElementById("add-category-modal");
const modalBtn = document.getElementById("add-category-modal-btn");
modalBtn.addEventListener('click', () => {
    addCategoryModal.showModal();
})

// Handle backdrop clicks
const modals = document.querySelectorAll(".modal");
for(const modal of modals) {
  modal.addEventListener("click", (e) => {
    var rect = modal.getBoundingClientRect();
    var isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      modal.close();
    }
  })
}
