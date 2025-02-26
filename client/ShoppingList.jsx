import { useState, useEffect } from 'react';
const urlDinner = 'http://localhost:3000/dinner';
const urlPantry = 'http://localhost:3000/pantry';

function ShoppingList({ stateChange, updatePantry, pantryList }) {
  //get and display all ingredients needed
  const [displayList, updateDisplay] = useState([]);
  //   const [pantryList, updatePantry] = useState({});
  const inStock = {
    have: 'low',
    low: 'need',
    need: 'have',
  };

  useEffect(() => {
    fetch(urlDinner)
      .then((response) => response.json())
      .then((dbData) => {
        let data = [];
        let results = structuredClone(pantryList);
        for (let i = 0; i < dbData.length; i++) {
          data = data.concat(dbData[i].ingredients);
        }
        const shoppingList = Array.from(new Set(data));
        console.log('shopping list here! ', data);
        for (let i = 0; i < shoppingList.length; i++) {
          results[shoppingList[i]] = results[shoppingList[i]] || 'need';
        }
        updateDisplay(Array.from(shoppingList));
        updatePantry(results);
      });
  }, []);

  function cycleItem(item) {
    let newList = structuredClone(pantryList);
    newList[item] = inStock[newList[item]];
    updatePantry(newList);
  }

  function pantryUpdate() {
    for (const item in pantryList) {
      fetch(urlPantry, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: item, amount: pantryList[item] }),
      }).then(console.log(`${item} updated in pantry.`));
    }
    stateChange(false);
  }

  return (
    <div>
      <div>
        <h4>Here are the things you need to make dinner this week:</h4>
        <div className='listBox'>
          {displayList.map((el) => (
            <button onClick={() => cycleItem(el)}>
              {el} ({pantryList[el]})
            </button>
          ))}
        </div>
      </div>
      <div>
        <button onClick={pantryUpdate}>Update Pantry</button>
      </div>
      <div>
        <button onClick={() => stateChange(false)}>Close</button>
      </div>
    </div>
  );
}

export default ShoppingList;
