import { useState, useEffect } from 'react';
import { AddDish, DispIngr } from './Dialogs.jsx';

function Day({ dayName, dish, ingredients, refresh }) {
  const [dishDialog, newDish] = useState(false);
  const [ingrDialog, dispIngr] = useState(false);
  const [dishName, updateDish] = useState('');
  const [ingrList, updateIngredients] = useState(ingredients);
  const [method, updateMethod] = useState('');
  const url = 'http://localhost:3000/dinner';

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((dbData) => {
        console.log('data here! ', dbData);
        for (let i = 0; i < dbData.length; i++) {
          if (dbData[i].day === dayName) {
            updateDish(dbData[i].dish);
            updateIngredients(dbData[i].ingredients);
          }
        }
      });
  }, [refresh]);

  // useEffect(() => {
  //   if (weekData[dayName]) {
  //     updateDish(weekData[dayName].dish);
  //     updateIngredients(weekData[dayName].ingredients);
  //   }
  // }, [refresh]);

  function clearDay() {
    console.log('it is clear as day');
    updateDish('');
    updateIngredients([]);
    fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        day: dayName,
        dish: '',
        ingredients: [],
      }),
    })
      .then((data) => {
        console.log('Data patched successfully, ', data.json);
      })
      .catch((error) => {
        console.log('Error in patching data: ', error);
      });
  }

  return (
    <div className='dayBox'>
      {!dishDialog && (
        <div>
          <button className='addButton' onClick={() => newDish(true)}>
            +
          </button>
          <div className='day'>{dayName}</div>
          <div className='dish'>{dishName}</div>
          {!ingrDialog && (
            <div>
              <button
                className='displayIngredients'
                onClick={() => dispIngr(true)}
              >
                Ingredients
              </button>
              <button className='clearButton' onClick={clearDay}>
                Clear
              </button>
            </div>
          )}
          {ingrDialog && (
            <DispIngr ingredients={ingrList} updateDialogState={dispIngr} />
          )}
        </div>
      )}
      {dishDialog && (
        <AddDish
          dayName={dayName}
          updateDialogState={newDish}
          updateDish={updateDish}
          updateIngredients={updateIngredients}
        />
      )}
    </div>
  );
}

export default Day;
