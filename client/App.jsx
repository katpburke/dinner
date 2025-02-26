import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import Day from './DayBox.jsx';
import RecipeBox from './RecipeBox.jsx';
import ShoppingList from './ShoppingList.jsx';

function App() {
  console.log('booted up!');
  const [dispRecipes, recipeChange] = useState(false);
  const [dispList, listChange] = useState(false);

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
    dayBoxes.push(<Day dayName={day} />);
  }

  console.log('dayboxes populated, loading app');
  return (
    <div>
      <h1>What's For Dinner?</h1>
      <div className='container'>{dayBoxes}</div>
      <div className='buffer'></div>
      {!dispRecipes && !dispList && (
        <div>
          <div>
            <button onClick={() => recipeChange(true)}>Recipes</button>
          </div>
          <div>
            <button>Shopping List</button>
          </div>
        </div>
      )}
      {dispRecipes && <RecipeBox stateChange={recipeChange} />}
      {dispList && <ShoppingList stateChange={listChange} />}
    </div>
  );
}

export default App;
