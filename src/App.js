import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef, createRef } from 'react';
import Belgian from "./pictures/belgian.png";
// import Tibetan from './pictures/tibetan.png';
// import Otterhound from './pictures/otterhound.png';
import Norwegian from './pictures/norwegian.png';
import Briard from './pictures/briard.png';
import React from 'react';

function App() {
  let [picturesArray, setPicturesArray] = useState([1, 0, 2]); // correct pattern of numbers
  let [description, setDescription] = useState(-1);
  let [fillArray, setFillArray] = useState([]);

  function clickDescription(e) {
    // make sure u can
    const clickedBox = parseInt(e.target.dataset.badges);
    setDescription(prev => prev = clickedBox);

    const inputSquare = document.querySelectorAll('.inputParent');
    inputSquare.forEach(box => {
      box.style.backgroundColor = 'yellow';
    })
  }

  function placeDescription(e) {
    const clickedFillBox = parseInt(e.target.dataset.badges);
    // add the description to its appropriate box => 
    if (description > -1) {
      console.log(description);
      console.log(clickedFillBox);
      fillArray.splice(clickedFillBox, 1, description);
      endGame();
    }
    console.log(fillArray);
    const inputSquare = document.querySelectorAll('.inputParent');
      inputSquare.forEach(box => {
        box.style.backgroundColor = 'darkblue';
      })
  }

  // add src and description to add new cards
    const sections = [
      {
        src: '/static/media/belgian.4f1cecef3601af8210eb.png',
        description: "A breed of medium-sized herding dog from Belgium. While predominantly considered a single breed, it is bred in four distinct varieties based on coat type and colour; the long-haired black Groenendael, the rough-haired fawn Laekenois, the short-haired fawn Malinois, and the long-haired fawn Tervuren. In the United States, the American Kennel Club considers the four varieties to be separate breeds." 
      },
      {
        src: '/static/media/norwegian.8845dd09d6395748df6a.png', // test before adding more 
        description: "A dog breed of the Spitz type that originates from Norway. Its name is a compound noun composed of the elements lunde, meaning puffin (Norwegian lunde, puffin, or lundefugl, puffin bird), and hund, meaning dog. The breed was originally developed for the hunting of puffins and their eggs on inaccessible nesting places in caves and on cliffs. The breed was at the brink of extinction in the 1960s and preservation efforts have since been underway."
      },
      {
        src: '/static/media/briard.5c731a35a9435a6b6a8b.png',
        description: "a French breed of large shepherd dog, traditionally used both for herding sheep and to defend them. It was first shown at the first Paris dog show, in 1863; the first Briard to be registered in the Livre des Origines Francaises, the national stud-book, was Sans Gene in 1885. It was in the past also known as the Chien de Berger francais de Plaine."
      }
    ];

  
    // randomize game cards
  function createImages() { 
      for (let i = 0; i < sections.length; i++) {
        console.log(sections[i].src);
        let eachItem = sections[i].src;
        const picParent = document.querySelector('.picParent');

        createFillBoxes(i);

        const newPic = document.createElement('img');
        newPic.src = eachItem;
        console.log(newPic)
        newPic.classList.add('picBox');
        newPic.id = 'whiteBox';
        picParent.appendChild(newPic);
      }
  }
   setTimeout(createImages, 200);

   function createFillBoxes(i) {
    const fillBoxes = document.querySelector('.inputParent');
    const newFillBox = document.createElement('div');
    newFillBox.id = 'whiteBox';
    newFillBox.setAttribute('data-badges', i);
    fillBoxes.append(newFillBox);
    createDescriptions(i);
   }

   function createDescriptions(i) {
      const descriptionText = sections[i].description;
      const descriptionParent = document.querySelector('.descriptionParent');
      const descriptionBox = document.createElement('div');
      descriptionBox.innerHTML = descriptionText;
      descriptionBox.id = 'whiteBox';
      descriptionBox.setAttribute('data-badges', i);
      descriptionParent.append(descriptionBox);
   }

    function endGame() {
      if (picturesArray.every((value, index) => value === fillArray[index])) {
        // useEffect?
        setDescription(prev => prev = -1);
        console.log('end');
      }
  } 

  // push description id from pic to the description array

  return (
    <div className="App">
      <h1>Matching Game</h1>
      <div className='picParent'>
      </div>
      <div className='inputParent' onClick={(e) => placeDescription(e)}>
      </div>
      <div className='descriptionParent' onClick={(e) => clickDescription(e)}>
      </div>
    </div>
  );
}

export default App;
