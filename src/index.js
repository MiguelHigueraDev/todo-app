import { Todo, TodoList, Note, CheckListItem } from './modules/todos';


const todo = new Todo('Estudiar JS', 'Debería estudiar más JS.', '2024-02-02', 1);
const note = new Note('Nota 1', 'asdasdasdkjasdkasjdk');
todo.notes.addNote(note);
const checkitem = new CheckListItem('Estudiar React');
todo.checkList.addCheckListItem(checkitem);
const list = new TodoList('Things to do');
list.addTodo(todo);
console.log(list.list);