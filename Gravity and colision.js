function setup() {
  let Corpos = 2
  let Massa = 2*pow(10,12)
  createCanvas(500, 500);
  obs = [];
  for (a = 0; a < Corpos; a++){
    ob = {
      a:{x:0, y:0},
      v:{x:random(-2,2), y:random(-2,2)},
      s:{x:random(0,500), y:random(0,500)},
      M:Massa,
      D:0,
      Cor:{i:random(0, 255), j:random(0, 255), k:random(0, 255)}
    };
    ob.D = ob.M/(pow(10,11))
    append(obs, ob);
  }
}
function draw() {
  const G = 6.7*pow(10,-11);
  const e = 1
  background(0);
  noStroke();
  function dis(a,b) {
    dx = obs[b].s.x - obs[a].s.x;
    dy = obs[b].s.y - obs[a].s.y;
    dr = (dx**2 + dy**2)**(1/2);
    dto = [dx, dy, dr];
    return dto
  }
  function frc(a, b) {
    fr = G*(obs[a].M * obs[b].M)/dis(a,b)[2]**(2);
    fx = fr*dis(a,b)[0]/dis(a,b)[2];
    fy = fr*dis(a,b)[1]/dis(a,b)[2];
    fto = [fx, fy, fr];
    return fto
  }
  for (b = 0; b < obs.length; b++) {
    fill(obs[b].Cor.i, obs[b].Cor.j, obs[b].Cor.k);
    ellipse(obs[b].s.x, obs[b].s.y, obs[b].D);
  }
  for(c = 0; c < obs.length; c++) {
    obs[c].a.x = 0;
    obs[c].a.y = 0;
  }
  for (h = 0; h < obs.length; h++) {
    for (j = 0; j < obs.length; j++) {
      if (h != j) {
        obs[h].a.x += frc(h, j)[0]/obs[h].M;
        obs[h].a.y += frc(h, j)[1]/obs[h].M;
      }
    }
  }
  for (i = 0; i < obs.length; i++) {
    obs[i].v.x += obs[i].a.x;
    obs[i].v.y += obs[i].a.y;
    obs[i].s.x += obs[i].v.x;
    obs[i].s.y += obs[i].v.y;
  }
  for (d = 0; d < obs.length; d++){
    for (f = 0; f < obs.length; f++){
      if (dis(d,f)[2] <= (obs[d].D+obs[f].D)/2 & d < f){
        if (dis(d,f)[0] > 0){
          var v1x = obs[d].v.x;
          var v2x = obs[f].v.x;
          obs[d].v.x = ((obs[f].M*(v2x - e*(abs(v1x) + abs(v2x)))) + obs[d].M*v1x)/(obs[d].M+obs[f].M);
          obs[f].v.x = ((obs[d].M*(v1x + e*(abs(v1x) + abs(v2x)))) + obs[f].M*v2x)/(obs[d].M+obs[f].M);
        } else if (dis(d,f)[0] < 0){
          var v1x = obs[d].v.x;
          var v2x = obs[f].v.x;
          obs[d].v.x = ((obs[f].M*(v2x + e*(abs(v1x) + abs(v2x)))) + obs[d].M*v1x)/(obs[d].M+obs[f].M);
          obs[f].v.x = ((obs[d].M*(v1x - e*(abs(v1x) + abs(v2x)))) + obs[f].M*v2x)/(obs[d].M+obs[f].M);
        } if (dis(d,f)[1] > 0){
          var v1y = obs[d].v.y;
          var v2y = obs[f].v.y;
          obs[d].v.y = ((obs[f].M*(v2y - e*(abs(v1y) + abs(v2y)))) + obs[d].M*v1y)/(obs[d].M+obs[f].M);
          obs[f].v.y = ((obs[d].M*(v1y + e*(abs(v1y) + abs(v2y)))) + obs[f].M*v2y)/(obs[d].M+obs[f].M);
        } else if (dis(d,f)[1] < 0){
          var v1y = obs[d].v.y;
          var v2y = obs[f].v.y;
          obs[d].v.y = ((obs[f].M*(v2y + e*(abs(v1y) + abs(v2y)))) + obs[d].M*v1y)/(obs[d].M+obs[f].M);
          obs[f].v.y = ((obs[d].M*(v1y - e*(abs(v1y) + abs(v2y)))) + obs[f].M*v2y)/(obs[d].M+obs[f].M);
        }
      }
    }
  }
}