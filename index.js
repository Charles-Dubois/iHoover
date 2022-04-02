const prompt = require("prompt");
prompt.start();
var hoover = {
  // Déclatration d'un objet contenant les infos sur le déplacement de mon hoover
  direction: "N",
  x: 5,
  y: 5,
};
var grid; // déclaration de la grille de jeu avec un N pour siginifer la postion initiale
grid = [
  ["L", "I", "M", "I", "T", "*", "L", "I", "M", "I", "T"],
  ["I", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["M", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["I", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["T", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["*", " ", " ", " ", "", "N", " ", " ", " ", " ", " "],
  ["L", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["I", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["M", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["I", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["T", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
];
console.table(grid); // affichage de la grille
function turnRight(myHoover) {
  // fonction pour tourner a droite en fonction de la direction regardée
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
  // fonction pour tourner a gauche en fonction de la direction regardée
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
  // fonction pour avancer en fonction de la direction regardée
  switch (myHoover.direction) {
    case "N":
      if (myHoover.y === 1) {
        console.log("Vous sortez de la grille");
      } else {
        grid[hoover.y][hoover.x] = " ";
        myHoover.y -= 1;
      }
      break;
    case "E":
      if (myHoover.x === 10) {
        console.log("Vous sortez de la grille");
      } else {
        grid[hoover.y][hoover.x] = " ";
        myHoover.x += 1;
      }
      break;
    case "S":
      if (myHoover.y === 10) {
        console.log("Vous sortez de la grille");
      } else {
        grid[hoover.y][hoover.x] = " ";
        myHoover.y += 1;
      }
      break;
    case "W":
      if (myHoover.x === 1) {
        console.log("Vous sortez de la grille");
      } else {
        grid[hoover.y][hoover.x] = " ";
        myHoover.x -= 1;
      }
      break;
  }
  grid[hoover.y][hoover.x] = hoover.direction;
}
function pilotHoover(instructions) {
  // fonction pour piloter le rover, elle appelle les fonctiobn déclarée plus haut
  grid[hoover.y][hoover.x] = hoover.direction;
  for (var i = 0; i < instructions.length; i++) {
    if (instructions.charAt(i) === "G") {
      turnLeft(hoover);
    } else if (instructions.charAt(i) === "D") {
      turnRight(hoover);
    } else if (instructions.charAt(i) === "A") {
      moveForward(hoover);
    }
  }
  console.table(grid);
  console.log("my postion ".concat(hoover.y, "y / ").concat(hoover.x, "x "));
}
var conditions;
conditions = [
  //conditions définie pour la libaire prompt
  {
    name: "letters",
    description: "Write A to move forward, D to turn right and, G to turn left",
    type: "string",
    pattern: /[G|D|A]/i,
    message: "Invalid instruction, use only A, D, and G",
    require: true,
  },
];
// appel de la libraire prompt avec la method GET, en paramètre lui est donné les conditions définie précedement
// 2eme paramèrtre une fonction de callback pour arreter la fonction en cas de non respect des conditons ou déplacer le rover grace aux instructions de l'utilisateur
prompt.get(conditions, (err, result) => {
  if (err) {
    return console.log("Error " + err);
  }
  pilotHoover(result.letters);
});
