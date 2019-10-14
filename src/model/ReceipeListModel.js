import { EventEmitter, empty } from '../helper/helpers';

class ReceipeModel extends EventEmitter {
  constructor(items = []) {
    super();

    this.items = items;
  }

  getItem(id) {
    return this.items.find(item => item.id === id);
  }

  addItem(item) {
    this.items.push(item);
    this.emit('change', this.items);
    return item;
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

  checkReceipes(items) {
    let result = empty;
    let correct = true;
    this.items.forEach(item => {
      correct = true;
      item.receipe.forEach((name, id) => {
        if (name !== items[id].name) {
          correct = false;
        }
      });
      if (correct) result = item.name;
    });
    return result;
  }
}

export default ReceipeModel;
