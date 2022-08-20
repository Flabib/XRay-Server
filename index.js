require('dotenv').config()
const { app, BrowserWindow, globalShortcut, Menu, MenuItem } = require('electron');
const runServer  = require('./server');
const db  = require('./server/models');

const server_port = process.env.SERVER_PORT || 1945;
const client_port = process.env.CLIENT_PORT || 1928;
const isDevelopment = process.env.NODE_ENV === 'development';
const XRay = db.XRay;

let mainWindow = null;
    
if (!app.requestSingleInstanceLock()) app.quit();

app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();

    mainWindow.focus();
})
    
app.on('ready', () => {
    runServer(server_port, () => {});

    mainWindow = new BrowserWindow({
        show: false,
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: false,
    });

    if (isDevelopment) {
        mainWindow.loadURL(`http://localhost:${client_port}`);
    } else {
        mainWindow.loadURL(`http://localhost:${server_port}`);
    }

    mainWindow.focus();

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    })

    const menu = new Menu()
    menu.append(new MenuItem({
        label: 'View',
        submenu: [
            {
                role: 'reload',
                accelerator: 'CommandOrControl+R',
            },
            {
                label: 'Clear',
                accelerator: 'CommandOrControl+K',
                click: () => {
                    XRay.destroy({
                        where: {},
                        truncate: true
                    });

                    mainWindow.reload();
                }
            },
            ...(isDevelopment ? [
                {
                    role: 'toggleDevTools',
                    accelerator: 'CommandOrControl+D',
                },
            ] : []),
        ]
    }))

    Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') return;

    app.quit();
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
})