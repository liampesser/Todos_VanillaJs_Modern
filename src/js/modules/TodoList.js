import Todo from './Todo';
import todoListTemplate from './templates/todoList';

export default class TodoList {
  constructor (data) {
    this.el = document.querySelector(data.el);
    this.todos = [];
    this.loadTodos(data.todos);
    this.template = todoListTemplate;
    this.render();
  }
  loadTodos (todos) {
    for (let todo of todos) {
      this.todos.push(new Todo(todo));
    }
  }
  render () {
    this.el.innerHTML = this.template;
  }
}
