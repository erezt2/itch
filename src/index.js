const Split = require("split-grid")
console.log("im here!@")

Split({
    minSize: 400,
    snapOffset: 10,
    columnGutters: [{
      track: 1,
      element: document.querySelector('.gutter-col'),
    }]
  })