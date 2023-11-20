import sidebarManager from "./sidebarManager";

class Category {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.list = [];
    }

    addTodo(todo) {
        this.list.push(todo);
        CategoryManager.saveToStorage();
    }

    removeTodo(index) {
        this.list.splice(index, 1);
        CategoryManager.saveToStorage();
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
        this.saveToStorage();
        return category;
    }

    static updateCategories() {
        sidebarManager.updateCategoryList(this.getCategories());
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
        // Don't let the user remove the last category.
        if(this.getCategories().length === 1) return alert("Cannot delete the last category.");
        const category = this.getCategory(name);
        if(!category) return false;
        this._categories.splice(this.getCategories().indexOf(category), 1);
        this.updateCategories();
        this.saveToStorage();
    }

    static editCategory(index, name, symbol) {
        const category = this.getCategoryByIndex(index);
        if(!category) return false;
        category.name = name;
        category.symbol = symbol;
        this.updateCategories();
        this.saveToStorage();
        return true;
    }

    static saveToStorage() {
        const save = JSON.stringify(this.getCategories());
        localStorage.setItem("todos", save);
    }

    static loadCategoriesFromStorage() {
        const saved = JSON.parse(localStorage.getItem("todos"));
        if(saved == null) return this.generateBaseCategory();
        for (const category of saved) {
            const cat = this.createCategory(category.name, category.symbol);
            for (const to of category.list) {
                const todo = new Todo(to.title, to.description, to.dueDate, to.priority, to.checked);
                cat.addTodo(todo);
            }
        }
    }

    static generateBaseCategory() {
        this.createCategory("General", "📄");
        this.saveToStorage();
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
        CategoryManager.saveToStorage();
    }

    toggleChecked() {
        this.checked = !this.checked;
        CategoryManager.saveToStorage();
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