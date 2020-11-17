const { app, BrowserWindow, ipcMain } = require('electron')
const mydb = require("./database")

function createWindow() {
    let win = new BrowserWindow(
        {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        }
    )

    //win.loadFile("index.html")
    // 
    if (process.env.DEBUG == 'true')
        win.loadURL('http://localhost:8080/');
    else
        win.loadURL('file://' + __dirname + '/dist/index.html');

    win.webContents.openDevTools()
    //console.log(__dirname)
    mydb.create_db()
}

app.whenReady().then(createWindow)

app.on('ready',()=>{
    ipcMain.on('item-send',(event, data)=>{
        mydb.item_all()
    })
})
