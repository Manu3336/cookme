const express = require('express');
const router = express.Router();

const recipe_controller = require('@controllerspath/recipe');
const ingredients_controller = require('@controllerspath/inventory');
const ingredients_check = require('@controllerspath/checkInventory');



//Recipe routers
router.post('/recipe', recipe_controller.post_recipe);
router.get('/recipe', recipe_controller.get_recipe);

//Ingredients routers
router.post('/ingredients', ingredients_controller.get_recipe_ingredients_byname);
router.post('/ingredientname', ingredients_controller.get_ingredients_byname);
router.get('/ingredients', ingredients_controller.get_recipe_ingredients);

//Inventory routers
router.post('/checkInventory', ingredients_check.check_ingredients_byname);


module.exports = router;