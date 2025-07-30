const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();

const Recipe = require("./models/Recipe.model.js")

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res, next) => {
    const newRecipe = req.body;

    Recipe.create(newRecipe)
        .then((recipeFromDB) => {
            res.status(201).json(recipeFromDB)
        })
        .catch((error) => {
            console.error("Error creating a new Recipe in the DB..", error)
            res.status(500).json({ error: "Failed to creat a new Recipe" })
        })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
    Recipe.find({})
        .then((recipes) => {
            console.log("Retrieved recipes", recipes);
            res.json(recipes)
        })
        .catch((error) => {
            console.error("Error while retrieving recipes", error)
            res.status(500).send({ error: "Failed to retrieve recipes" })
        })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", (req, res, next) => {
    const { recipeId } = req.params

    Recipe.findById(recipeId)
        .then((recipeFromDB) => {
            res.json(recipeFromDB)
        })
        .catch((error) => {
            console.error("Error while retrieving recipe", error)
            res.status(500).send({ error: "Failed to retrieve recipe" })
        })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", (req, res, next) => {
    const { recipeId } = req.params
    const newDetails = req.body

    Recipe.findByIdAndUpdate(recipeId, newDetails, {new: true})
        .then((recipeFromDB) => {
            res.json(recipeFromDB)
        })
        .catch((error) => {
            console.error("Error updating recipe", error)
            res.status(500).send({ error: "Failed to update recipe" })
        })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:recipeId", (req, res, next)=>{

    const { recipeId } = req.params

    Recipe.findByIdAndDelete(recipeId)
    .then((response) =>{
        res.sendStatus(204)
    })
     .catch((error)=>{
            console.error("Error while deleting recipe", error)
            res.status(500).send({error: "Failed to delete recipe"})
        })
})

// Start the server
app.listen(3007, () => console.log('My first app listening on port 3007!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
