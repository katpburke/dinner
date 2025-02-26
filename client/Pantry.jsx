import { useState } from 'react';
import RecipeBox from './RecipeBox.jsx';

function Pantry({ pantryList, stateChange, refreshChange }) {
  const [dispRecipe, updateDispRecipe] = useState(false);
  const [search, updateSearch] = useState('');
  const inStock = [];

  for (const item in pantryList) {
    if (pantryList[item] !== 'need') {
      inStock.push(item);
    }
  }

  function searchItem(el) {
    updateDispRecipe(true);
    updateSearch(el);
  }

  return (
    <div>
      {!dispRecipe && (
        <div>
          <h4>Here is what you have on hand:</h4>
          <div className='listBox'>
            {inStock.map((el) => (
              <button onClick={() => searchItem(el)}>{el}</button>
            ))}
          </div>
          <h5>Click any item to see related recipes.</h5>
          <button onClick={() => stateChange(false)}>Close</button>
        </div>
      )}

      {dispRecipe && (
        <RecipeBox
          stateChange={stateChange}
          refreshChange={refreshChange}
          passedFromPantry={search}
        />
      )}
    </div>
  );
}

export default Pantry;
