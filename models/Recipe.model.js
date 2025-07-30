const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    instruction: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Ched"]
    },
    ingredients: [String],
    image: String,
    duration: {
        type: Number,
        min: 0
    },
    isArchived: {
        type:Boolean,
        default:false
    },
    created: {
        type: Date,
        default: Date.now
    }

})

const Recipe = mongoose.model("Recipe", recipeSchema)

module.exports = Recipe