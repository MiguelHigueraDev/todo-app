import { Todo, TodoList, TodoListManager, Note, CheckListItem } from './modules/todos';
import { updateCategoryList } from './modules/sidebarManager';
import { validateCategoryInput } from './modules/formValidator';

const general = TodoListManager.createTodoList("General", "📄");
const gaming = TodoListManager.createTodoList("Gaming", "🎮");

const createCategory = (e) => {
    let name = document.getElementById("category-name");
    let symbol = document.getElementById("category-symbol");
    if(!validateCategoryInput(name, symbol)) return;
    TodoListManager.createTodoList(name.value, symbol.value);
    addCategoryModal.close();
}

const addCategoryBtn = document.getElementById("add-new-category-btn");
addCategoryBtn.addEventListener('click', createCategory);

const testBtn = document.getElementById("testing");
testBtn.addEventListener('click', () => {
    TodoListManager.createTodoList("Coding", "C");
    TodoListManager.removeTodoList("General");
})

const addCategoryModal = document.getElementById("add-category-modal");
const modalBtn = document.getElementById("add-category-modal-btn");
modalBtn.addEventListener('click', () => {
    addCategoryModal.showModal();
})
