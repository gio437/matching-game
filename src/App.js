import './App.css';
import {useEffect, useState} from 'react';
import Tibetan from './pictures/tibetan.png';
import React from 'react';
import Briard from './pictures/briard.png';
import Norwegian from './pictures/norwegian.png';
import Belgian from './pictures/belgian.png';
import { type } from '@testing-library/user-event/dist/type';

function App() {
  let [picturesArray] = useState([1, 0, 2]); // correct pattern of numbers
  let [description, setDescription] = useState(-1);
  let [fillArray, setFillArray] = useState([]);

console.log(Tibetan);
  // change to use effect
  function clickDescription(e) {
    const clickedBox = parseInt(e.target.dataset.badges);
    if (!fillArray.includes(clickedBox) && clickedBox > -1) {
      setDescription(prev => prev = clickedBox);
      console.log(description);

      const clickedDescription = document.querySelector('[data-badges="' + clickedBox + '"].descriptionBox');
      clickedDescription.style.borderColor = 'lightblue';
    }
  }

  function placeDescription(e) {
    const clickedDescription = document.querySelector('[data-badges="' + description + '"].descriptionBox');
    const clickedFillBox = parseInt(e.target.dataset.badges);
    const clickedElement = e.target;
    // add the description to its appropriate box => 
    // need to figure solution to adding description on top of another description, either put objects in specific index or change conditional
    if (description > -1 && fillArray[clickedFillBox] === undefined && clickedFillBox > -1 && clickedDescription.innerHTML !== '') {
      console.log("description = " + description);
      console.log(typeof clickedFillBox);
      console.log(clickedFillBox);
      const updatedFillArray = [...fillArray];
      // updatedFillArray.splice(clickedFillBox, 0, description);
      updatedFillArray[clickedFillBox] = description;
      setFillArray(updatedFillArray);
    
      const inputSquare = document.querySelectorAll('.inputParent');
        inputSquare.forEach(box => {
          box.style.backgroundColor = 'rgb(0, 107, 139)';
        })
      // displays description in clicked empty box
      clickedElement.innerHTML = clickedDescription.innerHTML;
      clickedDescription.innerHTML = '';
      clickedDescription.style.borderColor = 'rgb(0, 107, 139)'
    }
  }

  useEffect(() => {
    console.log(fillArray);
    endGame();
  }, [fillArray])

      // add src and description to add new cards
      // *for challenge mode, give the objects a challenge attribute, than make a function with a conditional statemant to only upload the objects marked challenge
    const sections = [
      // objects will be placed in order in the array, change order in the pictures array to match the objects
      // descriptions are switched around
      {
        src: '/matching-game/static/media/belgian.4f1cecef3601af8210eb.png',
        description:"Hailing from the Himalayas, known for its elegant long coat. Historically, a guardian and companion, it's intelligent and independent. Treasured for its unique Tibetan heritage."
      }, // fill the array with the description number? description number = 1
      {
        src: '/matching-game/static/media/tibetan.b8047b732bc4595bd38f.png', // test before adding more 
        description: "Originating from Europe, embodies strength and adaptability. Intelligent and versatile. Cherished for its unique qualities, a testament to Belgian origins."
      },
      {
        src: '/matching-game/static/media/briard.5c731a35a9435a6b6a8b.png',
        description: "A breed from France, known for strength and a distinctive double coat. Historically excelled in herding and guarding. Intelligent and loyal, cherished by those valuing unique qualities."
      }
    ];

  let [cardDisplay, setCardDisplay] = useState(false);
    // randomize game cards
  function createImages(cardArr) { 
     if (cardDisplay === false) {
        for (let i = 0; i < cardArr.length; i++) {
          console.log(cardArr[i].src);
          let eachItem = cardArr[i].src;
          createFillBoxes(i, cardArr);
          const picParent = document.querySelector('.picParent');
          const newPic = document.createElement('img');
          newPic.src = eachItem;
          console.log(newPic)
          newPic.classList.add('picBox');
          newPic.id = 'whiteBox';
          picParent.appendChild(newPic);
          setCardDisplay(prev => prev = true);
        }
      }
  }
  // input desired array into parameter, which willow display desired cards and descriptions => 
  setTimeout(() => createImages(sections), 200);

   function createFillBoxes(i, cardArr) {
    const fillBoxes = document.querySelector('.inputParent');
    const newFillBox = document.createElement('div');
    newFillBox.id = 'whiteBox';
    newFillBox.setAttribute('data-badges', i);
    fillBoxes.append(newFillBox);
    createDescriptions(i, cardArr);
   }

   function createDescriptions(i, cardArr) {
      const descriptionText = cardArr[i].description;
      const descriptionParent = document.querySelector('.descriptionParent');
      const descriptionBox = document.createElement('div');
      descriptionBox.classList.add('descriptionBox')
      descriptionBox.innerHTML = descriptionText;
      descriptionBox.id = 'whiteBox';
      descriptionBox.setAttribute('data-badges', i);
      descriptionParent.append(descriptionBox);
   }

    function endGame() {
      const counter = document.querySelector('.winLossCounter');
      if (picturesArray.every((value, index) => value === fillArray[index])) {
        console.log('win');
        endDisplay();
        counter.textContent = 'Full Match!';
      }
      else if (fillArray.length === 3 && !fillArray.includes(undefined)) {
        console.log('loss');
        endDisplay();
        counter.textContent = 'Try Again!';
      }
  } 

    function endDisplay() {
      const endParent = document.querySelector('.endGameDisplay');
      const endButton = document.createElement('button');
      endButton.innerHTML += '<span>Restart</span>';
      endButton.classList.add('endButton');
      endParent.appendChild(endButton);

      endButton.addEventListener('click', () => {
        window.location.reload();
      })
    }

  // push description id from pic to the description array

  return (
    <div className="App">
      <h1 className='winLossCounter'>Matching Game</h1>
      <div className='picParent'></div>
      <div className='inputParent' onClick={(e) => placeDescription(e)}></div>
      <div className='descriptionParent' onClick={(e) => clickDescription(e)}></div>
      <div className='endGameDisplay'></div>
    </div>
  );
}

export default App;
