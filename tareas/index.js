
const {app, BrowserWindow} = require('electron')

function createWindow(){

    let win = new BrowserWindow({
        width: 800,
        height:600,
        webPreferences:{
            nodeIntegration: true
        }
    })

    win.loadFile("index.html")
}

app.whenReady().then(createWindow)

app.on('ready',()=>{
    ipcMain.on('item-send',(event, data)=>{
        mydb.item_all()
    })
})