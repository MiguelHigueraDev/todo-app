import { Todo, TodoList, TodoListManager, Note, CheckListItem } from './modules/todos';
import { updateCategoryList  } from './modules/sidebarManager';

const todoListManager = new TodoListManager();

const general = todoListManager.createTodoList("General", "📄");
const gaming = todoListManager.createTodoList("Gaming", "🎮");

const todo = new Todo("todo", "description", "2023-02-02", 1);
gaming.addTodo(todo);
//console.log(todoListManager.getTodoLists());
console.log(updateCategoryList(todoListManager.getTodoLists()));

const testBtn = document.getElementById("testing");
testBtn.addEventListener('click', () => {
    todoListManager.createTodoList("Coding", "C");
    updateCategoryList(todoListManager.getTodoLists());
})
