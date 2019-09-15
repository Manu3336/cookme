const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    recipeName: {
        type: String,
        required: true,
        unique: true
    },
    recipeDetails: {
        type: String,
        required: true
    },
    recipeIngredients: [{
        name: String
    }]
});

module.exports = mongoose.model('Recipe', recipeSchema);
