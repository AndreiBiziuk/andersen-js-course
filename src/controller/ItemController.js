import { EventEmitter } from 'events';

export default class ItemController extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;
  }
}
