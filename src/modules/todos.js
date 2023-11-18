import { MAX_NOTES } from "./constants";
import { updateCategoryList as updateDOMCategoryList } from "./sidebarManager";

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
    static _todoLists = [];

    static createTodoList(name, symbol) {
        if (this.getTodoList(name)) return false;
        const todoList = new TodoList(name, symbol);
        this._todoLists.push(todoList);
        this.updateCategoryList();
        return todoList;
    }

    static updateCategoryList() {
        updateDOMCategoryList(this.getTodoLists());
    }

    static getTodoLists() {
        return this._todoLists;
    }

    static getTodoList(name) {
        return this.getTodoLists().find((e) => e.name === name);
    }

    static removeTodoList(name) {
        const todoList = this.getTodoList(name);
        if(!todoList) return false;
        this._todoLists.splice(this.getTodoLists().indexOf(todoList), 1);
        this.updateCategoryList();
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