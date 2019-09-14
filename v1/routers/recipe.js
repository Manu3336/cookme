const express = require('express');
const router = express.Router();

const recipe_controller = require('../controllers/recipe');
const ingredients_controller = require('../controllers/inventory');
const ingredients_check = require('../controllers/checkInventory');



//POST Method for recipe
router.post('/recipe',  recipe_controller.post_recipe);
//GET method  for recipe
router.get('/recipe',  recipe_controller.get_recipe);

router.post('/inventory',  ingredients_controller.post_inventory);
router.post('/ingredients',  ingredients_controller.get_recipe_ingredients_byname);
router.post('/ingredientname',  ingredients_controller.get_ingredients_byname);
router.get('/ingredients',  ingredients_controller.get_recipe_ingredients);

router.post('/checkInventory',  ingredients_check.check_ingredients_byname);


module.exports = router;