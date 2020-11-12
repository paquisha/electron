
const {app, BrowserWindow} = require('electron')

function createWindow(){

    let win = new BrowserWindow({
        width: 800,
        height:600,
        webPreferences:{
            nodeIntegration: true
        }
    })

    //win.loadURL("file://"+__dirname+"/dist/index.html")
    if(process.env.DEBUG){
        win.loadURL('http://localhost:8080/');        
    }
    else{
        win.loadURL("file://"+__dirname+"/dist/index.html");
    }

}

app.whenReady().then(createWindow)

app.on('ready',()=>{
    ipcMain.on('item-send',(event, data)=>{
        mydb.item_all()
    })
})