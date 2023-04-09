const { app, BrowserWindow } = require('electron')
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
            preload: path.join(__dirname, 'src/preload.js')
        }
    })
    win.loadFile('src/index.html')
    win.webContents.openDevTools()
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })