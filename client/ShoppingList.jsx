import { useState, useEffect } from 'react';
const url = 'http://localhost:3000/dinner';

function ShoppingList({ stateChange }) {
  //get and display all ingredients needed
  const [displayList, updateDisplay] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((dbData) => {
        let data = [];
        for (let i = 0; i < dbData.length; i++) {
          data = data.concat(dbData[i].ingredients);
        }
        const shoppingList = new Set(data);
        console.log('shopping list here! ', data);
        updateDisplay(Array.from(shoppingList));
      });
  }, []);

  return (
    <div>
      <div>
        <h4>Here are the things you need to make dinner this week:</h4>
        <ul className='shoppingList'>
          {displayList.map((el) => (
            <li>{el}</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => stateChange(false)}>Close</button>
      </div>
    </div>
  );
}

export default ShoppingList;
