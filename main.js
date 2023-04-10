const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require("path")
console.log(path.join(__dirname, 'src/preload.js'))


app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        resizable: true,
        minWidth: 1200,
        minHeight: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    })
    win.loadFile('src/index.html')
    win.webContents.openDevTools()
})

ipcMain.handle("showDialog", (event) => {
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
    return a
  })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })