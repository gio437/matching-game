import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Belgian from "./pictures/belgian.png";

function App() {
  let [picturesArray, setPicturesArray] = useState([1, 2, 3]);
  let [descriptionArray, setDescriptionArray] = useState([]);

  function endGame() {
    if (descriptionArray.length === 3) {
      setDescriptionArray(prev => prev = []);
    }
  }

  // push description id from pic to the description array

  return (
    <div className="App">
      <h1>Matching Game</h1>
      <div className='picParent'>
        <img className='picBox' src={Belgian}></img>
        <img className='picBox' ></img>
        <img className='picBox' ></img>
      </div>
      <div className='descriptionParent'>
        <div className='descriptionBox'></div>
        <div className='descriptionBox'></div>
        <div className='descriptionBox'></div>

      </div>
    </div>
  );
}

export default App;
