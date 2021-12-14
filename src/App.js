import { useCallback, useEffect, useState } from 'react';
import './App.css';
import ScoreBoard from './ScoreBoard';
const width = 8;
const height = 8;
const candyColors =[
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
];

let blank = 0;

function App() {
  const [currentRandomArray, setCurrentRandomArray] = useState([]);
  const [currentSquareDragging, setCurrentSquareDragging] = useState(null);
  const [squareToReplace, setSquareToReplace] = useState(null);
  const [score, setScore] = useState(0);

  function createBoard() {
    const randomArray = [];
    for (let i = 0; i < height; i++) {
      randomArray[i] = [];
      for (let j = 0; j < width; j++) {
        const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
        randomArray[i].push(randomColor);
      }  
    }
    setCurrentRandomArray(randomArray);
  }
 
  const checkForColumnOfThree = useCallback(() => {
    for(let i = 0; i < height - 2; i++) {
      for(let j = 0; j < width; j++) {
        let columnOfThree =[[i, j], [i + 1, j], [i + 2, j] ];
        
        if(currentRandomArray[i][j] !== "" && columnOfThree.every(color => currentRandomArray[color[0]][color[1]] === currentRandomArray[i][j])){
          columnOfThree.forEach(color => {
            currentRandomArray[color[0]][color[1]] = "";
          })
          setScore((score) => score + 3);
          return true;
        }
        

      }
    }
  }, [currentRandomArray]) 
  // function checkForColumnOfThree() {
  //   for(let i = 0; i < height - 2; i++) {
  //     for(let j = 0; j < width; j++) {
  //       let columnOfThree =[[i, j], [i + 1, j], [i + 2, j] ];
        
  //       if(currentRandomArray[i][j] !== "" && columnOfThree.every(color => currentRandomArray[color[0]][color[1]] === currentRandomArray[i][j])){
  //         columnOfThree.forEach(color => {
  //           currentRandomArray[color[0]][color[1]] = "";
  //         })
  //         setScore((score) => score + 3);
  //         return true;
  //       }
        

  //     }
  //   }
  // }

  const checkForRowOfThree = useCallback(() => {
    for(let i = 0; i < height; i++) {
      for(let j = 0; j < width - 2; j++) {
        let rowOfThree =[[i, j], [i, j + 1], [i, j + 2] ];
        
        if(currentRandomArray[i][j] !== "" && rowOfThree.every(color => currentRandomArray[color[0]][color[1]] === currentRandomArray[i][j])){
          rowOfThree.forEach(color => {
            currentRandomArray[color[0]][color[1]] = "";
          })
          setScore((score) => score + 3);
          return true;
        }
        

      }
    }
  }, [currentRandomArray])

  const checkForRowOfFour = useCallback(() => {
    for(let i = 0; i < height; i++) {
      for(let j = 0; j < width - 3; j++) {
        let rowOfFour =[[i, j], [i, j + 1], [i, j + 2], [i, j + 3] ];
        
        if(currentRandomArray[i][j] !== "" && rowOfFour.every(color => currentRandomArray[color[0]][color[1]] === currentRandomArray[i][j])){
          rowOfFour.forEach(color => {
            currentRandomArray[color[0]][color[1]] = "";
          })
          setScore((score) => score + 4);
          return true;  
        }
        
        
      }
    }
  }, [currentRandomArray])

  const checkForColumnOfFour = useCallback(() => {
    for(let i = 0; i < height - 3; i++) {
      for(let j = 0; j < width; j++) {
        let columnOfFour =[[i, j], [i + 1, j], [i + 2, j], [i + 3, j] ];
    
        if(currentRandomArray[i][j] !== "" && columnOfFour.every(color => currentRandomArray[color[0]][color[1]] === currentRandomArray[i][j])){
          columnOfFour.forEach(color => {
            currentRandomArray[color[0]][color[1]] = "";
          })
          setScore((score) => score + 4);
          return true;  
        }
        
      }
    }
  }, [currentRandomArray])

  const checkForColumnOfFive = useCallback(() => {
    for(let i = 0; i < height - 4; i++) {
      for(let j = 0; j < width; j++) {
        let columnOfThree =[[i, j], [i + 1, j], [i + 2, j], [i + 3, j], [i + 4, j] ];
        
        if(currentRandomArray[i][j] !== "" && columnOfThree.every(color => currentRandomArray[color[0]][color[1]] === currentRandomArray[i][j])){
          columnOfThree.forEach(color => {
            currentRandomArray[color[0]][color[1]] = "";
          })
          setScore((score) => score + 5);
          return true;
        }
        

      }
    }
  }, [currentRandomArray])

  const checkForRowOfFive = useCallback(() => {
    for(let i = 0; i < height; i++) {
      for(let j = 0; j < width - 4; j++) {
        let rowOfFour =[[i, j], [i, j + 1], [i, j + 2], [i, j + 3], [i, j + 4]];
        
        if(currentRandomArray[i][j] !== "" && rowOfFour.every(color => currentRandomArray[color[0]][color[1]] === currentRandomArray[i][j])){
          rowOfFour.forEach(color => {
            currentRandomArray[color[0]][color[1]] = "";
          })
          setScore((score) => score + 5);
          return true;  
        }
        
        
      }
    }
  }, [currentRandomArray])

  const moveToTheColumnBelow = useCallback(() => {
    for (let i = height; i > 0; i--) {
      for(let j = width; j >= 0; j--) {
        if(currentRandomArray[i] && currentRandomArray[i][j] === "") {
          currentRandomArray[i][j] = currentRandomArray[i - 1][j];
          currentRandomArray[i - 1][j] = "";
        }
      }
    }
  }, [currentRandomArray])

  const checkForEmpty = useCallback(() =>{
    blank = 0;
    for (let i = 0; i < height; i++) {
      for(let j = 0; j < width; j++) {
        if(currentRandomArray[i] && currentRandomArray[i][j] === "") {
          blank += 1;
        }
      }
    }
  }, [currentRandomArray])

  const fillEmptyFirstLine = useCallback(() =>{
    for(let i = 0; i < width; i++) {
      if(currentRandomArray[0][i] === "") {
        currentRandomArray[0][i] = candyColors[Math.floor(Math.random() * candyColors.length)];
      }
    }
  }, [currentRandomArray])

  function dragStart(e) {
    setCurrentSquareDragging(e.target);
  }

  function dragDrop(e) {
    setSquareToReplace(e.target);
  }

  function dragEnd() {
    if(squareToReplace) {
      let [squareToReplaceRow, squareToReplaceColumn] = [parseInt(squareToReplace.getAttribute("data-line")), parseInt(squareToReplace.getAttribute("data-block"))];
    let [currentSquareDraggingRow, currentSquareDraggingColumn] = [parseInt(currentSquareDragging.getAttribute("data-line")), parseInt(currentSquareDragging.getAttribute("data-block"))];
    let validMoves = [
      [currentSquareDraggingRow - 1, currentSquareDraggingColumn],
      [currentSquareDraggingRow + 1, currentSquareDraggingColumn],
      [currentSquareDraggingRow, currentSquareDraggingColumn - 1],
      [currentSquareDraggingRow, currentSquareDraggingColumn + 1]
    ] 
    let validMove = validMoves.reduce((accumulator, item) => {
      if(item[0] === squareToReplaceRow && item[1] === squareToReplaceColumn) {
        accumulator++;
      }
      return accumulator;
    }, 0)

    if (currentSquareDragging && validMove) {
      currentRandomArray[squareToReplaceRow][squareToReplaceColumn] = currentSquareDragging.classList[1];
      currentRandomArray[currentSquareDraggingRow][currentSquareDraggingColumn] = squareToReplace.classList[1];
      if((checkForColumnOfFour() || checkForRowOfFour() || checkForColumnOfThree() || checkForRowOfThree())) {
        setCurrentSquareDragging(null);
        setSquareToReplace(null);
      } else {
        currentRandomArray[squareToReplaceRow][squareToReplaceColumn] = squareToReplace.classList[1];
        currentRandomArray[currentSquareDraggingRow][currentSquareDraggingColumn] = currentSquareDragging.classList[1]; 
      }
      
    }
    }
  }

  useEffect(()=>{
    createBoard();
  }, [])

  useEffect(() => {
    let timer = setInterval(() => {
        if(currentRandomArray[0]) {
          checkForEmpty();
          if(!blank) {
            checkForColumnOfFive();
            checkForRowOfFive();
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
          }
          moveToTheColumnBelow();
          fillEmptyFirstLine();
          setCurrentRandomArray([...currentRandomArray]);
        }
    }, 100);
    return () => clearInterval(timer);
  }, [checkForColumnOfFive,
      checkForRowOfFive,
      checkForEmpty, 
      checkForColumnOfFour, 
      checkForColumnOfThree, 
      checkForRowOfFour, 
      checkForRowOfThree, 
      moveToTheColumnBelow, 
      fillEmptyFirstLine, 
      currentRandomArray
  ])
  return (
    <div className="app">
      <div className="game">
        {currentRandomArray.map((line, indexLine)=>{
          return line.map((block, indexBlock) => {
            return <div key={indexLine + "" + indexBlock} 
            className={"block " + block}  
            style={{cursor: "move"}}
            draggable={true}
            data-line={indexLine}
            data-block={indexBlock}
            onDragOver={(e) => {e.preventDefault()}}
            onDragEnter={(e) => {e.preventDefault()}}
            onDragLeave={(e) => {e.preventDefault()}}
            onDragStart={dragStart}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            >
              {/* {indexLine + "/" + indexBlock} */}
            </div>
          })
          
        })}
      </div>
      <ScoreBoard score={score} />
    </div>
  );
}

export default App;
