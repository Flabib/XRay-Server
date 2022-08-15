require('dotenv').config()

const { app, BrowserWindow, globalShortcut } = require('electron')
const runServer = require("./server")
let port = process.env.PORT || 1945

let mainWindow = null
    
if (!app.requestSingleInstanceLock()) app.quit()

app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
})
    
app.on('ready', () => {
    runServer(port, () => {})

    mainWindow = new BrowserWindow({
        show: false,
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: false,
    })

    mainWindow.loadURL(`http://localhost:${port}`)
    mainWindow.focus()

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    globalShortcut.register('CommandOrControl+R', () => {
		mainWindow.reload()
	})
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})