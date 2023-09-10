import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef, createRef } from 'react';
import Belgian from "./pictures/belgian.png";
// import Tibetan from './pictures/tibetan.png';
// import Otterhound from './pictures/otterhound.png';
import Norwegian from './pictures/norwegian.png';
import Briard from './pictures/briard.png';

function App() {
  let [picturesArray, setPicturesArray] = useState([0, 1, 2]);
  let [descriptionArray, setDescriptionArray] = useState([]);

  function clickDescription(e) {
    // useEffect?
    const clickedBox = e.target.dataset.badges;
    setDescriptionArray(prev => prev.concat(clickedBox));
    console.log(descriptionArray);

    const inputSquare = document.querySelectorAll('.inputParent');
    inputSquare.forEach(box => {
      box.style.backgroundColor = 'yellow';
    })
  }

  function placeDescription() {
    const inputSquare = document.querySelectorAll('.inputParent');
      inputSquare.forEach(box => {
        box.style.backgroundColor = 'darkblue';
      })
  }

// add in new descriptions
  const descriptions = {
    norwegianDescription: "A small dog breed of the Spitz type that originates from Norway. Its name is a compound noun composed of the elements lunde, meaning puffin (Norwegian lunde, puffin, or lundefugl, puffin bird), and hund, meaning dog. The breed was originally developed for the hunting of puffins and their eggs on inaccessible nesting places in caves and on cliffs. The breed was at the brink of extinction in the 1960s and preservation efforts have since been underway.",
    belgianDescription: "A breed of medium-sized herding dog from Belgium. While predominantly considered a single breed, it is bred in four distinct varieties based on coat type and colour; the long-haired black Groenendael, the rough-haired fawn Laekenois, the short-haired fawn Malinois, and the long-haired fawn Tervuren. In the United States, the American Kennel Club considers the four varieties to be separate breeds.",
    briardDescription: "a French breed of large shepherd dog, traditionally used both for herding sheep and to defend them. It was first shown at the first Paris dog show, in 1863; the first Briard to be registered in the Livre des Origines Francaises, the national stud-book, was Sans Gene in 1885. It was in the past also known as the Chien de Berger francais de Plaine."
  }


    function endGame() {
      for (let i = 0; i <= 3; i++) {
        if (picturesArray[i] === descriptionArray[i]) {
        // useEffect?
        setDescriptionArray(prev => prev = []);
      }
    }
  } 

  // push description id from pic to the description array

  return (
    <div className="App">
      <h1>Matching Game</h1>
      <div className='picParent'>
        <img className='picBox' src={Belgian}></img>
        <img className='picBox' src={Norwegian}></img>
        <img className='picBox' src={Briard}></img>
      </div>
      <div className='inputParent' onClick={placeDescription}>
        <div className='inputBox' id='whiteBox'></div>
        <div className='inputBox' id='whiteBox'></div>
        <div className='inputBox' id='whiteBox'></div>
      </div>
      <div className='descriptionParent' onClick={(e) => clickDescription(e)}>
        <div className='descriptionBox' id='whiteBox'  data-badges='0'>{descriptions.norwegianDescription}</div>
        <div className='descriptionBox' id='whiteBox'  data-badges='1'>{descriptions.belgianDescription}</div>
        <div className='descriptionBox' id='whiteBox'  data-badges='2'>{descriptions.briardDescription}</div>
      </div>
    </div>
  );
}

export default App;
