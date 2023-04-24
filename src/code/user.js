import global from "./global.js"

const Key = Object.freeze({
    none: 0,
    down: 1,
    hold: 2,
    up: 3,
});

const key_list = {
    32:"space",
    37:"arrow left",
    38:"arrow up",
    39:"arrow right",
    40:"arrow down",	
    48:"0",
    49:"1",
    50:"2",
    51:"3",
    52:"4",
    53:"5",
    54:"6",
    55:"7",	
    56:"8",	
    57:"9",
    65:"a",
    66:"b",	
    67:"c",	
    68:"d",
    69:"e",	
    70:"f",	
    71:"g",
    72:"h",	
    73:"i",	
    74:"j",	
    75:"k",
    76:"l",
    77:"m",	
    78:"n",	
    79:"o",	
    80:"p",	
    81:"q",	
    82:"r",	
    83:"s",	
    84:"t",
    85:"u",	
    86:"v",	
    87:"w",
    88:"x",
    89:"y",
    90:"z",
}

var user = 0

export default class User {
    static users = {}
    userID = 0
    mouse_pos
    constructor() {
        this.userID = user
        user += 1
        this.mouse_pos = {x: 0, y: 0}
        this.keys = {}
        for(let i of Object.keys(key_list)) this.keys[i] = Key.none
        global.users[this.userID] = this
    }
}