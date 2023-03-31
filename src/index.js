
const PIXI = require("pixi.js")

function resize() {
  console.log("TEST")
}

let win = document.getElementById("window")

document.body.onresize = resize;

let app = new PIXI.Application({ width: 640, height: 480 });
app.view.style += {"position": "absolute"}
win.appendChild(app.view)

let sprite = PIXI.Sprite.from('../public/vertical.png');
app.stage.addChild(sprite);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  sprite.x = 0;
});

win.addEventListener("click", (event) => {
  console.log("test")
})
win.addEventListener("resize", (event) => {
  console.log("1234")
  //this.height = this.width * 9 / 16;
}, true)