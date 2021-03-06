const chalk = require('chalk');
const mongoose = require('mongoose');
const Recipe = require('@modelspath/recipe-model');
const Inventory = require('@modelspath/ingredients-model');

exports.get_recipe_ingredients_byname = (req, res) => {
    const query = {
        recipeName: req.body.recipeName.toLowerCase()
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
                    message: "recipe not available",
                    statusCode: "204"
                });
            } else {
                return res.status(200).json({
                    statusCode: "200",
                    recipe: result.recipeName,
                    recipeIngredients: result.recipeIngredients
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


exports.get_ingredients_byname = (req, res, err) => {

    const nameValue = req.body.name.toLowerCase()
    try {
        Inventory.find()
            .exec()
            .then(result => {
                const responseTable = result[0].ingredients
                const responseVal = responseTable.filter((item) => {
                    return item.name == nameValue;
                });
                if (responseVal.length < 1) {
                    return res.status(200).json({
                        statusCode: "204",
                        message: "ingredient not available",
                    });
                } else {
                    res.status(200).json({
                        statusCode: "200",
                        responseVal
                    });
                }
            }).catch(err => {
                console.log(chalk.bold.red(err));
                res.status(500).json({
                    error: err
                })
            });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: `${err.message}`,
            success: false
        });
    }
}

exports.get_recipe_ingredients = (req, res) => {
    Inventory.find()
        .exec()
        .then(result => {
            const responseTable = result[0].ingredients
            const responseVal = responseTable.map((item) => {
                return ({
                    name: item.name,
                    available: 'yes'
                });
            })
            res.status(200).json({
                statusCode: "200",
                ingredients: responseVal
            });
        }).catch(err => {
            console.log(chalk.bold.red(err));
            res.status(500).json({
                error: err
            })
        });
}
