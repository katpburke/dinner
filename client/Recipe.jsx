import { useState } from 'react';

function Recipe({ name, ingredients }) {
  const [selector, updateSelector] = useState('');
  const url = 'http://localhost:3000/dinner';
  function commit() {
    //how to do this without the same props in daybox?
    //update the database and then refresh in the daybox end?
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
        {/* finish adding functionality here */}
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
        <button onclick={commit}>Add</button>
      </div>
    </div>
  );
}

export default Recipe;
