import { EventEmitter, empty } from '../helper/helpers';

class RecipeListController extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;

    view.on('add', this.addItem.bind(this));
    view.on('edit', this.editItem.bind(this));
    view.on('remove', this.removeItem.bind(this));

    model.on('duplicate', this.handleDuplicate.bind(this));

    view.show(model.items);
  }

  connectCraftTable(cratTableController) {
    cratTableController.on('tryCraft', items => {
      const result = this.model.checkrecipes(items);
      if (result !== empty) {
        this.emit('craftSuccess', result);
      }
    });

    cratTableController.on('changeTable', items => {
      const result = this.model.checkrecipes(items);
      this.emit('recipeResult', result);
    });

    cratTableController.on('saveRecipe', this.handleSaveRecipe.bind(this));
  }

  addItem(title, recipe) {
    const item = this.model.addItem({
      id: btoa(Math.random()).substring(0, 7),
      name: title,
      recipe,
    });

    if (item) {
      this.view.addItem(item);
    }

    return item;
  }

  editItem({ id, title }) {
    const item = this.model.updateItem(id, { name: title });

    this.view.editItem(item);
  }

  removeItem(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  handleSaveRecipe(props) {
    if (this.addItem(props.name, props.recipe)) {
      this.emit('saved');
    }
  }

  handleDuplicate() {
    this.emit('duplicate');
  }
}

export default RecipeListController;
