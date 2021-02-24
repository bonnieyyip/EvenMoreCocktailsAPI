const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "./cocktails.json");

//GET Method
const getRecipe = async (req, res, next) => {
    try {
        const data = fs.readFileSync(filePath); //read file
        const recipes = JSON.parse(data); //parse JSON into object
        const recipeExist = recipes.find(
            (recipe) => recipe.id === Number(req.params.id) //if you can find the recipe id
        );
        if (!recipeExist) {
            const err = new Error("Recipe not found");
            err.status = 404;
            throw err;
        }
        res.json(recipeExist); //show recipe that was found
    } catch (e) {
        next(e);
    }
};
router.route("/api/v1/cocktails/:id").get(getRecipe);

//POST Method
const createRecipe = async (req, res, next) => {
    try {
        const data = fs.readFileSync(filePath);
        const recipes = JSON.parse(data);
        const newRecipe = { //create new recipe
            id: req.body.id,
            title: req.body.title,
            instructions: req.body.instructions,
        };
        recipes.push(newRecipe); //add recipe to json object
        fs.writeFileSync(filePath, JSON.stringify(recipes)); //write it back to file
        res.status(201).json(newRecipe);
    } catch (e) {
        next(e);
    }
};
router.route("/api/v1/cocktails").post(createRecipe);

//PUT Method
const updateRecipe = async (req, res, next) => {
    try {
        const data = fs.readFileSync(filePath);
        const recipes = JSON.parse(data);
        const recipeExist = recipes.find(
            (recipe) => recipe.id === Number(req.params.id) //look for recipe
        );
        if (!recipeExist) {
            const err = new Error("Recipe not found");
            err.status = 404;
            throw err;
        }
        const newRecipeData = { 
            id: req.body.id,
            wins: req.body.wins,
            losses: req.body.losses,
            points_scored: req.body.points_scored,
        };
        const newRecipe = recipes.map((recipe) => {
            if (recipe.id === Number(req.params.id)) {
                return newRecipeData; //update recipe
            } else {
                return recipe;
            }
        });
        fs.writeFileSync(filePath, JSON.stringify(newRecipe));
        res.status(200).json(newRecipeData);
    } catch (e) {
        next(e);
    }
};
router.route("/api/v1/cocktails/:id").get(getRecipe).put(updateRecipe);

//DELETE Method
const deleteRecipe = async (req, res, next) => {
    try {
        const data = fs.readFileSync(filePath);
        const recipes = JSON.parse(data);
        const recipeExist = recipes.find(
            (recipe) => recipe.id === Number(req.params.id) //look for player
        );
        if (!recipeExist) {
            const err = new Error("Recipe not found");
            err.status = 404;
            throw err;
        }
        const newRecipe = recipes
            .map((recipe) => {
                if (recipe.id === Number(req.params.id)) {
                    return null;
                } else {
                    return recipe;
                }
            })
            .filter((recipe) => recipe !== null);
        fs.writeFileSync(filePath, JSON.stringify(newRecipe));
        res.status(200).end();
    } catch (e) {
        next(e);
    }
};

router.route("/api/v1/cocktails/:id").get(getRecipe).put(updateRecipe).delete(deleteRecipe);

module.exports = router;