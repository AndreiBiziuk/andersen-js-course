import { EventEmitter } from '../helper/helpers';
import ItemView from './ItemView';

class CraftTableView extends EventEmitter {
  constructor() {
    super();
    this.items = [];
    this.result = {};
    this.craftTable = document.getElementById('crafting-table');
    this.craftResult = document.getElementById('crafting-result-container');
    this.craftButton = document.getElementById('craft-button');
    this.clearButton = document.getElementById('clear-craft-button');
    this.newRecipeButton = document.getElementById('new-recipe-button');
    this.saveRecipeButton = document.getElementById('recipe-name-confirm');
    this.cancelRecipeButton = document.getElementById('recipe-name-cancel');

    this.clearButton.addEventListener('click', this.handleClearCraft.bind(this));
    this.craftButton.addEventListener('click', this.handleCraft.bind(this));
    this.newRecipeButton.addEventListener('click', this.handleNewRecipe.bind(this));
    this.saveRecipeButton.addEventListener('click', this.handleSaveRecipe.bind(this));
    this.cancelRecipeButton.addEventListener('click', this.handleCancelRecipe.bind(this));
  }

  show(items) {
    items.forEach(item => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const CraftItem = new ItemView({
      class: 'crafting-item',
      parent: this.craftTable,
      name: item.name,
      id: item.id,
      type: 'craftingItem',
      draggable: false,
    });
    CraftItem.show();
    this.items[item.id] = CraftItem;
    this.addEventListeners(CraftItem);

    return CraftItem;
  }

  addResult(item) {
    const CraftResult = new ItemView({
      class: 'crafting-item crafting-result-item',
      parent: this.craftResult,
      name: item.name,
      id: item.id,
      type: 'craftingResult',
      draggable: false,
    });
    this.result = CraftResult;
    CraftResult.show();

    return CraftResult;
  }

  editResult(item) {
    this.result.edit(item);
  }

  editItem(item) {
    this.items[item.id].edit(item);
  }

  removeItem(id) {
    this.items[id].remove();
    this.items.slice(id, 1);
  }

  handleRemove(id) {
    this.emit('remove', id);
  }

  handleClick(id) {
    this.emit('click', id);
  }

  addEventListeners(craftItem) {
    craftItem.on('click', this.handleClick.bind(this));
    craftItem.on('dragOver', this.handleDragOver.bind(this));
    craftItem.on('dragEnd', this.handleDragEnd.bind(this));
    craftItem.on('drop', this.handleDrop.bind(this));
    return craftItem;
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

  handleClearCraft() {
    this.emit('clearCraft');
  }

  handleCraft() {
    this.emit('craft');
  }

  handleNewRecipe() {
    const recipeNameForm = document.getElementById('recipe-name-container');
    recipeNameForm.classList.remove('hidden');
    this.emit('changed');
  }

  handleSaveRecipe() {
    const recipeNameInput = document.getElementById('recipe-name');
    const recipeName = recipeNameInput.value;
    this.emit('saveRecipe', recipeName);
  }

  handleCancelRecipe() {
    const recipeNameForm = document.getElementById('recipe-name-container');
    recipeNameForm.classList.add('hidden');
    this.emit('changed');
  }

  showError(message) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = message;
    messageContainer.classList.remove('message-success');
    messageContainer.classList.add('message-error');
    this.emit('changed');
  }

  showSuccess(message) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = message;
    messageContainer.classList.add('message-success');
    messageContainer.classList.remove('message-error');
    this.emit('changed');
  }
}

export default CraftTableView;
