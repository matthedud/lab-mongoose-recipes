const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: { type: String, required: true },
  level: {
    type: String,
    validate: (value) => value === "Easy Peasy" || value === "Amateur Chef" || value === "UltraPro Chef",
    message: `C'est pas bien`
  },
  ingredients: [String],
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    validate: (value) =>
      value === "breakfast" ||
      value === "main_course" ||
      value === "soup" ||
      value === "snack" ||
      value === "drink" ||
      value === "dessert" ||
      value === "other",
      message: `C'est pas bien`
    },
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: new Date() },
})

const Recipe = mongoose.model("Recipe", recipeSchema)

module.exports = Recipe
