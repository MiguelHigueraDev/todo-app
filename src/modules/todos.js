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

    getTodos() {
        return this.list;
    }

    getTodo(index) {
        return this.list[index];
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

    static getCategoryByIndex(index) {
        return this.getCategories()[index];
    }

    static getCategoryIndex(category) {
        return this.getCategories().indexOf(this.getCategory(category.name));
    }

    static removeCategory(name) {
        const category = this.getCategory(name);
        if(!category) return false;
        this._categories.splice(this.getCategories().indexOf(category), 1);
        this.updateCategories();
    }

    static editCategory(index, name, symbol) {
        const category = this.getCategoryByIndex(index);
        if(!category) return false;
        category.name = name;
        category.symbol = symbol;
        this.updateCategories();
        return true;
    }
}

class Todo {
    constructor(title, description, dueDate, priority, checked) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }

    editTodo(title, description, dueDate, priority, checked) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }

    toggleChecked() {
        this.checked = !this.checked;
    }

}

class Note {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

class NotesManager {
    constructor() {
        this.notes = [];
    }

    addNote(note) {
        this.notes.push(note);
    }

    removeNote(index) {
        this.notes.splice(index, 1);
    }
}


export { Todo, Category, CategoryManager, Note }