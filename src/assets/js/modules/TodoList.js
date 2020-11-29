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
    this.render(this.todos);
  }

  /**
   * Chargement des todos sous forme d'objets de type Todo dans this.todos
   * @param  {[type]} todos [description]
   * @return {[type]}       [description]
   */
  loadTodos (todos) {
    for (const todo of todos) {
      this.todos.push(new Todo({parent: this, todo}));
    }
  }

/**
  * Rendu de la TodoList
  * @return {[type]} [description]
  */
  render (todos) {
    this.el.innerHTML = this.template;
    // Le DOM de la liste existe pour le navigateur
      this.listEl = this.el.querySelector('.todo-list');
    // Rendu des todos
      for (let todo of todos) {
        todo.render();
      }

    // Calcul du nombre de todos not completed
      this.setNotCompletedNumber();
    // Activation des éléments interactifs
      this._activerBtns();
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
  }

/**
 * Suppression de tous les todos.completed
 * @return {[type]} [description]
 */
  removeAllCompleted() {
    // Supprimer les todo.completed de this.todos
    this.todos = this.todos.filter(function (todo) {
      return !todo.completed;
    });
    this.render(this.todos);
  }

/**
 * Affichage des todos correspondants au filtre choisi
 * @param  {[type]} filter [description]
 * @return {[type]}        [description]
 */
  _filter (filter) {
    switch (filter) {
      case 'active':
        this.render(this.todos.filter(function (todo) {
          return !todo.completed;
        }));
        break;
      case 'completed':
        this.render(this.todos.filter(function (todo) {
          return todo.completed;
        }));
        break;
      default:
        this.render(this.todos);
    }
  }

/**
  * Activation des éléments interactifs de la TodoList
  * @return {[type]} [description]
  */
  _activerBtns() {
    // Activation de l'input .new-todo
      this.el.querySelector('.new-todo').onkeyup = (e) => {
        if (e.keyCode === 13) {
          this.addTodo();
        }
      };

    // Activation des .filter
      const filterBtns = this.el.querySelectorAll('.filter');
      for (let filterBtn of filterBtns) {
        filterBtn.onclick = () => {
          this._filter(filterBtn.dataset.filter);
        }
      }
    // Activation du .clear-completed
      this.el.querySelector('.clear-completed').onclick = () => {
        this.removeAllCompleted();
      };
  }
}
