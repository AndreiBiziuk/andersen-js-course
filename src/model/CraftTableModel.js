import { EventEmitter, empty } from '../helper/helpers';

class CraftTableModel extends EventEmitter {
  constructor(items = []) {
    super();

    this.items = items;
    this.result = { id: 'resultItem', name: empty };
  }

  getItem(id) {
    return this.items.find(item => item.id === id);
  }

  addItem(item) {
    this.items.push(item);
    this.emit('change', this.items);
    return item;
  }

  getResult() {
    return this.result;
  }

  setResult(data) {
    Object.keys(data).forEach(prop => {
      this.result[prop] = data[prop];
      return this.result[prop];
    });

    this.emit('changeResult', this.result);
    return this.result;
  }

  clearResult() {
    this.setResult({ name: empty });
    this.emit('changeResult', this.result);
  }

  updateItem(id, data) {
    const item = this.getItem(id);

    Object.keys(data).forEach(prop => {
      item[prop] = data[prop];
      return item[prop];
    });

    this.emit('change', this.items);

    return item;
  }

  removeItem(id) {
    const index = this.items.findIndex(item => item.id === id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.emit('change', this.items);
    }
  }

  clearItems() {
    this.items.forEach((item, index) => {
      this.items[index].name = empty;
    });
    this.emit('change', this.items);
    return this.items;
  }
}

export default CraftTableModel;
