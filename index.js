require('dotenv').config()

const { app, BrowserWindow } = require('electron')
const runServer = require("./server")
let port = process.env.PORT || 1945

function createWindow () {
    runServer(port)

    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: false,
    })

    mainWindow.loadURL(`http://localhost:${port}/`)
    mainWindow.focus()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
