const { app, BrowserWindow } = require('electron')




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
        }
    })
    win.loadFile('src/index.html')
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })