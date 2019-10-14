import './styles/main.css';
import { empty } from './helper/helpers';
import InventoryModel from './model/InventoryModel';
import InventoryView from './view/InventoryView';
import InventoryController from './controller/InventoryController';
import CraftTableModel from './model/CraftTableModel';
import CraftTableView from './view/CraftTableView';
import CraftTableController from './controller/CraftTableController';
import ReceipeListModel from './model/ReceipeListModel';
import ReceipeListView from './view/ReceipeListView';
import ReceipeListController from './controller/ReceipeListController';

const inventoryModel = new InventoryModel([]);
const inventoryView = new InventoryView();
const inventoryController = new InventoryController(inventoryModel, inventoryView);

const craftTableModel = new CraftTableModel([]);
const craftTableView = new CraftTableView();
const craftTableController = new CraftTableController(craftTableModel, craftTableView);

const receipeListModel = new ReceipeListModel([]);
const receipeListView = new ReceipeListView();
const receipeListController = new ReceipeListController(receipeListModel, receipeListView);

craftTableController.connectReceipeList(receipeListController);
receipeListController.connectCraftTable(craftTableController);
inventoryController.connectCraftTable(craftTableController);

window.addEventListener('load', () => {
  inventoryController.addItem('Wood');
  inventoryController.addItem('Stone');
  inventoryController.addItem('Steel');
  inventoryController.addItem('Water');

  craftTableController.addItem(empty);
  craftTableController.addItem(empty);
  craftTableController.addItem(empty);
  craftTableController.addItem(empty);
  craftTableController.addItem(empty);
  craftTableController.addItem(empty);
  craftTableController.addItem(empty);
  craftTableController.addItem(empty);
  craftTableController.addItem(empty);

  receipeListController.addItem('Stone hammer', [
    'Stone',
    'Stone',
    'Stone',
    empty,
    'Wood',
    empty,
    empty,
    'Wood',
    empty,
  ]);

  receipeListController.addItem('Steel sword', [
    empty,
    empty,
    'Steel',
    empty,
    'Steel',
    empty,
    'Wood',
    empty,
    empty,
  ]);
});
