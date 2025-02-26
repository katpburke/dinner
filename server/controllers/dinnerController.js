import { Dinner } from '../models/dinnerModels.js';

const dinnerController = {};

dinnerController.getDinners = async (req, res, next) => {
  const dinners = await Dinner.find();
  res.locals.dinners = dinners;
  return next();
};

dinnerController.newDinner = async (req, res, next) => {
  console.log('here is your req body: ', req.body);
  const dayName = req.body.day;
  const dishName = req.body.dish;
  const ingredientsList = req.body.ingredients;

  const newDinner = new Dinner({
    day: dayName,
    dish: dishName,
    ingredients: ingredientsList,
  });
  console.log('here is your dinner:', newDinner);
  const preExists = await Dinner.findOne({ day: dayName });
  console.log('does this already exist?', preExists);
  if (preExists) {
    dinnerController.updateDinner(req, res, next);
  } else {
    newDinner.save();
    res.locals.new = newDinner;
    return next();
  }
};

dinnerController.updateDinner = async (req, res, next) => {
  const dayName = req.body.day;
  const dishName = req.body.dish;
  const ingredientsList = req.body.ingredients;

  const updatedDay = await Dinner.findOneAndUpdate(
    { day: dayName },
    { dish: dishName, ingredients: ingredientsList },
    { new: true }
  );

  res.locals.updates = updatedDay;
  return next();
};

export default dinnerController;
