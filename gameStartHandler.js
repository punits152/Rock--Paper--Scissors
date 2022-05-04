// required data
const options = ["Rock", "Paper", "Scissores"];

// This is a player class we can use it to make many players
function Player(name) {
  this.name = name;
  this.choice = this.choice;
}

// creating new players
const A = new Player("player1");
const B = new Player("player2");
const C = new Player("player3");
const D = new Player("player4");

let results = {};
let template = {
  choices: {
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  },
  player1WinVs: {
    player2: 0,
    player3: 0,
    player4: 0,
  },
  player2WinVs: {
    player1: 0,
    player3: 0,
    player4: 0,
  },
  player3WinVs: {
    player1: 0,
    player2: 0,
    player4: 0,
  },
  player4WinVs: {
    player1: 0,
    player2: 0,
    player3: 0,
  },
};

// let temp = { ...template };
let temp = JSON.parse(JSON.stringify(template));

//"Reck">"Scissors"
// pAPER >ROCK
//scissor>paper

// This function also modifies the data in temp json
const decisionBwTwo = function (player1, player2) {
  if (player1.choice === "Rock") {
    if (player2.choice === "Rock") {
      return 0;
    } else if (player2.choice === "Paper") {
      // updating score for player 2 vs 1
      temp[`${player2.name}WinVs`][`${player1.name}`]++;
      // returning the winner
      return player2.name;
    } else if (player2.choice === "Scissores") {
      // Updating the score for player 1 vs 2
      temp[`${player1.name}WinVs`][`${player2.name}`]++;
      return player1.name;
    }
  }
  if (player1.choice === "Paper") {
    if (player2.choice === "Rock") {
      temp[`${player1.name}WinVs`][`${player2.name}`]++;
      return player1.name;
    } else if (player2.choice === "Paper") {
      return 0;
    } else if (player2.choice === "Scissores") {
      temp[`${player2.name}WinVs`][`${player1.name}`]++;
      return player2.name;
    }
  }
  if (player1.choice === "Scissores") {
    if (player2.choice === "Rock") {
      temp[`${player2.name}WinVs`][`${player1.name}`]++;
      return player2.name;
    } else if (player1.choice === "Paper") {
      temp[`${player1.name}WinVs`][`${player2.name}`]++;
      return player1.name;
    } else if (player2.choice === "Scissores") {
      return 0;
    }
  }

  // Side effect
  // temp.choices[`${player1.name}`] = player1.choice;
  // temp.choices[`${player2.name}`] = player2.choice;

  return 0;
};

function oneIterationRunReturnResults() {
  A.choice = options[Math.trunc(Math.random() * 3)];
  B.choice = options[Math.trunc(Math.random() * 3)];

  C.choice = options[Math.trunc(Math.random() * 3)];
  D.choice = options[Math.trunc(Math.random() * 3)];

  temp.choices[`${A.name}`] = A.choice;
  temp.choices[`${B.name}`] = B.choice;
  temp.choices[`${C.name}`] = C.choice;
  temp.choices[`${D.name}`] = D.choice;

  // implementing all the combination of results
  decisionBwTwo(A, B);
  decisionBwTwo(A, C);
  decisionBwTwo(A, D);
  // decisionBwTwo(player2, player1);
  decisionBwTwo(B, C);
  decisionBwTwo(B, D);
  // decisionBwTwo(player3, player1);
  // decisionBwTwo(player3, player2);
  decisionBwTwo(C, D);
  // decisionBwTwo(player4,player1)
  // decisionBwTwo(player4,player2)
  // decisionBwTwo(player4,player3)

  return JSON.parse(JSON.stringify(temp));
}

const startGame = function () {
  for (let i = 0; i < 50; i++) {
    // Playing  temp updation for each game iteration
    const resultForIteration = JSON.parse(JSON.stringify(oneIterationRunReturnResults()));
    // console.log(resultForIteration);
    // Update every iteration result in the results object
  
    results[`Results for iteration no: ${i}:`] = resultForIteration;
  }
  // return the stringified object

  return JSON.stringify(results);
};

// game logic
function getGameStatus(req, res) {
  console.log("main");
  const str = startGame();
  // temp = { ...template };
  temp = JSON.parse(JSON.stringify(template));
  res.end(str);
}

module.exports = getGameStatus;
