import { EventEmitter } from 'events';

class ItemModel extends EventEmitter {
  constructor(name, text = '', quantity = 1) {
    super();
    this.name = name;
    this.itemQuantity = quantity;
    this.attributes = {};
    this.text = text;
  }

  get itemName() {
    return this.name;
  }

  set itemName(name) {
    this.name = name;
    this.emit('itemChanged');
  }

  get itemQuantity() {
    return this.quantity;
  }

  set itemQuantity(quantity) {
    this.quantity = quantity > 0 ? quantity : 1;
    this.emit('itemChanged');
  }

  setText(t) {
    this.text = String(t);
  }

  getText() {
    return this.text;
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
    this.emit('itemChanged');
  }

  getAttribute(name) {
    if ({}.hasOwnProperty.call(this.attributes, name)) {
      return this.attributes[name];
    }
    return undefined;
  }

  getAttributes() {
    return this.attributes;
  }

  addClass(cl) {
    if ({}.hasOwnProperty.call(this.attributes, 'class')) {
      const classes = this.attributes.class.split(' ');
      if (!classes.includes(cl)) {
        classes.push(cl);
      }
      this.attributes.class = classes.join(' ');
    } else {
      this.attributes.class = String(cl);
    }
    this.emit('itemChanged');
  }

  removeClass(cl) {
    if ({}.hasOwnProperty.call(this.attributes, 'class')) {
      const classes = this.attributes.class.split(' ');
      classes.filter(val => {
        return val !== cl;
      });
      this.attributes.class = classes.join(' ');
      this.emit('itemChanged');
    }
  }

  addSome(n = 1) {
    this.quantity += n;
    this.emit('itemChanged');
  }

  getSome(n = 1) {
    if (this.quantity >= n) {
      this.quantity -= n;
      this.emit('itemChanged');
      return this.quantity;
    }
    return -1;
  }
}

export default ItemModel;
