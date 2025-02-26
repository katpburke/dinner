import { useState, useEffect } from 'react';
import Recipe from './Recipe.jsx';

function RecipeBox({ stateChange }) {
  const [displayed, displayChange] = useState(false);
  const [recipes, loadRecipes] = useState([]);
  const [seeRecipes, updateVisibleRecipes] = useState([]);
  const [searchName, updateSearch] = useState('');
  let url = 'http://localhost:3000/recipes';

  let results = [];

  function handleSearch(name) {
    url += `/${name.toLowerCase()}`;
    console.log('new url: ', url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        loadRecipes(data);
        displayChange(true);
      });
  }

  function handleAll() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        loadRecipes(data);
        displayChange(true);
      });
  }

  function handleUpdateName(value) {
    updateSearch(value);
  }

  useEffect(() => {
    results = [];
    console.log('here are the recipes boss: ', recipes);
    for (const recipe of recipes) {
      if (recipe.name !== '') {
        results.push(
          <Recipe name={recipe.name} ingredients={recipe.ingredients} />
        );
      }
      displayChange(true);
      updateVisibleRecipes(results);
    }
  }, [recipes]);

  return (
    <div className='recipeBox'>
      {!displayed && (
        <div>
          <label htmlFor='ingredientInput'>
            What ingredient do you want to use?
          </label>
          <div>
            <input
              type='text'
              placeholder='tofu'
              value={searchName}
              onChange={(e) => handleUpdateName(e.target.value)}
            />
          </div>
          <div>
            <button onClick={() => handleSearch(searchName)}>Search</button>
            <button onClick={handleAll}>All Recipes</button>
            <button onClick={() => stateChange(false)}>Close</button>
          </div>
        </div>
      )}
      {displayed && (
        <div>
          <h4>Here's what I found:</h4>
          <div className='recipeDisplay'>{seeRecipes}</div>
          <button onClick={() => displayChange(false)}>Search Again</button>
          <button onClick={() => stateChange(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default RecipeBox;
