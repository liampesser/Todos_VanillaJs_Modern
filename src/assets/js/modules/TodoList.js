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

/**
  * Rendu de la TodoList
  * @return {[type]} [description]
  */
  render () {
    this.el.innerHTML = this.template;
    // Le DOM de la liste existe pour le navigateur
      this.listEl = this.el.querySelector('.todo-list');
    // Rendu des todos
      for (let todo of this.todos) {
        todo.render();
      }
    // Activation des éléments interactifs
      this.activerBtns();
  }

/**
 * Ajout d'un todo
 */
  addTodo() {
    const content = this.el.querySelector('.new-todo').value;
    const id = this.todos[this.todos.length - 1].id + 1;
    const newTodo = new Todo({parent: this, todo: {id, content, completed:false}});
    this.todos.push(newTodo);
    newTodo.render();
    this.el.querySelector('.new-todo').value = '';
  }

/**
  * Activation des éléments interactifs de la TodoList
  * @return {[type]} [description]
  */
  activerBtns() {
    // Activation de l'input .new-todo
      this.el.querySelector('.new-todo').onkeyup = (e) => {
        if (e.keyCode === 13) {
          this.addTodo();
        }
      }
  }
}
