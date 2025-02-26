import { useState } from 'react';

function Recipe({ name, ingredients, refreshChange }) {
  const [selector, updateSelector] = useState('');
  const url = 'http://localhost:3000/dinner';

  function commit() {
    //how to do this without the same props in daybox?
    //update the database and then refresh in the daybox end?
    fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        day: selector,
        dish: name,
        ingredients: ingredients,
      }),
    })
      .then(refreshChange((previous) => previous + 1))
      .then(setInterval(console.log('time comes for us all'), 1000))
      .then(() => {
        console.log('refreshing again!');
        refreshChange((previous) => previous + 1);
      });
  }

  return (
    <div className='recipe'>
      <div className='recipeName'>{name}</div>
      <ul>
        {ingredients.map((ingredient) => (
          <li>{ingredient}</li>
        ))}
      </ul>
      <div>
        <select
          name='addDay'
          id='addDay'
          onChange={(e) => updateSelector(e.target.value)}
        >
          <option value=''>Select Day</option>
          <option value='Sunday'>Sunday</option>
          <option value='Monday'>Monday</option>
          <option value='Tuesday'>Tuesday</option>
          <option value='Wednesday'>Wednesday</option>
          <option value='Thursday'>Thursday</option>
          <option value='Friday'>Friday</option>
          <option value='Saturday'>Saturday</option>
        </select>
        <button onClick={commit}>Add</button>
      </div>
    </div>
  );
}

export default Recipe;
