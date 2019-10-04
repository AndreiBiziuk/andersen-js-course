import { EventEmitter } from 'events';

export default class ItemView extends EventEmitter {
  constructor(model, elements) {
    super();
    this.model = model;
    this.elements = elements;
    this.rebuildItem();
    model.on('itemChanged', () => this.rebuildItem());
  }

  show() {
    if ({}.hasOwnProperty.call(this.elements, 'item') && this.elements.item !== undefined) {
      this.elements.item.outerHTML = this.item.outerHTML;
    } else if (
      {}.hasOwnProperty.call(this.elements, 'parent') &&
      this.elements.parent !== undefined
    ) {
      this.elements.parent.appendChild(this.item);
      this.elements.item = this.item;
    }
  }

  rebuildItem() {
    const item = document.createElement('div');
    const attrs = this.model.getAttributes();
    Object.keys(attrs).forEach(attr => {
      item.setAttribute(attr, attrs[attr]);
    });
    const quantity = this.model.itemQuantity;
    item.innerHTML = `${this.model.getText()}${quantity > 1 ? ` * ${quantity}` : ''}`;
    this.item = item;
  }
}
