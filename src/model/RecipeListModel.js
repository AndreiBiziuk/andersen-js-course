import { EventEmitter, empty } from '../helper/helpers';

class RecipeListModel extends EventEmitter {
  constructor(items = []) {
    super();

    this.items = items;
  }

  getItem(id) {
    return this.items.find(item => item.id === id);
  }

  addItem(item) {
    let r = null;
    let result = true;
    this.items.forEach(t => {
      if (t.name === item.name) result = false;
    });

    if (result) {
      this.items.push(item);
      this.emit('change', this.items);
      r = item;
    } else {
      this.emit('duplicate', item.name);
    }
    return r;
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

  checkrecipes(items) {
    let result = empty;
    let correct = true;
    this.items.forEach(item => {
      correct = true;
      item.recipe.forEach((name, id) => {
        if (name !== items[id].name) {
          correct = false;
        }
      });
      if (correct) result = item.name;
    });
    return result;
  }
}

export default RecipeListModel;
