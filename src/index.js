import { Todo, Category, CategoryManager, Note, CheckListItem } from './modules/todos';
import { validateCategoryInput } from './modules/formValidator';
import { toggleCategoryButtonVisibility } from './modules/sidebarManager';

CategoryManager.createCategory("General", "📄");
CategoryManager.createCategory("Gaming", "🎮");


const toggleButtonVisibilityBtn = document.getElementById("edit-categories-btn");
toggleButtonVisibilityBtn.addEventListener("click", toggleCategoryButtonVisibility);


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
