const PIXI = require("pixi.js")
const win = document.getElementById("window")
import global from "./global.js"

export default function start() {
    let app = new PIXI.Application({ width: global.window.width, height: global.window.height, background: "#FFFFFF" });
    win.appendChild(app.view)

    let sprite = PIXI.Sprite.from('../public/generic.png');
    app.stage.addChild(sprite);

    // Add a ticker callback to move the sprite back and forth
    let elapsed = 0.0;
    app.ticker.add((delta) => {
        elapsed += delta;
    });
}