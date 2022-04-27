function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1)
    }
  }
}

function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  // var d = abs(a.i - b.i) + abs(a.j - b.j)
  return d;
}


function getStartBlockCordinate(selectedObject) {
  start = getBlockCordinate(selectedObject.value)
  // alert(start.i) 
}

function getEndBlockCordinate(selectedObject) {
  end = getBlockCordinate(selectedObject.value)
  // alert(end.i)

}

//Get the button:
mybutton = document.getElementById("btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function showDirectionClick() {
  // alert("inside")
  openSet = []
  closedSet = []
  exitDraw = false
  openSet.push(start)

  while (!exitDraw) {
    draw()
  }
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;

}






function getBlockCordinate(selectedBlock) {
  switch (selectedBlock) {
    case '1':
      return grid[32][41]; // block A
      break;
    case '2':
      return grid[15][40]; // block B
      break;
    case '3':
      return grid[17][28]; // Block C
      break;
    case '4':
      return grid[7][28] // Block D
      break;
    case '5':
      alert("You can go to E block via F block or D block");
      return;                       // Block E
      break;
    case '6':
      return grid[17][17]  // Block F
      break;
    case '7':
      return grid[15][5]   // Block G
      break;
    case '8':
      return grid[32][5]   // Block H
      break;
    case '9':
      return grid[30][15]  // Block I
      break;
    case '10':
      return grid[40][14] // Block J
      break;
    case '11':
      return grid[42][28] // Block K
      break;
    case '12':
      return grid[31][30] // Block L
      break;

    default:
      break;
  }
}


var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openSet = []
var closedSet = []
var start;
var end;
var w, h
var path = [];
var exitDraw = false;
// var canvas = document.getElementById('responsiveCanvas');
// var heightRatio = 1.5;
// canvas.height = canvas.width * heightRatio;


function Spot(i, j) {
  this.i = i
  this.j = j
  this.f = 0
  this.g = 0
  this.h = 0
  this.neighbors = []
  this.previous = undefined;
  this.wall = false;
  this.block = false

  // if (random(1) < 0.2) {
  //   this.wall = true
  // }

  this.show = function (col) {
    fill(col);
    if (this.wall) {
      fill(204, 204, 32)
      // fill(151, 118, 27)
      // fill(0)
    }
    if (this.block) {
      // fill(0, 0, 0)
      fill(0)
    }
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1)

  }

  this.addNeighbors = function (grid) {
    var i = this.i
    var j = this.j
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j])
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j])
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1])
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1])
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1])
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1])
    }
    if (i > 0 && j > rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1])
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1])
    }
  }
}


function setup() {

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  windowResized()
  // alert("setup")
  createCanvas(300, 300);
  pixelDensity(1)
  console.log("A*");


  w = width / cols
  h = height / rows


  //Making a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j)
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }



  // start = grid[0][0]
  // end = grid[cols - 1][rows - 1]
  start = grid[32][41]
  end = grid[32][41]
  start.wall = false
  end.wall = false



  // //My added work




  //Routes 
  routes = [grid[30][31],
  grid[30][32],
  grid[30][33],
  grid[30][34],
  grid[30][35],
  grid[30][36],
  grid[30][37],
  grid[30][38],
  grid[32][31],
  grid[32][32],
  grid[32][33],
  grid[32][34],
  grid[32][35],
  grid[32][36],
  grid[32][37],
  grid[32][38],
  grid[14][35],
  grid[14][36],
  grid[14][37],
  grid[15][3],

  grid[16][35],
  grid[16][36],
  grid[16][37],

  grid[13][29],
  grid[13][27],
  grid[12][29],
  grid[12][27],
  grid[11][29],
  grid[11][27],
  grid[10][29],
  grid[10][27],


  grid[18][19],
  grid[18][20],
  grid[18][21],
  grid[18][22],
  grid[18][23],
  grid[18][24],
  grid[18][25],
  grid[16][20],
  grid[16][21],
  grid[16][22],
  grid[16][23],
  grid[16][24],
  grid[16][25],

  grid[23][28],
  grid[24][28],
  grid[25][28],
  grid[26][28],
  grid[27][28],
  grid[23][30],
  grid[24][30],
  grid[25][30],
  grid[26][30],
  grid[27][30],


  grid[34][28],
  grid[35][28],
  grid[36][28],
  grid[37][28],
  grid[38][28],
  grid[39][28],
  grid[34][30],
  grid[35][30],
  grid[36][30],
  grid[37][30],
  grid[38][30],
  grid[39][30],

  grid[29][19],
  grid[29][20],
  grid[29][21],
  grid[29][22],
  grid[29][23],
  grid[29][24],
  grid[29][25],
  grid[31][19],
  grid[31][20],
  grid[31][21],
  grid[31][22],
  grid[31][23],
  grid[31][24],
  grid[31][25],



  grid[21][16],
  grid[22][16],
  grid[23][16],
  grid[24][16],
  grid[25][16],
  grid[26][16],
  grid[21][14],
  grid[22][14],
  grid[23][14],
  grid[24][14],
  grid[25][14],
  grid[26][14],
  grid[32][8],
  grid[32][9],
  grid[32][10],
  grid[32][11],
  grid[30][8],
  grid[30][9],
  grid[30][10],
  grid[30][11],



  grid[15][11],
  grid[15][10],
  grid[15][9],
  grid[15][8],
  grid[15][7],
    // grid[15][6],
    // grid[15][5],


    grid[36][13],
    grid[36][15],
    grid[37][13],
    grid[37][15],
    grid[38][13],
    grid[38][15],
    grid[39][15],

  ]

  for (let index = 0; index < routes.length; index++) {
    const element = routes[index]
    element.wall = true

  }

  // Blocks
  blocks = [grid[35][43],
  grid[35][44],
  grid[35][45],
  grid[36][42],
  grid[36][44],
  grid[37][43],
  grid[37][44],
  grid[37][45],

  grid[9][40], //
  grid[9][41], //
  grid[9][42], //
  grid[9][43], //
  grid[9][44], //
  grid[10][40], //
  grid[10][42], //
  grid[10][44], //
  grid[11][40], //
  grid[11][41], //
  grid[11][42], //
  grid[11][43], //
  grid[11][44], //

    grid[19][31], //
    grid[19][32], //
    grid[19][33], //
    grid[20][31], //
    // grid[20][33],//
    grid[19][34],//
    grid[20][34],//
    grid[21][31],//
    grid[21][34],//

    grid[3][23],
    grid[3][25],
        grid[4][23],//
    grid[4][24],//
    grid[4][25], //
    grid[5][23],//
    grid[5][25], //
        grid[6][23],//
    grid[6][24],//
    grid[6][25],//


    grid[7][10],
    grid[7][11],
    grid[7][12],
    grid[7][13],
    grid[7][14],
    grid[8][10],
    grid[8][12],
    grid[8][14],


        grid[14][13],
    grid[14][14],
    grid[14][15],
    grid[14][16],
    grid[14][17],
    grid[15][13],
    grid[15][15],


        grid[19][2],//
    grid[19][3],//
    grid[19][4],//
    grid[19][5],//
    grid[19][6], //
        grid[21][4],//
    grid[21][5],//
    grid[21][6],//
    grid[20][6],//
    grid[20][2],//
    grid[21][2],//
    grid[22][4],//


      grid[36][3],
  grid[36][4],
  grid[36][5],
  grid[37][4],
   grid[38][3],
  grid[38][4],
  grid[38][5],

    grid[33][16],//
    grid[33][18],//
        grid[34][16],//
    grid[34][17],//
    grid[34][18],//
    grid[35][16],//
    grid[35][18],//

    grid[45][14],//

    grid[45][17],//
        grid[46][14],//
    grid[46][15],//
    grid[46][16],//
    grid[46][17],//
    grid[47][14],//

        grid[45][27],//
    grid[45][28],//
    grid[45][29],//
        grid[46][28],//
    grid[47][27],//
    grid[47][29],//


        grid[27][31],//
    grid[27][32],//
    grid[27][33],//
    grid[27][34],//
    grid[28][34],//
    grid[29][34],//


  ]

  for (let index = 0; index < blocks.length; index++) {
    const element = blocks[index]
    element.block = true

  }

  //Block A
  blocka = [ //grid[31][39],
    // grid[31][40],
    // grid[31][41],
    // grid[31][42],
    grid[31][43],
    grid[31][44],
    grid[31][45],

    grid[30][39],
    grid[30][40],
    grid[30][41],
    grid[30][42],
    grid[30][43],
    grid[30][44],
    grid[30][45],
    grid[29][39],
    grid[29][40],
    grid[29][41],
    grid[29][42],
    grid[29][43],
    grid[29][44],
    grid[29][45],
    grid[28][39],
    grid[28][40],
    grid[28][41],
    grid[28][42],
    grid[28][43],
    grid[28][44],
    grid[28][45],
    grid[27][39],
    grid[27][40],
    grid[27][41],
    grid[27][42],
    grid[27][43],
    grid[27][44],
    grid[27][45],
    grid[32][39],
    // grid[32][40],
    // grid[32][41],
    // grid[32][42],
    grid[32][43],
    grid[32][44],
    grid[32][45],


    grid[33][39],
    // grid[33][41],
    grid[33][43],
    grid[33][44],
    grid[33][45],
    grid[33][44],
    grid[33][45],

    grid[34][39],
    grid[34][40],
    grid[34][41],
    grid[34][42],
    grid[34][43],
    grid[34][44],
    grid[34][45],

    grid[35][39],
    grid[35][40],
    grid[35][41],
    grid[35][42],
    // grid[35][43],
    // grid[35][44],
    // grid[35][45],

    grid[36][39],
    grid[36][40],
    grid[36][41],
    // grid[36][42],
    grid[36][43],
    // grid[36][44],
    grid[36][45],

    grid[37][39],
    grid[37][40],
    grid[37][41],
    grid[37][42],
    // grid[37][43],
    // grid[37][44],
    // grid[37][45],

    grid[38][39],
    grid[38][40],
    grid[38][41],
    grid[38][42],
    grid[38][43],
    grid[38][44],
    grid[38][45],

  ]
  for (let index = 0; index < blocka.length; index++) {
    const element = blocka[index]
    element.wall = true

  }

  // Block B
  blockb = [
    grid[8][38],
    grid[8][39],
    grid[8][40],
    grid[8][41],
    grid[8][42],
    grid[8][43],
    grid[8][44],
    grid[8][45],

    grid[9][38],
    grid[9][39],
    // grid[9][40], //
    // grid[9][41], //
    // grid[9][42], //
    // grid[9][43], //
    // grid[9][44], //
    grid[9][45],

    grid[10][38],
    grid[10][39],
    // grid[10][40], //
    grid[10][41],
    // grid[10][42], //
    grid[10][43],
    // grid[10][44], //
    grid[10][45],

    grid[11][38],
    grid[11][39],
    // grid[11][40], //
    // grid[11][41], //
    // grid[11][42], //
    // grid[11][43], //
    // grid[11][44], //
    grid[11][45],

    grid[12][38],
    grid[12][39],
    grid[12][40],
    grid[12][41],
    grid[12][42],
    grid[12][43],
    grid[12][44],

    grid[13][38],
    // grid[13][39],
    // grid[13][40],
    // grid[13][41],
    grid[13][42],
    grid[13][43],
    grid[13][44],

    grid[14][38],
    // grid[14][39],
    // grid[14][40],
    // grid[14][41],
    grid[14][42],
    grid[14][43],
    grid[14][44],

    // grid[15][38],
    // grid[15][39],
    // grid[15][40],
    // grid[15][41],
    grid[15][42],
    grid[15][43],
    grid[15][44],

    grid[16][38],
    grid[16][39],
    grid[16][40],
    grid[16][41],
    grid[16][42],
    grid[16][43],
    grid[16][44],

    grid[17][38],
    grid[17][39],
    grid[17][40],
    grid[17][41],
    grid[17][42],
    grid[17][43],
    grid[17][44],

    grid[18][38],
    grid[18][39],
    grid[18][40],
    grid[18][41],
    grid[18][42],
    grid[18][43],
    grid[18][44],

    grid[19][38],
    grid[19][39],
    grid[19][40],
    grid[19][41],
    grid[19][42],
    grid[19][43],
    grid[19][44],

    grid[20][38],
    grid[20][39],
    grid[20][40],
    grid[20][41],
    grid[20][42],
    grid[20][43],
    grid[20][44],
  ]
  for (let index = 0; index < blockb.length; index++) {
    const element = blockb[index]
    element.wall = true

  }

  // Block C 
  blockc = [

    grid[14][26],
    grid[14][27],
    // grid[14][28],
    grid[14][29],
    grid[14][30],
    grid[14][31],
    grid[14][32],
    grid[14][33],
    grid[14][34],


    grid[15][26],
    grid[15][27],
    // grid[15][28],
    // grid[15][29],
    // grid[15][30],
    // grid[15][31],
    // grid[15][32],
    // grid[15][33],
    // grid[15][34],

    grid[16][26],
    grid[16][27],
    // grid[16][28],
    // grid[16][29],
    grid[16][30],
    grid[16][31],
    grid[16][32],
    grid[16][33],
    grid[16][34],


    // grid[17][26],
    // grid[17][27],
    // grid[17][28],
    // grid[17][29],
    grid[17][30],
    grid[17][31],
    grid[17][32],
    grid[17][33],
    grid[17][34],

    grid[18][26],
    grid[18][27],
    grid[18][28],
    // grid[18][29],
    grid[18][30],
    grid[18][31],
    grid[18][32],
    grid[18][33],
    grid[18][34],

    grid[19][26],
    grid[19][27],
    grid[19][28],
    // grid[19][29],
    grid[19][30],
    // grid[19][31], //
    // grid[19][32], //
    // grid[19][33], //
    grid[19][34],

    grid[20][26],
    grid[20][27],
    grid[20][28],
    // grid[20][29],
    grid[20][30],
    // grid[20][31], 
    grid[20][32],
    grid[20][33], //
    grid[20][34],

    grid[21][26],
    grid[21][27],
    grid[21][28],
    // grid[21][29], //
    grid[21][30],
    grid[21][31], //
    grid[21][32],
    grid[21][33],
    grid[21][34],

    grid[22][26],
    grid[22][27],
    grid[22][28],
    // grid[22][29],
    grid[22][30],
    grid[22][31],
    grid[22][32],
    grid[22][33],
    grid[22][34],


  ]

  for (let index = 0; index < blockc.length; index++) {
    const element = blockc[index]
    element.wall = true

  }

  // Block D
  blockd = [
    // grid[2][21],
    grid[2][22],
    grid[2][23],
    grid[2][24],
    grid[2][25],
    grid[2][26],
    grid[2][27],
    grid[2][28],
    grid[2][29],
    grid[2][30],
    grid[2][31],
    grid[2][32],
    // grid[5][21],
    grid[5][22],
    // grid[5][23],//
    grid[5][24],
    // grid[5][25], //
    grid[5][26],
    grid[5][27],
    grid[5][28],
    grid[5][29],
    grid[5][30],
    grid[5][31],
    grid[5][32],

    // grid[4][21],
    grid[4][22],
    // grid[4][23],//
    // grid[4][24],//
    // grid[4][25], //
    grid[4][26],
    grid[4][27],
    grid[4][28],
    grid[4][29],
    grid[4][30],
    grid[4][31],
    grid[4][32],

    // grid[3][21],
    grid[3][22],
    grid[3][23],
    grid[3][24],
    grid[3][25],
    grid[3][26],
    grid[3][27],
    grid[3][28],
    grid[3][29],
    grid[3][30],
    grid[3][31],
    grid[3][32],

    // grid[6][21],
    grid[6][22],
    // grid[6][23],//
    // grid[6][24],//
    // grid[6][25],//
    grid[6][26],
    // grid[6][27],
    // grid[6][28],
    // grid[6][29],
    grid[6][30],
    grid[6][31],
    grid[6][32],

    // grid[7][21],
    grid[7][22],
    grid[7][23],
    grid[7][24],
    grid[7][25],
    grid[7][26],
    // grid[7][27],
    // grid[7][28],
    // grid[7][29],
    grid[7][30],
    grid[7][31],
    grid[7][32],

    // grid[8][21],
    grid[8][22],
    grid[8][23],
    grid[8][24],
    grid[8][25],
    grid[8][26],
    // grid[8][27],
    // grid[8][28],
    // grid[8][29],
    grid[8][30],
    grid[8][31],
    grid[8][32],

    // grid[9][21],
    grid[9][22],
    grid[9][23],
    grid[9][24],
    grid[9][25],
    grid[9][26],
    grid[9][27],
    // grid[9][28],
    grid[9][29],
    grid[9][30],
    grid[9][31],
    grid[9][32],


  ]
  for (let index = 0; index < blockd.length; index++) {
    const element = blockd[index]
    element.wall = true

  }

  // Block E
  blocke = [
    grid[2][9],
    grid[2][10],
    grid[2][11],
    grid[2][12],
    grid[2][13],
    grid[2][14],
    grid[2][15],

    grid[3][9],
    // grid[3][10],
    // grid[3][11],
    // grid[3][12],
    // grid[3][13],
    // grid[3][14],
    grid[3][15],

    grid[4][9],
    // grid[4][10],
    // grid[4][11],
    // grid[4][12],
    // grid[4][13],
    // grid[4][14],
    grid[4][15],

    grid[5][9],
    // grid[5][10],
    // grid[5][11],
    // grid[5][12],
    // grid[5][13],
    // grid[5][14],
    grid[5][15],

    grid[6][9],
    // grid[6][10],
    // grid[6][11],
    // grid[6][12],
    // grid[6][13],
    // grid[6][14],
    grid[6][15],

    grid[7][9],
    // grid[7][10],
    // grid[7][11],
    // grid[7][12],
    // grid[7][13],
    // grid[7][14],
    grid[7][15],

    grid[8][9],
    grid[8][10],
    grid[8][11],
    grid[8][12],
    grid[8][13],
    grid[8][14],
    grid[8][15],

  ]
  for (let index = 0; index < blocke.length; index++) {
    const element = blocke[index]
    element.wall = true

  }

  // Block F
  blockf = [
    grid[20][12],
    grid[20][13],
    grid[20][14],
    // grid[20][15],
    grid[20][16],
    grid[20][17],
    grid[20][18],


    grid[19][12],
    grid[19][13],
    grid[19][14],
    // grid[19][15],
    grid[19][16],
    grid[19][17],
    grid[19][18],

    grid[18][12],
    grid[18][13],
    grid[18][14],
    // grid[18][15],
    grid[18][16],
    grid[18][17],
    grid[18][18],

    grid[17][12],
    grid[17][13],
    grid[17][14],
    // grid[17][15],
    // grid[17][16],
    // grid[17][17],
    // grid[17][18],


    grid[16][18],
    grid[16][19],


    grid[15][12],
    grid[15][13],
    grid[15][14],
    grid[15][15],
    grid[15][16],
    grid[15][17],
    grid[15][18],

    grid[14][12],
    // grid[14][13],
    // grid[14][14],
    // grid[14][15],
    // grid[14][16],
    // grid[14][17],
    grid[14][18],

    grid[17][11],
    grid[17][10],
    grid[17][9],
    grid[17][8],
    grid[17][7],
    grid[17][6],
    grid[17][5],

    grid[18][11],
    grid[18][10],
    grid[18][9],
    grid[18][8],
    grid[18][7],
    grid[18][6],
    grid[18][5],

  ]


  for (let index = 0; index < blockf.length; index++) {
    const element = blockf[index]
    element.wall = true

  }

  // Block G
  blockg = [

    grid[10][1],
    grid[10][2],
    grid[10][3],
    grid[10][4],
    grid[10][5],
    grid[10][6],
    grid[10][7],

    grid[11][1],
    grid[11][2],
    grid[11][3],
    grid[11][4],
    grid[11][5],
    grid[11][6],
    grid[11][7],

    grid[12][1],
    grid[12][2],
    grid[12][3],
    grid[12][4],
    grid[12][5],
    grid[12][6],
    grid[12][7],

    grid[13][1],
    grid[13][2],
    grid[13][3],
    grid[13][4],
    grid[13][5],
    grid[13][6],
    grid[13][7],

    grid[14][1],
    grid[14][2],
    grid[14][3],
    // grid[14][4],
    // grid[14][5],
    // grid[14][6],
    grid[14][7],

    grid[15][1],
    grid[15][2],
    grid[15][3],
    // grid[15][4],
    // grid[15][5],
    // grid[15][6],
    grid[15][7],

    grid[16][1],
    grid[16][2],
    grid[16][3],
    // grid[16][4],
    // grid[16][5],
    // grid[16][6],
    // grid[16][7],

    grid[17][1],
    grid[17][2],
    grid[17][3],
    grid[17][4],
    grid[17][5],
    grid[17][6],
    grid[17][7],

    grid[18][1],
    grid[18][2],
    grid[18][3],
    grid[18][4],
    grid[18][5],
    grid[18][6],
    grid[18][7],

    grid[19][1],
    // grid[19][2],//
    // grid[19][3],//
    // grid[19][4],//
    // grid[19][5],//
    // grid[19][6], //
    grid[19][7],

    grid[20][1],
    // grid[20][2], //
    grid[20][3],
    grid[20][4],
    grid[20][5],
    // grid[20][6], //
    grid[20][7],

    grid[21][1],
    // grid[21][2],//
    grid[21][3],
    // grid[21][4],//
    // grid[21][5],//
    // grid[21][6],//
    grid[21][7],

    grid[22][1],
    grid[22][2],
    grid[22][3],
    // grid[22][4],//
    grid[22][5],
    grid[22][6],
    grid[22][7],
  ]
  for (let index = 0; index < blockg.length; index++) {
    const element = blockg[index]
    element.wall = true

  }

  // Block H
  blockh = [grid[30][1],
  grid[30][2],
  grid[30][3],
  grid[30][4],
  grid[30][5],
  grid[30][6],
  grid[30][7],

  grid[31][1],
  grid[31][2],
  grid[31][3],
  // grid[31][4],
  // grid[31][5],
  // grid[31][6],
  // grid[31][7],

  grid[32][1],
  grid[32][2],
  grid[32][3],
  // grid[32][4],
  // grid[32][5],
  // grid[32][6],
  grid[32][7],

  grid[33][1],
  grid[33][2],
  grid[33][3],
  // grid[33][4],
  // grid[33][5],
  // grid[33][6],
  grid[33][7],

  grid[34][1],
  grid[34][2],
  grid[34][3],
  grid[34][4],
  grid[34][5],
  grid[34][6],
  grid[34][7],

  grid[35][1],
  grid[35][2],
  grid[35][3],
  grid[35][4],
  grid[35][5],
  grid[35][6],
  grid[35][7],

  grid[36][1],
  grid[36][2],
  // grid[36][3],
  // grid[36][4],
  // grid[36][5],
  grid[36][6],
  grid[36][7],

  grid[37][1],
  grid[37][2],
  grid[37][3],
  // grid[37][4],
  grid[37][5],
  grid[37][6],
  grid[37][7],

  grid[38][1],
  grid[38][2],
  // grid[38][3],
  // grid[38][4],
  // grid[38][5],
  grid[38][6],
  grid[38][7],

  grid[39][1],
  grid[39][2],
  grid[39][3],
  grid[39][4],
  grid[39][5],
  grid[39][6],
  grid[39][7],

  grid[29][1],
  grid[29][2],
  grid[29][3],
  grid[29][4],
  grid[29][5],
  grid[29][6],
  grid[29][7],

  grid[28][1],
  grid[28][2],
  grid[28][3],
  grid[28][4],
  grid[28][5],
  grid[28][6],
  grid[28][7],
  ]

  for (let index = 0; index < blockh.length; index++) {
    const element = blockh[index]
    element.wall = true

  }


  // Block I
  blocki = [
    grid[30][12],
    grid[30][13],
    grid[30][14],
    // grid[30][15],
    // grid[30][16],
    // grid[30][17],
    // grid[30][18],


    grid[29][12],
    grid[29][13],
    grid[29][14],
    // grid[29][15],
    grid[29][17],
    grid[29][18],
    grid[29][16],

    grid[28][12],
    grid[28][13],
    grid[28][14],
    // grid[28][15],
    grid[28][16],
    grid[28][17],
    grid[28][18],

    grid[27][12],
    grid[27][13],
    grid[27][14],
    // grid[27][15],
    grid[27][16],
    grid[27][17],
    grid[27][18],



    // grid[31][12],
    // grid[31][13],
    // grid[31][14],
    // grid[31][15],
    grid[31][16],
    grid[31][17],
    grid[31][18],

    grid[32][12],
    grid[32][13],
    // grid[32][14],
    grid[32][15],
    grid[32][16],
    grid[32][17],
    grid[32][18],
    grid[32][19],

    grid[33][12],
    grid[33][13],
    // grid[33][14],
    grid[33][15],
    // grid[33][16],//
    grid[33][17],
    // grid[33][18],//
    grid[33][19],

    grid[34][12],
    grid[34][13],
    // grid[34][14],
    grid[34][15],
    // grid[34][16],//
    // grid[34][17],//
    // grid[34][18],//
    grid[34][19],

    grid[35][12],
    grid[35][13],
    // grid[35][14],
    grid[35][15],
    // grid[35][16],//
    grid[35][17],
    // grid[35][18],//
    grid[35][19],

  ]

  for (let index = 0; index < blocki.length; index++) {
    const element = blocki[index]
    element.wall = true

  }





  // Block J
  blockj = [
    grid[39][11],
    grid[39][12],
    grid[39][13],
    // grid[39][14],
    // grid[39][15],
    grid[39][16],
    grid[39][17],

    grid[40][11],
    grid[40][12],
    // grid[40][13],
    // grid[40][14],//
    // grid[40][15],//
    grid[40][16],
    grid[40][17],

    grid[41][11],
    grid[41][12],
    // grid[41][13],
    // grid[41][14],//
    // grid[41][15],//
    grid[41][16],
    grid[41][17],

    grid[42][11],
    grid[42][12],
    grid[42][13],
    // grid[42][14],
    grid[42][15],
    grid[42][16],
    grid[42][17],
    grid[42][17],

    grid[43][10],
    grid[43][11],
    grid[43][12],
    grid[43][13],
    grid[43][14],
    grid[43][15],
    grid[43][16],
    grid[43][17],
    grid[43][18],

    grid[44][10],
    grid[44][11],
    grid[44][12],
    grid[44][13],
    grid[44][14],
    grid[44][15],
    grid[44][16],
    grid[44][17],
    grid[44][18],

    grid[45][10],
    grid[45][11],
    grid[45][12],
    grid[45][13],
    // grid[45][14],//
    grid[45][15],
    grid[45][16],
    // grid[45][17],//
    grid[45][18],

    grid[46][10],
    grid[46][11],
    grid[46][12],
    grid[46][13],
    // grid[46][14],//
    // grid[46][15],//
    // grid[46][16],//
    // grid[46][17],//
    grid[46][18],

    grid[47][10],
    grid[47][11],
    grid[47][12],
    grid[47][13],
    // grid[47][14],//
    grid[47][15],
    grid[47][16],
    grid[47][17],
    grid[47][18],
  ]
  for (let index = 0; index < blockj.length; index++) {
    const element = blockj[index]
    element.wall = true

  }

  // Block K
  blockk = [
    // grid[40][22],
    grid[40][23],
    grid[40][24],
    grid[40][25],
    grid[40][26],
    grid[40][27],
    grid[40][28],
    // grid[40][29],
    grid[40][30],
    grid[40][31],
    grid[40][32],
    grid[40][33],

    // grid[41][22],
    grid[41][23],
    grid[41][24],
    grid[41][25],
    grid[41][26],
    // grid[41][27],
    // grid[41][28],
    // grid[41][29],
    grid[41][30],
    grid[41][31],
    grid[41][32],
    grid[41][33],

    // grid[42][22],
    grid[42][23],
    grid[42][24],
    grid[42][25],
    grid[42][26],
    // grid[42][27],
    // grid[42][28],
    // grid[42][29],
    grid[42][30],
    grid[42][31],
    grid[42][32],
    grid[42][33],

    // grid[43][22],
    grid[43][23],
    grid[43][24],
    grid[43][25],
    grid[43][26],
    // grid[43][27],
    // grid[43][28],
    // grid[43][29],
    grid[43][30],
    grid[43][31],
    grid[43][32],
    grid[43][33],

    // grid[44][22],
    grid[44][23],
    grid[44][24],
    grid[44][25],
    grid[44][26],
    grid[44][27],
    grid[44][28],
    grid[44][29],
    grid[44][30],
    grid[44][31],
    grid[44][32],
    grid[44][33],

    // grid[45][22],
    grid[45][23],
    grid[45][24],
    grid[45][25],
    grid[45][26],
    // grid[45][27],//
    // grid[45][28],//
    // grid[45][29],//
    grid[45][30],
    grid[45][31],
    grid[45][32],
    grid[45][33],

    // grid[46][22],
    grid[46][23],
    grid[46][24],
    grid[46][25],
    grid[46][26],
    grid[46][27],
    // grid[46][28],//
    grid[46][29],
    grid[46][30],
    grid[46][31],
    grid[46][32],
    grid[46][33],

    // grid[47][22],
    grid[47][23],
    grid[47][24],
    grid[47][25],
    grid[47][26],
    // grid[47][27],//
    grid[47][28],
    // grid[47][29],//
    grid[47][30],
    grid[47][31],
    grid[47][32],
    grid[47][33],
  ]

  for (let index = 0; index < blockk.length; index++) {
    const element = blockk[index]
    element.wall = true

  }


  // Block L
  blockl = [
    // grid[26][26],
    // grid[26][27],
    // grid[26][28],
    // grid[26][29],
    grid[26][30],
    grid[26][31],
    grid[26][32],
    grid[26][33],
    grid[26][34],

    // grid[27][26],
    // grid[27][27],
    // grid[27][28],
    // grid[27][29],
    grid[27][30],
    // grid[27][31],//
    // grid[27][32],//
    // grid[27][33],//
    // grid[27][34],//

    grid[28][26],
    grid[28][27],
    grid[28][28],
    // grid[28][29],
    grid[28][30],
    grid[28][31],
    grid[28][32],
    grid[28][33],
    // grid[28][34],//

    grid[29][26],
    grid[29][27],
    grid[29][28],
    // grid[29][29],
    grid[29][30],
    grid[29][31],
    grid[29][32],
    grid[29][33],
    // grid[29][34],//

    // grid[30][26],
    // grid[30][27],
    // grid[30][28],
    // grid[30][29],
    grid[30][30],
    grid[30][31],
    grid[30][32],

    grid[31][26],
    grid[31][27],
    grid[31][28],
    // grid[31][29],
    // grid[31][30],
    // grid[31][31],
    // grid[31][32],

    grid[32][26],
    grid[32][27],
    grid[32][28],
    // grid[32][29],
    grid[32][30],
    grid[32][31],
    grid[32][32],

    grid[33][26],
    grid[33][27],
    grid[33][28],
    // grid[33][29],
    grid[33][30],
    grid[33][31],
    grid[33][32],

    grid[34][26],
    grid[34][27],
    grid[34][28],
    // grid[34][29],
    grid[34][30],
    grid[34][31],
    grid[34][32],

    grid[35][26],
    grid[35][27],
    grid[35][28],
    // grid[35][29],
    grid[35][30],
    grid[35][31],
    grid[35][32],



  ]

  for (let index = 0; index < blockl.length; index++) {
    const element = blockl[index]
    element.wall = true

  }







  openSet.push(start);


  console.log(grid);


}

function draw() {
  // alert("draw")

  if (openSet.length > 0) {

    var winner = 0
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    var current = openSet[winner]

    if (current === end) {

      noLoop()
      exitDraw = true
      console.log("Done")
    }

    removeFromArray(openSet, current)

    closedSet.push(current)

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;

        var newPath = false
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true
          }
        } else {
          neighbor.g = tempG;
          newPath = true
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h
          neighbor.previous = current;
        }



      }
      // neighbor.g = current.g+1
    }


    //We can keep going
  } else {
    console.log("No solution");
    // alert("No solution")
    noLoop()
    return;
    //no solution
  }


  // background(0)
  background(255)


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++)
      grid[i][j].show(color(255, 255, 255))
  }


  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 255, 255))
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(255, 255, 255))
  }



  //Find the path
  path = []
  var temp = current;
  path.push(temp)
  while (temp.previous) {
    path.push(temp.previous)
    temp = temp.previous;
  }


  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 255, 0))
  }
}