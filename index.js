require('dotenv').config()

const { app, BrowserWindow, globalShortcut } = require('electron')
const runServer = require("./server")
const server_port = process.env.SERVER_PORT || 1945
const client_port = process.env.CLIENT_PORT || 1945
const isDevelopment = process.env.NODE_ENV === 'development'

const db = require("./server/models")
const XRay = db.XRay

let mainWindow = null
    
if (!app.requestSingleInstanceLock()) app.quit()

app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
})
    
app.on('ready', () => {
    runServer(server_port, () => {})

    mainWindow = new BrowserWindow({
        show: false,
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: false,
    })

    if (isDevelopment) {
        mainWindow.loadURL(`http://localhost:${client_port}`)

    } else {
        mainWindow.loadURL(`http://localhost:${server_port}`)
    }

    mainWindow.focus()

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    if (isDevelopment) {
        globalShortcut.register('CommandOrControl+D', () => {
            mainWindow.webContents.openDevTools()
        })
    }

    globalShortcut.register('CommandOrControl+R', () => {
		mainWindow.reload()
	})

    globalShortcut.register('CommandOrControl+K', () => {
        XRay.destroy({
            where: {},
            truncate: true
        });

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