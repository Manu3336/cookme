const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ingredients: [{
        name: String,
    }]
});

module.exports = mongoose.model('Inventory', ingredientSchema);
