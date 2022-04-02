const prompt = require("prompt");
prompt.start();
let hoover = {
  direction: "N",
  x: 4,
  y: 4,
};

var grid: string[][];

grid = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "N", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
];
console.table(grid);

function turnRight(myHoover) {
  switch (myHoover.direction) {
    case "N":
      myHoover.direction = "E";
      break;
    case "E":
      myHoover.direction = "S";
      break;
    case "S":
      myHoover.direction = "W";
      break;
    case "W":
      myHoover.direction = "N";
      break;
  }
  grid[hoover.y][hoover.x] = hoover.direction;
}
function turnLeft(myHoover) {
  switch (myHoover.direction) {
    case "N":
      myHoover.direction = "W";
      break;
    case "W":
      myHoover.direction = "S";
      break;
    case "S":
      myHoover.direction = "E";
      break;
    case "E":
      myHoover.direction = "N";
      break;
  }
  grid[hoover.y][hoover.x] = hoover.direction;
}

function moveForward(myHoover) {
  switch (myHoover.direction) {
    case "N":
      if (myHoover.y === 0) {
        console.log("Vous sortez de la grille");
      } else {
        grid[hoover.y][hoover.x] = " ";
        myHoover.y -= 1;
      }
      break;
    case "E":
      if (myHoover.x === 9) {
        console.log("Vous sortez de la grille");
      } else {
        grid[hoover.y][hoover.x] = " ";
        myHoover.x += 1;
      }
      break;
    case "S":
      if (myHoover.y === 9) {
        console.log("Vous sortez de la grille");
      } else {
        grid[hoover.y][hoover.x] = " ";
        myHoover.y += 1;
      }
      break;
    case "W":
      if (myHoover.x === 0) {
        console.log("Vous sortez de la grille");
      } else {
        grid[hoover.y][hoover.x] = " ";
        myHoover.x -= 1;
      }
      break;
  }
  grid[hoover.y][hoover.x] = hoover.direction;
}
function pilotHoover(instructions: string) {
  grid[hoover.y][hoover.x] = hoover.direction;
  for (let i = 0; i < instructions.length; i++) {
    if (instructions.charAt(i) === "G") {
      turnLeft(hoover);
    } else if (instructions.charAt(i) === "D") {
      turnRight(hoover);
    } else if (instructions.charAt(i) === "A") {
      moveForward(hoover);
    }
  }
  console.table(grid);
  console.log(`my postion ${hoover.y}y / ${hoover.x}x `);
}
var conditions: any[];
conditions = [
  {
    name: "letters",
    description: "Write A to move forward, D to turn right and, G to turn left",
    type: "string",
    pattern: /[G|D|A]/i,
    message: "Invalid instruction, use only A, D, and G",
    require: true,
  },
];

prompt.get(conditions, (err, result) => {
  if (err) {
    return console.log("Error " + err);
  }
  pilotHoover(result.letters);
});
