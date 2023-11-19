import { Todo, TodoList, TodoListManager, Note, CheckListItem } from './modules/todos';
import { validateCategoryInput } from './modules/formValidator';
import { toggleItemButtonVisibility } from './modules/sidebarManager';

TodoListManager.createTodoList("General", "📄");
TodoListManager.createTodoList("Gaming", "🎮");

const createCategory = () => {
    const name = document.getElementById("category-name");
    const symbol = document.getElementById("category-symbol");
    const validated = validateCategoryInput(name, symbol);
    if(!validated) return;
    const created = TodoListManager.createTodoList(validated.name, validated.symbol);
    if(!created) return alert("Category already exists");
    addCategoryModal.close();
}

const addCategoryBtn = document.getElementById("add-new-category-btn");
addCategoryBtn.addEventListener("click", createCategory);

const toggleButtonVisibilityBtn = document.getElementById("edit-categories-btn");
toggleButtonVisibilityBtn.addEventListener("click", toggleItemButtonVisibility);

const addCategoryModal = document.getElementById("add-category-modal");
const modalBtn = document.getElementById("add-category-modal-btn");
modalBtn.addEventListener('click', () => {
    addCategoryModal.showModal();
})

// Handle backdrop clicks
addCategoryModal.addEventListener("click", (event) => {
    var rect = addCategoryModal.getBoundingClientRect();
    var isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      addCategoryModal.close();
    }
});
