			Chuva (com vento personalizavel)

function setup() {
  createCanvas(500, 500);
  air = random(-10, 10);
  obs = [];
  for (i = 0; i < 800; i++) {
    var array = [
      [0, 1],
      [air, random(1, 40)],
      [random(-100, 600), random(-200, -50)]
    ];
    append(obs, array);
  }
}

function draw() {
  background(25);
  strokeWeight(1);
  stroke(0, 110, 220);
  air *= random(0.85, 1.15);
  if (air > 10 || air < -10) {
    air *= random(0.7, 0.9);
  }
  if (air > -0.8 & air < 0.8) {
    air *= -random(1.1, 1.15);
  }
  for (a = 0; a < obs.length; a++) {
    line(obs[a][2][0], obs[a][2][1], obs[a][2][0] + air, obs[a][2][1] + 15);
  }
  for (i = 0; i < obs.length; i++) {
    for (j = 1; j < obs[0].length; j++) {
      for (k = 0; k < obs[0][0].length; k++) {
        obs[i][j][k] += obs[i][j - 1][k];
      }
    }
  }
  for (l = 0; l < obs.length; l++) {
    if (obs[l][2][1] > 500) {
      obs[l] = [
        [0, 1],
        [air, random(1, 40)],
        [random(-100, 600), -15]
      ];
    }
  }
}