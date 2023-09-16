import './App.css';
import { useEffect, useState, useRef, createRef } from 'react';
// import Tibetan from './pictures/tibetan.png';
import React from 'react';

function App() {
  let [picturesArray, setPicturesArray] = useState([1, 0, 2]); // correct pattern of numbers
  let [description, setDescription] = useState(-1);
  let [fillArray, setFillArray] = useState([]);


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

  // useEffect(() => {

  // }, description);

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
    const sections = [
      // objects will be placed in order in the array, change order in the pictures array to match the objects
      // descriptions are switched around
      {
        src: '/static/media/belgian.4f1cecef3601af8210eb.png',
        description:"A Spitz-type dog breed from Norway, initially bred for hunting puffins and their eggs in hard-to-reach places like caves and cliffs. Its name, a compound of 'lunde' (meaning puffin) and 'hund' (meaning dog), reflects its heritage. While facing near-extinction in the 1960s, preservation efforts have since been ongoing."
      }, // fill the array with the description number? description number = 1
      {
        src: '/static/media/norwegian.8845dd09d6395748df6a.png', // test before adding more 
        description: "This Belgian herding breed comes in four distinct varieties, each with different coat types and colors: long-haired black, rough-haired fawn, short-haired fawn, and long-haired fawn. In the United States, these varieties are considered separate breeds by the American Kennel Club."
      },
      {
        src: '/static/media/briard.5c731a35a9435a6b6a8b.png',
        description: "This French shepherd dog has a long history, originally bred for herding and protecting sheep. It made its debut at the 1863 Paris dog show and was first registered in the national stud-book in 1885. In the past, it was also known as the French Plains Shepherd."
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
      if (picturesArray.every((value, index) => value === fillArray[index])) {
        // useEffect?
        console.log('win');
        endDisplay();
        const counter = document.querySelector('.winLossCounter');
        counter.textContent = 'Full Match!';
      }
      else if (fillArray.length === 3) {
        console.log('loss');
        endDisplay();
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
