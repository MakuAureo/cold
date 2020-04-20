			Gravidade do Mouse

function setup() {
  createCanvas(500, 500);
  ob = [
    [0, 0],
    [0, 0],
    [random(0, 500), random(0, 500)], 100
  ];
}

function draw() {
  background(220);
  strokeWeight(20);
  point(ob[2][0], ob[2][1]);
  var mo = [mouseX, mouseY];
  var F = [mo[0] - ob[2][0], mo[1] - ob[2][1]];
  for (i = 0; i < ob.length - 1; i++) {
    for (j = 0; j < ob[0].length; j++) {
      if (i == 0) {
        ob[i][j] = F[j] / ob[3];
      } else {
        ob[i][j] += ob[i - 1][j];
      }
    }
  }
}