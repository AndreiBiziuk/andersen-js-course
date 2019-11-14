import { EventEmitter, empty } from '../helper/helpers';

class CraftTableController extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;

    view.on('add', this.addItem.bind(this));
    view.on('edit', this.editItem.bind(this));
    view.on('remove', this.removeItem.bind(this));
    view.on('click', this.handleClick.bind(this));
    view.on('drop', this.handleDrop.bind(this));
    view.on('clearCraft', this.handleClearCraft.bind(this));
    view.on('craft', this.handleCraft.bind(this));
    view.on('saveRecipe', this.handleSaveRecipe.bind(this));

    this.view.addResult(this.model.getResult());

    view.show(model.items);
  }

  connectRecipeList(recipeListController) {
    recipeListController.on('craftSuccess', itemName => {
      this.emit('craftSuccess', itemName);
    });

    recipeListController.on('recipeResult', itemName => {
      this.view.editResult(this.model.setResult({ name: itemName }));
    });

    recipeListController.on('changed', this.handleRecipesChanged.bind(this));
    recipeListController.on('duplicate', this.handleDuplicateRecipe.bind(this));
    recipeListController.on('saved', this.handleRecipeSaved.bind(this));
  }

  addItem(title) {
    const item = this.model.addItem({
      id: btoa(Math.random()).substring(0, 7),
      name: title,
    });

    this.view.addItem(item);

    const { items } = this.model;
    this.emit('changeTable', items);
  }

  editItem({ id, title }) {
    const item = this.model.updateItem(id, { name: title });

    this.view.editItem(item);

    const { items } = this.model;
    this.emit('changeTable', items);
  }

  removeItem(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);

    const { items } = this.model;
    this.emit('changeTable', items);
  }

  handleClick(id) {
    this.editItem({ id, title: empty });
  }

  handleDrop(params) {
    const { id, types, name } = params;
    const supportedTypes = ['application/x.inventoryitem'];
    const t = types.filter(type => supportedTypes.includes(type));
    if (t.length) {
      //   const targetItem = this.model.getItem(id);
      //   const targetName = targetItem.name;
      //   if (targetName !== '&nbsp;') {
      //   }
      this.editItem({ id, title: name });
    }
  }

  handleClearCraft() {
    const items = this.model.clearItems();
    const { view } = this;
    items.forEach(item => {
      view.editItem(item);
    });

    this.emit('changeTable', items);
  }

  handleCraft() {
    const { items } = this.model;
    this.emit('tryCraft', items);
  }

  handleSaveRecipe(name) {
    const items = [];
    this.model.items.forEach(item => items.push(item.name));

    if (String(name).trim().length > 0) {
      this.emit('saveRecipe', { name, recipe: items });
    } else {
      this.view.showError('Recipe name cannot be empty!');
    }
  }

  handleRecipesChanged() {
    const { items } = this.model;
    this.emit('changeTable', items);
  }

  handleRecipeSaved() {
    this.view.showSuccess('Recipe have been added!');
    const { items } = this.model;
    this.emit('changeTable', items);
  }

  handleDuplicateRecipe() {
    this.view.showError('Duplicate recipe name!');
  }
}

export default CraftTableController;
