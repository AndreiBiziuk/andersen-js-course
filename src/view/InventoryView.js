import { EventEmitter } from '../helper/helpers';
import ItemView from './ItemView';

class InventoryView extends EventEmitter {
  constructor() {
    super();
    this.items = [];
    this.inventory = document.getElementById('inventory-container');
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
    const InventoryItem = new ItemView({
      class: 'inventory-item',
      parent: this.inventory,
      name: item.name,
      id: item.id,
      draggable: true,
      type: 'inventoryItem',
    });
    InventoryItem.show();
    this.items[item.id] = InventoryItem;
    this.addEventListeners(InventoryItem);

    return InventoryItem;
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

  addEventListeners(inventoryItem) {
    // inventoryItem.on('click', this.handleRemove.bind(this));
    inventoryItem.on('dragOver', this.handleDragOver.bind(this));
    inventoryItem.on('dragEnd', this.handleDragEnd.bind(this));
    inventoryItem.on('drop', this.handleDrop.bind(this));
    return inventoryItem;
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
}

export default InventoryView;
