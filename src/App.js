import './App.css';
import {useState} from 'react';
import Tibetan from './pictures/tibetan.png';
import React from 'react';
import Briard from './pictures/briard.png';
import Norwegian from './pictures/norwegian.png';
import Belgian from './pictures/belgian.png';

function App() {
  let [picturesArray] = useState([1, 0, 2]); // correct pattern of numbers
  let [description, setDescription] = useState(-1);
  let [fillArray, setFillArray] = useState([]);

console.log(Tibetan);
  // change to use effect
  function clickDescription(e) {
    const clickedBox = parseInt(e.target.dataset.badges);
    if (!fillArray.includes(clickedBox)) {
      setDescription(prev => prev = clickedBox);

      const inputSquare = document.querySelectorAll('.inputParent');
        inputSquare.forEach(box => {
        box.style.backgroundColor = 'yellow';
      })
    }
  }

  function placeDescription(e) {
    const clickedDescription = document.querySelector('[data-badges="' + description + '"].descriptionBox');
    const clickedFillBox = parseInt(e.target.dataset.badges);
    const clickedElement = e.target;
    // add the description to its appropriate box => 
    if (description > -1 && !fillArray.includes(description)) {
      console.log(description);
      console.log(clickedFillBox);
      fillArray.splice(clickedFillBox, 0, description);
      endGame();
    
      const inputSquare = document.querySelectorAll('.inputParent');
        inputSquare.forEach(box => {
          box.style.backgroundColor = 'rgb(0, 107, 139)';
        })
      // displays description in clicked empty box
      console.log(fillArray);
      clickedElement.innerHTML = clickedDescription.innerHTML;
      clickedDescription.innerHTML = '';
    }
  }

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
  function createImages() { 
     if (cardDisplay === false) {
        for (let i = 0; i < sections.length; i++) {
          console.log(sections[i].src);
          let eachItem = sections[i].src;
          createFillBoxes(i);
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
      descriptionBox.classList.add('descriptionBox')
      descriptionBox.innerHTML = descriptionText;
      descriptionBox.id = 'whiteBox';
      descriptionBox.setAttribute('data-badges', i);
      descriptionParent.append(descriptionBox);
   }

    function endGame() {
      const counter = document.querySelector('.winLossCounter');
      if (picturesArray.every((value, index) => value === fillArray[index])) {
        // useEffect?
        console.log('win');
        endDisplay();
        counter.textContent = 'Full Match!';
      }
      else if (fillArray.length === 3) {
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
        setDescription(prev => prev = -1);
        setFillArray(prev => prev = []);
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
