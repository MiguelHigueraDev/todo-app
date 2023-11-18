import { MAX_NOTES } from "./constants";

class TodoList {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.list = [];
    }

    addTodo(todo) {
        this.list.push(todo);
    }

    removeTodo(index) {
        this.list.splice(index, 1);
    }

    getTodoList() {
        return this.list;
    }
}

class TodoListManager {
    static todoLists = [];

    createTodoList(name, symbol) {
        const todoList = new TodoList(name, symbol);
        TodoListManager.todoLists.push(todoList)
        return todoList
    }

    getTodoLists() {
        return TodoListManager.todoLists;
    }
}

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = new NotesManager();
        this.checkList = new CheckListManager();
    }
}

class Note {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

class CheckListItem {
    constructor(text) {
        this.text = text;
        this.checked = false;
    }
}

class NotesManager {
    constructor() {
        this.notes = [];
    }

    addNote(note) {
        if(this.notes.length >= MAX_NOTES) return false;
        this.notes.push(note);
        return true;
    }

    removeNote(index) {
        this.notes.splice(index, 1);
    }
}

class CheckListManager {
    constructor() {
        this.checkList = [];
    }

    addCheckListItem(item) {
        this.checkList.push(item);
    }

    removeCheckListItem(index) {
        this.checkList.splice(index, 1);
    }

}

export { Todo, TodoList, TodoListManager, Note, CheckListItem }