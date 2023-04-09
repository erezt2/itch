const { contextBridge, dialog } = require('electron')

window.api =  {
  test: () => {console.log(123)}
}