import "./style.css";
import { PRIORITIES } from "./modules/constants";
import { Todo, Category, CategoryManager, Note, CheckListItem } from './modules/todos';
import { toggleCategoryButtonVisibility } from './modules/sidebarManager';

const general = CategoryManager.createCategory("General", "📄");
CategoryManager.createCategory("Gaming", "🎮");

const todo1 = new Todo("Title", "asdasdmahskjdhakjsdjkasdkjaksd", "2022-01-01", PRIORITIES.LOW);
const todo2 = new Todo("Title2", "todoaskjdaskdakjsdajhksdjahsjkdashjkd", "2023-01-01", PRIORITIES.HIGH);

general.addTodo(todo1);
general.addTodo(todo2);

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
