const Recipe = require('../models/recipe-model');
const Inventory = require('../models/ingredients-model');

const chalk = require('chalk');


exports.check_ingredients_byname = (req, res) => {
    const query = {
        recipeName: req.body.recipeName
    };
    try {
        Recipe.findOne(query, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: `${err}`,
                    statusCode: "500"
                });
            } else if (result == null) {
                return res.status(200).json({
                    message: "Recipe not available. Please add recipe with details and then check for the ingredients",
                    statusCode: "204"
                });
            } else {
                const recipeIngredients = result.recipeIngredients;
                const filtereingredients = recipeIngredients.map((item)=>{
                    return item.name;
                  })
                  Inventory.find()
                  .exec()
                  .then(response => {
                      const inventoryIngredients = response[0].ingredients;
                      const filterInventory = inventoryIngredients.map((item)=>{
                          return item.name;
                        })
                      const notAvailableIngredients = filtereingredients.filter(element => 
                        !filterInventory.includes(element));
                        res.status(200).json({
                            "Ingredients not available in the inventory ":
                            notAvailableIngredients,
                            "Instructions":"Please buy them and start you cooking"
                        });
                        console.log(notAvailableIngredients);
                  }).catch(err => {
                      console.log(chalk.bold.red(err));
                      res.status(500).json({
                          error: err
                      })
                  });
                  
            }
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: `${err.message}`,
            success: false
        });
    }
}