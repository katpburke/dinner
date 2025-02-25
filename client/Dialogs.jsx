import { useState } from 'react';
const url = 'http://localhost:3000/dinner';
function AddDish({
  dayName,
  updateDialogState,
  updateDish,
  updateIngredients,
}) {
  //   const ingrList = [];
  const saveData = { day: dayName, dish: '', ingredients: [] };
  const [fields, setFields] = useState([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
    { id: 4, value: '' },
    { id: 5, value: '' },
  ]);
  const [index, addIndex] = useState(6);
  const [dishName, updateName] = useState('');

  const handleFieldChange = (id, value) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleAddField = () => {
    setFields([...fields, { id: index, value: '' }]);
    addIndex(index + 1);
  };

  const handleSave = () => {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].value !== '') saveData.ingredients.push(fields[i].value);
    }
    saveData.dish = dishName;

    updateDish(saveData.dish);
    updateIngredients(saveData.ingredients);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saveData),
    })
      .then((data) => {
        console.log('Data posted successfully: ', data.json);
        updateDialogState(false);
      })
      .catch((error) => {
        console.log('Error in posting data: ', error);
        updateDialogState(false);
      });
  };

  const handleDishChange = (value) => {
    updateName(value);
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Dish Name'
        value={dishName}
        onChange={(e) => handleDishChange(e.target.value)}
      />
      {fields.map((field) => (
        <div key={field.id}>
          {console.log('field ', field.id, ': ', field.value)}
          <input
            type='text'
            value={field.value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        </div>
      ))}
      <button className='moreIngr' onClick={handleAddField}>
        Add Ingredients
      </button>
      <button className='saveButton' onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

function DispIngr({ ingredients, updateDialogState }) {
  return (
    <div>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={10 + i}>{ingredient}</li>
        ))}
      </ul>
      <button onClick={() => updateDialogState(false)}>Close</button>
    </div>
  );
}

export { AddDish, DispIngr };
