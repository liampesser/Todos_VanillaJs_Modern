import todos    from './data';
import TodoList from './modules/TodoList';

new TodoList({
  el: '#app',
  todos
});
