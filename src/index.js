import './styles/main.css';

import ItemModel from './model/ItemModel';
import ItemView from './view/ItemView';
// import * as IC from './controller/ItemController';

function addInventoryItem(name, text, quantity) {
  const inventory = document.getElementById('inventory-container');
  const invItemModel = new ItemModel(name, text, quantity);
  const invItemView = new ItemView(invItemModel, { parent: inventory });
  // const invItemController = new IC.ItemController(invItemModel, invItemView);
  invItemModel.addClass('inventory-item');
  invItemView.show();
}

document.getElementById('addInventoryItem').addEventListener('click', () => {
  addInventoryItem('elem', 'test');
});

window.addEventListener('load', () => {
  addInventoryItem('wood', 'Wood', 25);
  addInventoryItem('stone', 'Stone', 4);
  addInventoryItem('iron', 'Iron', 1);
  addInventoryItem('water', 'Water', 7);
});
