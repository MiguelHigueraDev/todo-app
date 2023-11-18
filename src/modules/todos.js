class TodoList {
    constructor(name) {
        this.name = name;
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
        this.notes.push(note);
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

export { Todo, TodoList, Note, CheckListItem }