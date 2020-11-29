import Todo from './Todo';
import todoListTemplate from './templates/todoList';

export default class TodoList {
  constructor (data) {
    this.el = document.querySelector(data.el);
    this.listEl;
    this.notCompletedNumber;
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

    // Calcul du nombre de todos not completed
      this.setNotCompletedNumber();
    // Activation des éléments interactifs
      this.activerBtns();
  }

  setNotCompletedNumber() {
    this.notCompletedNumber = this.todos.filter(function(todo) {
      return todo.completed === false;
    }).length;
    this.el.querySelector('#todo-count').innerText = this.notCompletedNumber;
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
    this.setNotCompletedNumber();
  }

/**
 * Suppression d'un Todo par son id
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
  removeOneById (id) {
    this.todos = this.todos.filter(function(todo) {
      return todo.id !== id;
    });
    console.table(this.todos);
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
