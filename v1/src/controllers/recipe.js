const mongoose = require('mongoose');
const chalk = require('chalk');
const Recipe = require('@modelspath/recipe-model');

exports.post_recipe = (req, res) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        recipeName: req.body.recipeName.toLowerCase(),
        recipeDetails: req.body.recipeDetails,
        recipeIngredients: req.body.recipeIngredients
    });

    Recipe.findOne({
        recipeName: req.body.recipeName.toLowerCase()
    }).then((existingrecipeName) => {
        if (existingrecipeName) {
            console.log(chalk.bold.red(`existing recipeName ${existingrecipeName}`))
            return res.status(409).json({
                message: 'Recipe Name already exist',
                statusCode: "409"
            });
        } else {
            recipe.save().then(result => {
                res.status(201).json({
                    message: 'recipe added!!!',
                    respone: {
                        id: result._id,
                        recipeName: result.recipeName,
                        recipeDetails: result.recipeDetails,
                        recipeIngredients: result.recipeIngredients
                    }
                });
            }).catch(err => {
                console.log(chalk.bold.red(err));
                res.status(500).json({
                    error: err
                });
            });
        }
    });
}

exports.get_recipe = (req, res) => {
    Recipe.find()
        .exec()
        .then(result => {
            const count = result.length
            res.status(200).json({
                count: count,
                recipe: result
            });
        }).catch(err => {
            console.log(chalk.bold.red(err));
            res.status(500).json({
                error: err
            })
        });
}
