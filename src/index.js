import "./style.css";
import { PRIORITIES } from "./modules/constants";
import { Todo, Category, CategoryManager, Note, CheckListItem } from './modules/todos';
import { toggleCategoryButtonVisibility } from './modules/sidebarManager';
import { displayCategoryTodos } from "./modules/displayManager";

//const general = CategoryManager.createCategory("General", "📄");
//const gaming = CategoryManager.createCategory("Gaming", "🎮");

/*const generateTodos = (quantity) => {
  for(let i = 0; i < quantity; i++) {
    const todo = new Todo(`Title ${i}`, `This is the element number ${i}`, '2023-02-01', PRIORITIES.LOW, false);
    general.addTodo(todo);
  }
}

generateTodos(5);*/

const toggleButtonVisibilityBtn = document.getElementById("edit-categories-btn");
toggleButtonVisibilityBtn.addEventListener("click", toggleCategoryButtonVisibility);

console.log(CategoryManager.loadCategoriesFromStorage());


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
