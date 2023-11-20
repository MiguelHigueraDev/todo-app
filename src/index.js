import "./style.css";
import { CategoryManager } from './modules/todos';
import sidebarManager from "./modules/sidebarManager";
import displayManager from "./modules/displayManager";
import responsiveManager from "./modules/responsiveManager";

const mobileMenuButton = document.querySelector(".mobile-btn");

const toggleButtonVisibilityBtn = document.getElementById("edit-categories-btn");
toggleButtonVisibilityBtn.addEventListener("click", sidebarManager.toggleCategoryButtonVisibility);

CategoryManager.loadCategoriesFromStorage();
displayManager.displayCategoryTodos(CategoryManager.getCategoryByIndex(0));

// Responsivity

(function addResponsiveButtonHandlers() {
  mobileMenuButton.addEventListener("click", responsiveManager.toggleMobileMenu);
})();


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

function closeModal(id) {
  console.log(id);
}
