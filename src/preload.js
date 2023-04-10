const { dialog } = require('electron')

window.api =  {
  selectObject: () => {
    console.log(require('electron'))
    let a = dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'PNG file', extensions: ['png']}
    ]
    }).then(result => {
      if(result.canceled || result.filePaths.length === 0) return null
      return result
    }).catch(err => {
      console.log(err)
    })
    console.log(a)
  }
}