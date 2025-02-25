// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import Day from './DayBox.jsx';

function App() {
  console.log('booted up!');

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

  // fetch(url)
  //   .then((response) => response.json())
  //   .then((dbData) => {
  //     console.log('data here! ', dbData);
  //     for (const day of days) {
  //       for (let i = 0; i < dbData.length; i++) {
  //         if (dbData[i].day === day) {
  //           dayBoxes.push(
  //             <Day
  //               dayName={day}
  //               dish={dbData.dish}
  //               ingredients={dbData.ingredients}
  //             />
  //           );
  //         }
  //       }
  //     }
  //     console.log('dayboxes populated, loading app');
  //     return (
  //       <div>
  //         <h1>What's For Dinner?</h1>
  //         <div className='container'>{dayBoxes}</div>
  //       </div>
  //     );
  //   });

  for (const day of days) {
    dayBoxes.push(<Day dayName={day} />);
  }

  console.log('dayboxes populated, loading app');
  return (
    <div>
      <h1>What's For Dinner?</h1>
      <div className='container'>{dayBoxes}</div>
    </div>
  );
}

export default App;
