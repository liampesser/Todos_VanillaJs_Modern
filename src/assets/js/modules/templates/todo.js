export default `
  <li data-id="{{id}}" class="{{isCompletedClass}} listItem">
    <input class="toggle" type="checkbox" {{isCompletedChecked}}" />
    <label class="editable">{{content}}</label>
    <button class="destroy"></button>
  </li>
`;
