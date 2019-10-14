import { EventEmitter } from '../helper/helpers';
import ItemView from './ItemView';

class ReceipeListView extends EventEmitter {
  constructor() {
    super();
    this.items = [];
    this.receipeList = document.getElementById('receipes-container');
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
    const ReceipeItem = new ItemView({
      class: 'receipes-item',
      parent: this.receipeList,
      name: item.name,
      id: item.id,
      draggable: false,
      type: 'receipeItem',
    });
    ReceipeItem.show();
    this.items[item.id] = ReceipeItem;
    this.addEventListeners(ReceipeItem);

    return ReceipeItem;
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

  addEventListeners(ReceipeItem) {
    // ReceipeItem.on('click', this.handleRemove.bind(this));
    ReceipeItem.on('dragOver', this.handleDragOver.bind(this));
    ReceipeItem.on('dragEnd', this.handleDragEnd.bind(this));
    ReceipeItem.on('drop', this.handleDrop.bind(this));
    return ReceipeItem;
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

export default ReceipeListView;
