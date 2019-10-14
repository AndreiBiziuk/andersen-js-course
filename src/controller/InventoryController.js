import { EventEmitter } from '../helper/helpers';

class InventoryController extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;

    view.on('add', this.addItem.bind(this));
    view.on('edit', this.editItem.bind(this));
    view.on('remove', this.removeItem.bind(this));

    view.show(model.items);
  }

  connectCraftTable(craftTableController) {
    craftTableController.on('craftSuccess', itemName => {
      this.addItem(itemName);
    });
  }

  addItem(title) {
    const item = this.model.addItem({
      id: btoa(Math.random()).substring(0, 7),
      name: title,
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

export default InventoryController;
