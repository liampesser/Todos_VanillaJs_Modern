import todos    from './data.js';
import TodoList from './modules/TodoList.js';

new TodoList({
  el: '#app',
  todos
});
