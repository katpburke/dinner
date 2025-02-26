import { Pantry } from '../models/dinnerModels.js';

const pantryController = {};

pantryController.update = async (req, res, next) => {
  let itemName = req.body.item;
  let onHand = req.body.amount;

  console.log('inside Pantry Controller');
  console.log('item: ', itemName);
  console.log('amount: ', onHand);

  const preExists = await Pantry.findOneAndUpdate(
    { item: itemName },
    { amount: onHand },
    { new: true }
  );
  if (!preExists) {
    const newItem = await new Pantry({ item: itemName, amount: onHand });
    newItem.save();
    res.locals.item = newItem;
  } else {
    res.locals.item = preExists;
  }
  return next();
};

pantryController.get = async (req, res, next) => {
  const pantry = await Pantry.find();
  const pantryObj = {};
  pantry.map((el) => {
    pantryObj[el.item] = el.amount;
  });
  res.locals.pantry = pantryObj;
  return next();
};

export default pantryController;
