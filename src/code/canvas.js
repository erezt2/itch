const {Application} = require("pixi.js")
const win = document.getElementById("window")
import global from "./global.js"

export default function start() {
    let app = new Application({ width: global.window.width, height: global.window.height, background: "#FFFFFF" });
    win.appendChild(app.view)


    // Add a ticker callback to move the sprite back and forth
    let elapsed = 0.0;
    app.ticker.add((delta) => {
        elapsed += delta;
    });
    // let bg= new PIXI.Sprite(PIXI.Texture.WHITE)
    // bg.width = global.window.width
    // bg.height = global.window.height
    // bg.eventMode = "static"
    // bg.on("pointermove", (event)=>{
    //     console.log(event)
    //     global.mouse_pos = { 
    //         x: event.clientX,
    //         y: event.clientY
    //     }
    // })
    app.stage.eventMode = "static"
    // app.stage.addChild(bg)
    return app;
}