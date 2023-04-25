const dialog = require("dialogs")()
const {Peer} = require("peerjs")
import { User } from "./user.js"
import global from "./global.js"

// god forgive me for what im about to do

const genRand = (len) => {
  return Math.random().toString(36).substring(2,len+2);
}


export default function runServer() {
    const can = document.querySelector("#window > canvas")
    const stream = can.captureStream(25)

    let id = genRand(8)
    navigator.clipboard.writeText(id).then(
        () => dialog.alert("the current ID of the server is " + id + "\n(copied to clipboard)"),
        () => dialog.alert("the current ID of the server is " + id + "\ncould not be copied to clipboard (app wasnt focused)")
    )

    let peer = new Peer("itch-app-connection-id-"+id);
    global.peer = peer

    peer.on("open", id=> {
        peer.on('connection', conn => {
          global.connections.push(conn)
          let user = new User(conn.peer, conn)
          peer.call(conn.peer, stream)
          conn.on('data', data => {
            if(data.mouseDown)user.mouse_down()
            if(data.mouseUp)user.mouse_up()
            if(data.keyDown)user.key_down(data.keyDown)
            if(data.keyUp)user.key_up(data.keyUp)
            if(data.mousePos)user.mouse_pos = data.mousePos
            if(data.answer) user.answer(data.answer)
            if(data.join) user.join()
            if(data.quit) user.quit()
          });
        //   conn.on("")
        });
      })
}


