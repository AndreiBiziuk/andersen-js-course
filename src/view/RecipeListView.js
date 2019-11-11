import { EventEmitter } from '../helper/helpers';
import ItemView from './ItemView';

class RecipeListView extends EventEmitter {
  constructor() {
    super();
    this.items = [];
    this.recipeList = document.getElementById('recipes-container');
  }

  handleAdd(event) {
    event.preventDefault();
    this.emit('add', 'Test');
  }

  show(items) {
    items.forEach(item => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const recipeItem = new ItemView({
      class: 'recipes-item',
      parent: this.recipeList,
      name: item.name,
      id: item.id,
      draggable: false,
      type: 'recipeItem',
    });
    recipeItem.show();
    this.items[item.id] = recipeItem;
    this.addEventListeners(recipeItem);

    return recipeItem;
  }

  editItem(item) {
    this.items[item.id].edit(item);
  }

  handleRemove(id) {
    this.emit('remove', id);
  }

  removeItem(id) {
    this.items[id].remove();
    this.items.slice(id, 1);
  }

  addEventListeners(recipeItem) {
    recipeItem.on('click', this.handleClick.bind(this));
    recipeItem.on('dragOver', this.handleDragOver.bind(this));
    recipeItem.on('dragEnd', this.handleDragEnd.bind(this));
    recipeItem.on('drop', this.handleDrop.bind(this));
    return recipeItem;
  }

  handleDragOver(params) {
    this.emit('dragOver', params);
  }

  handleDragEnd(params) {
    this.emit('dragEnd', params);
  }

  handleDrop(params) {
    this.emit('drop', params);
  }

  handleClick(id) {
    this.emit('clickRecipe', id);
  }
}

export default RecipeListView;
