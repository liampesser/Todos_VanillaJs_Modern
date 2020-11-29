import Todo from './Todo';
import todoListTemplate from './templates/todoList';

export default class TodoList {
  constructor (data) {
    this.el = document.querySelector(data.el);
    this.listEl;
    this.todos = [];
    this.loadTodos(data.todos);
    this.template = todoListTemplate;
    this.render();
  }
  loadTodos (todos) {
    for (const todo of todos) {
      this.todos.push(new Todo({parent: this, todo}));
    }
  }
  render () {
    this.el.innerHTML = this.template;
    // L'élément .todo-list existe existe pour le navigateur
      this.listEl = this.el.querySelector('.todo-list');

      for (let todo of this.todos) {
        todo.render();
      }
  }
}
