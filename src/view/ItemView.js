import { EventEmitter, createElement } from '../helper/helpers';

class ItemView extends EventEmitter {
  constructor(props) {
    super();
    this.parent = props.parent;
    this.item = createElement(
      'div',
      {
        className: props.class,
        'data-id': props.id,
        draggable: props.draggable,
        'data-name': props.name,
        'data-type': props.type,
      },
      props.name
    );

    this.item.addEventListener('click', this.handleClick.bind(this));
    this.item.addEventListener('dragstart', this.handleDragStart.bind(this));
    this.item.addEventListener('dragover', this.handleDragOver.bind(this));
    this.item.addEventListener('dragend', this.handleDragEnd.bind(this));
    this.item.addEventListener('drop', this.handleDrop.bind(this));
  }

  show() {
    this.parent.appendChild(this.item);
  }

  edit(props) {
    this.item.textContent = props.name;
  }

  remove() {
    this.parent.removeChild(this.item);
  }

  replace(item) {
    this.parent.replaceChild(this.item, item);
  }

  handleClick() {
    const id = this.item.getAttribute('data-id');
    this.emit('click', id);
  }

  handleDragStart(event) {
    const dt = event.dataTransfer;
    const id = this.item.getAttribute('data-id');
    const name = this.item.getAttribute('data-name');
    const type = this.item.getAttribute('data-type');

    dt.setData(`application/x.${type}`, name);
    dt.setData('text/plain', name);

    this.emit('dragStart', id);
  }

  handleDragOver(event) {
    const dt = event.dataTransfer;
    const id = this.item.getAttribute('data-id');

    event.preventDefault();
    dt.dropEffect = 'copy';

    this.emit('dragOver', { id, types: dt.types, name: dt.getData(dt.types[0]) });
  }

  handleDragEnd(event) {
    const dt = event.dataTransfer;
    const id = this.item.getAttribute('data-id');
    this.emit('dragEnd', { id, effect: dt.dropEffect, name: dt.getData(dt.types[0]) });
  }

  handleDrop(event) {
    const dt = event.dataTransfer;
    const id = this.item.getAttribute('data-id');
    this.emit('drop', { id, types: dt.types, name: dt.getData(dt.types[0]) });
  }
}

export default ItemView;
