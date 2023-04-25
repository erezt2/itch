const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require("path")

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
            sandbox:false,
        }
    })
    win.loadFile('./src/index.html')
    win.webContents.openDevTools()
    // ipcMain.handle("runThread", (event, _function, arguments) => {
    //   const worker = new Worker('./src/code/worker-thread.mjs', { workerData: {function: _function, arguments: arguments} })
    // })
})

ipcMain.handle("showDialog", (event, filter) => {
  let a = dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [
    filter
  ]
  }).then(result => {
    if(result.canceled || result.filePaths.length === 0) return null
    return result
  }).catch(err => {
    console.log(err)
  })
  return a
})


ipcMain.handle("homeDir", (event) => {
  return __dirname
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })