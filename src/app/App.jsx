import "./styles.css";

import { table } from "../lists/table";
import { victoryCondition } from "../lists/victoryCondition";

import { useState } from "react";

const App = () => {
  const playerX = "X";
  const playerO = "O";

  const [state, setState] = useState(table);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [isPlayerSelected, setIsPlayerSelected] = useState(false);
  const [victory, setVictory] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [xPositions, setXPositions] = useState([]);
  const [oPositions, setOPositions] = useState([]);
  const [xPoints, setXPoints] = useState(0);
  const [oPoints, setOPoints] = useState(0);
  const [counter, setCounter] = useState(0);

  const checkXVictory = (player, index) => {
    const myXPositions = [...xPositions];

    let isThree = false;

    let row1CounterX = 0;
    let row2CounterX = 0;
    let row3CounterX = 0;
    let column1CounterX = 0;
    let column2CounterX = 0;
    let column3CounterX = 0;
    let diagonal1CounterX = 0;
    let diagonal2CounterX = 0;

    let isIncluded;
    if (player === "X") {
      for (let i = 0; i < victoryCondition.length; i++) {
        isIncluded = victoryCondition[i].positions.includes(index);
        if (isIncluded) {
          myXPositions.push(victoryCondition[i].condition);
          setXPositions(myXPositions.sort());
        }
      }
    }

    for (let i = 0; i < myXPositions.length; i++) {
      if (myXPositions[i] === "row1") {
        row1CounterX = row1CounterX + 1;
      }
      if (myXPositions[i] === "row2") {
        row2CounterX = row2CounterX + 1;
      }
      if (myXPositions[i] === "row3") {
        row3CounterX = row3CounterX + 1;
      }
      if (myXPositions[i] === "column1") {
        column1CounterX = column1CounterX + 1;
      }
      if (myXPositions[i] === "column2") {
        column2CounterX = column2CounterX + 1;
      }
      if (myXPositions[i] === "column3") {
        column3CounterX = column3CounterX + 1;
      }
      if (myXPositions[i] === "diagonal1") {
        diagonal1CounterX = diagonal1CounterX + 1;
      }
      if (myXPositions[i] === "diagonal2") {
        diagonal2CounterX = diagonal2CounterX + 1;
      }
    }
    if (
      row1CounterX === 3 ||
      row2CounterX === 3 ||
      row3CounterX === 3 ||
      column1CounterX === 3 ||
      column2CounterX === 3 ||
      column3CounterX === 3 ||
      diagonal1CounterX === 3 ||
      diagonal2CounterX === 3
    ) {
      isThree = true;
    }

    return isThree;
  };

  const checkOVictory = (player, index) => {
    const myOPositions = [...oPositions];

    let isThree = false;

    let row1CounterO = 0;
    let row2CounterO = 0;
    let row3CounterO = 0;
    let column1CounterO = 0;
    let column2CounterO = 0;
    let column3CounterO = 0;
    let diagonal1CounterO = 0;
    let diagonal2CounterO = 0;

    let isIncluded;
    if (player === "O") {
      for (let i = 0; i < victoryCondition.length; i++) {
        isIncluded = victoryCondition[i].positions.includes(index);
        if (isIncluded) {
          myOPositions.push(victoryCondition[i].condition);
          setOPositions(myOPositions.sort());
        }
      }
    }

    for (let i = 0; i < myOPositions.length; i++) {
      if (myOPositions[i] === "row1") {
        row1CounterO = row1CounterO + 1;
      }
      if (myOPositions[i] === "row2") {
        row2CounterO = row2CounterO + 1;
      }
      if (myOPositions[i] === "row3") {
        row3CounterO = row3CounterO + 1;
      }
      if (myOPositions[i] === "column1") {
        column1CounterO = column1CounterO + 1;
      }
      if (myOPositions[i] === "column2") {
        column2CounterO = column2CounterO + 1;
      }
      if (myOPositions[i] === "column3") {
        column3CounterO = column3CounterO + 1;
      }
      if (myOPositions[i] === "diagonal1") {
        diagonal1CounterO = diagonal1CounterO + 1;
      }
      if (myOPositions[i] === "diagonal2") {
        diagonal2CounterO = diagonal2CounterO + 1;
      }
    }

    if (
      row1CounterO === 3 ||
      row2CounterO === 3 ||
      row3CounterO === 3 ||
      column1CounterO === 3 ||
      column2CounterO === 3 ||
      column3CounterO === 3 ||
      diagonal1CounterO === 3 ||
      diagonal2CounterO === 3
    ) {
      isThree = true;
    }

    return isThree;
  };
  const selectPlayer = (player) => {
    if (player === "X") {
      setCurrentPlayer(playerX);
    }
    if (player === "O") {
      setCurrentPlayer(playerO);
    }
    setIsPlayerSelected(true);
  };

  const changeValue = (element, index) => {
    const myList = [...state];

    let player;

    if (element.player === "X" || element.player === "O") {
      return;
    }

    if (currentPlayer === playerX) {
      myList.splice(index, 1, { player: playerO });
      setState(myList);
      player = playerO;
      setCurrentPlayer(playerO);
    } else if (currentPlayer === playerO) {
      myList.splice(index, 1, { player: playerX });
      setState(myList);
      player = playerX;
      setCurrentPlayer(playerX);
    }

    if (checkXVictory(player, index)) {
      setVictory(true);
      setXPoints(xPoints + 1);
    }
    if (checkOVictory(player, index)) {
      setVictory(true);
      setOPoints(oPoints + 1);
    }

    setCounter(counter + 1);

    if (!victory && counter === 8) {
      setIsDraw(true);
    }
  };

  const restartMatch = () => {
    setVictory(false);
    setState(table);
    setXPositions([]);
    setOPositions([]);
    setCounter(0);
    setIsDraw(false);
    setIsPlayerSelected(false);
  };

  return !isPlayerSelected ? (
    <div className="app-container">
      <div>
        <h1>Tic-Tac-Toe</h1>
        <h2>
          X points: {xPoints} - O points: {oPoints}
        </h2>
        <h2>Select player</h2>
        <button className="player-button" onClick={() => selectPlayer("X")}>
          Player X
        </button>
        <button className="player-button" onClick={() => selectPlayer("O")}>
          Player O
        </button>
      </div>
    </div>
  ) : !victory && !isDraw ? (
    <div className="app-container">
      <div>
        <h1>Tic-Tac-Toe</h1>
        <h2>
          X points: {xPoints} - O points: {oPoints}
        </h2>
      </div>
      <div className="table-container">
        {state.map((element, index) => {
          return (
            <div key={index}>
              <button
                className="table-button table-button-hover"
                onClick={() => changeValue(element, index)}
              >
                <h1>{element.player}</h1>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="app-container">
      <div>
        <h1>Tic-Tac-Toe</h1>
        <h2>
          X points: {xPoints} - O points: {oPoints}
        </h2>
        {isDraw ? (
          <h2>Draw </h2>
        ) : (
          <h2>Player {currentPlayer} is the winner!</h2>
        )}
      </div>
      <div className="table-container">
        {state.map((element, index) => {
          return (
            <div key={index}>
              <button className="table-button table-button-disactive">
                <h1>{element.player}</h1>
              </button>
            </div>
          );
        })}
      </div>
      <button className="restart-match-button" onClick={restartMatch}>
        Restart match!
      </button>
    </div>
  );
};

export default App;
