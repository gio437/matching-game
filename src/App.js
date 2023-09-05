import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
