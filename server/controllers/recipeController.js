import { Recipe } from '../models/dinnerModels.js';

const recipeController = {};

recipeController.getRecipes = (req, res, next) => {
  return next();
};

recipeController.getRecipes = async (req, res, next) => {
  //{ $all: ["sushi", "sashimi"] } }
  let recipes;
  if (req.params.name) {
    let searchName = req.params.name;
    recipes = await Recipe.find({ ingredients: searchName });
  } else {
    recipes = await Recipe.find();
  }
  console.log('here are the recipes on the server end: ', recipes);
  res.locals.recipes = recipes;
  return next();
};

recipeController.newRecipe = async (req, res, next) => {
  const dishName = req.body.dish;
  if (dishName === '') return next();
  const ingredientsRaw = req.body.ingredients;
  const ingredientsList = ingredientsRaw.map((ingredient) =>
    ingredient.toLowerCase()
  );

  const newRec = new Recipe({ name: dishName, ingredients: ingredientsList });

  const preExists = await Recipe.findOne({ name: dishName });
  if (preExists) {
    recipeController.updateRecipe(req, res, next);
  } else {
    newRec.save();
    return next();
  }
};

recipeController.updateRecipe = async (req, res, next) => {
  const dishName = req.body.dish;
  const ingredientsList = req.body.ingredients;

  const updatedRecipe = await Recipe.findOneAndUpdate(
    { name: dishName },
    { ingredients: ingredientsList },
    { new: true }
  );

  res.locals.updatedRecipe = updatedRecipe;
  return next();
};

export default recipeController;
