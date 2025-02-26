import mongoose from 'mongoose';

const MONGO_URI =
  'mongodb+srv://katherinepackertburke:SovietFever73@cluster0.u2l9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'dinner',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const dinnerSchema = new Schema({
  day: String,
  dish: String,
  ingredients: [String],
});

const Dinner = mongoose.model('dinner', dinnerSchema);

const recipeSchema = new Schema({
  name: String,
  ingredients: [String],
});

const Recipe = mongoose.model('recipe', recipeSchema);

export { Dinner, Recipe };
