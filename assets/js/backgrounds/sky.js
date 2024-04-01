function padHex(val) { return util.zeroPad(Math.round(val).toString(16)); };
function lerp(a,b,t=0) { return t<=0 ? a : t>=1 ? b : a*(1-t) + b*t; };
function lerpHex(a, b, t=0) {
    if (t<=0) { return a; }
    else if (t >= 1) { return b; }
    else {
        const [r1, g1, b1] = a.match(/\w\w/g).map(x => parseInt(x, 16));
        const [r2, g2, b2] = b.match(/\w\w/g).map(x => parseInt(x, 16));
        const r3 = lerp(r1, r2, t);
        const g3 = lerp(g1, g2, t);
        const b3 = lerp(b1, b2, t);
        return "#"+padHex(r3)+padHex(g3)+padHex(b3);
    };
};

// Let the browser handle the animation cycles
var requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function( callback ){
           window.setTimeout(callback, 1000 / 30);
         };
})();

// draw a circle
function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  };
};

// fetch the background canvas
var background = document.getElementById("bgCanvas"),
    bgCtx = background.getContext("2d"),
    width = window.innerWidth,
    height = document.body.offsetHeight;

// define some standard colours
const daySky = "#87ceeb";
const sunsetSky = "#51a4d0";
const nightSky = "#0b1026";

// set the canvase size
background.width = width;
background.height = height;

// draw the night sky
bgCtx.fillStyle = nightSky;
bgCtx.fillRect(0, 0, width, height);

function Sun() {
  this.colour = "#ffff00";
}
Sun.prototype.update = function(dayFrac) {
  this.x=dayFrac*width;
  this.y=-Math.cos(Math.PI * 2 * dayfrac)*0.9*height;
  drawCircle(bgCtx, this.x, this.y, 20, this.colour)
}

const sun = new Sun();

// animate the background
function animate() {
  var now = new Date();
  var dayfrac = ((now.getSeconds()/60 + now.getMinutes())/60 + now.getHours())/24;
  // determine the sky colour
  sun.update(dayfrac);
  // fill the colour
  bgCtx.fillStyle = sunsetSky;
  bgCtx.fillRect(0, 0, width, height);
  // undo
  bgCtx.fillStyle = '#ffffff';
  bgCtx.strokeStyle = '#ffffff';

  //schedule the next animation frame
  requestAnimFrame(animate);
}

// call the first animation
animate();
