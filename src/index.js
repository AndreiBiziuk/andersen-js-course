import './styles/main.css';
import { empty } from './helper/helpers';
import InventoryModel from './model/InventoryModel';
import InventoryView from './view/InventoryView';
import InventoryController from './controller/InventoryController';
import CraftTableModel from './model/CraftTableModel';
import CraftTableView from './view/CraftTableView';
import CraftTableController from './controller/CraftTableController';
import RecipeListModel from './model/RecipeListModel';
import RecipeListView from './view/RecipeListView';
import RecipeListController from './controller/RecipeListController';

const inventoryModel = new InventoryModel([]);
const inventoryView = new InventoryView();
const inventoryController = new InventoryController(inventoryModel, inventoryView);

const craftTableModel = new CraftTableModel([]);
const craftTableView = new CraftTableView();
const craftTableController = new CraftTableController(craftTableModel, craftTableView);

const recipeListModel = new RecipeListModel([]);
const recipeListView = new RecipeListView();
const recipeListController = new RecipeListController(recipeListModel, recipeListView);

craftTableController.connectRecipeList(recipeListController);
recipeListController.connectCraftTable(craftTableController);
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

  recipeListController.addItem('Stone hammer', [
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

  recipeListController.addItem('Steel sword', [
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
