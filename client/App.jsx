import { useEffect, useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import Day from './DayBox.jsx';
import RecipeBox from './RecipeBox.jsx';
import ShoppingList from './ShoppingList.jsx';
import Pantry from './Pantry.jsx';

function App() {
  console.log('booted up!');
  const [dispRecipes, recipeChange] = useState(false);
  const [dispList, listChange] = useState(false);
  const [dispPantry, pantryChange] = useState(false);
  const [refreshCount, refreshChange] = useState(0);
  const [pantryList, updatePantry] = useState({});
  const urlPantry = 'http://localhost:3000/pantry';

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dayBoxes = [];

  for (const day of days) {
    dayBoxes.push(<Day dayName={day} refresh={refreshCount} />);
  }

  useEffect(() => {
    fetch(urlPantry)
      .then((response) => response.json())
      .then((data) => updatePantry(data));
  }, []);

  console.log('dayboxes populated, loading app');
  return (
    <div>
      <h1>What's For Dinner?</h1>
      <div className='container'>{dayBoxes}</div>
      <div className='buffer'></div>
      {!dispRecipes && !dispList && !dispPantry && (
        <div>
          <div>
            <button onClick={() => recipeChange(true)}>Recipes</button>
          </div>
          <div>
            <button onClick={() => listChange(true)}>Shopping List</button>
          </div>
          <div>
            <button onClick={() => pantryChange(true)}>Pantry</button>
          </div>
        </div>
      )}
      {dispRecipes && (
        <RecipeBox stateChange={recipeChange} refreshChange={refreshChange} />
      )}
      {dispList && (
        <ShoppingList
          stateChange={listChange}
          updatePantry={updatePantry}
          pantryList={pantryList}
        />
      )}
      {dispPantry && (
        <Pantry
          pantryList={pantryList}
          stateChange={pantryChange}
          refreshChange={refreshChange}
        />
      )}
    </div>
  );
}

export default App;
