import { MAX_NOTES } from "./constants";
import { updateCategoryList as updateDOMCategoryList } from "./sidebarManager";

class Category {
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

    getCategory() {
        return this.list;
    }
}

class CategoryManager {
    static _categories = [];

    static createCategory(name, symbol) {
        if (this.getCategory(name)) return false;
        const category = new Category(name, symbol);
        this._categories.push(category);
        this.updateCategories();
        return category;
    }

    static updateCategories() {
        updateDOMCategoryList(this.getCategories());
    }

    static getCategories() {
        return this._categories;
    }

    static getCategory(name) {
        return this.getCategories().find((e) => e.name === name);
    }

    static removeCategory(name) {
        const category = this.getCategory(name);
        if(!category) return false;
        this._categories.splice(this.getCategories().indexOf(category), 1);
        this.updateCategories();
    }

    static editCategory(cat, name, symbol) {
        const category = this.getCategory(cat.name);
        if(!category) return false;
        category.name = name;
        category.symbol = symbol;
        this.updateCategories();
        return true;
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

export { Todo, Category, CategoryManager, Note, CheckListItem }