import todoTemplate from './templates/todo';

export default class Todo {
  constructor (data) {
    this.parent = data.parent;
    this.id = data.todo.id;
    this.content = data.todo.content;
    this.completed = data.todo.completed;
    this.template = todoTemplate;
  }
  render() {
    // Je remplace les données statiques par les données du Todo
    for (let propriete in this) {
      this.template = this.template.replace('{{'+propriete+'}}', this[propriete]);
    }
    // Si c'est completed
    this.template = this.template.replace('{{isCompletedClass}}', (this.completed===true)?'completed':'');
    this.template = this.template.replace('{{isCompletedChecked}}', (this.completed===true)?'checked="checked"':'');

    const newTodo = document.createElement('div');
    newTodo.innerHTML = this.template;
    this.parent.listEl.appendChild(newTodo);
  }
}
