import { EventEmitter, empty } from '../helper/helpers';

class ReceipeListController extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;

    view.on('add', this.addItem.bind(this));
    view.on('edit', this.editItem.bind(this));
    view.on('remove', this.removeItem.bind(this));

    view.show(model.items);
  }

  connectCraftTable(cratTableController) {
    cratTableController.on('tryCraft', items => {
      const result = this.model.checkReceipes(items);
      if (result !== empty) {
        this.emit('craftSuccess', result);
      }
    });

    cratTableController.on('changeTable', items => {
      const result = this.model.checkReceipes(items);
      this.emit('receipeResult', result);
    });
  }

  addItem(title, receipe) {
    const item = this.model.addItem({
      id: btoa(Math.random()).substring(0, 7),
      name: title,
      receipe,
    });

    this.view.addItem(item);
  }

  editItem({ id, title }) {
    const item = this.model.updateItem(id, { name: title });

    this.view.editItem(item);
  }

  removeItem(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }
}

export default ReceipeListController;
