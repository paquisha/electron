const { ipcMain, Menu, shell, BrowserWindow} = require('electron')

const template = [
    {
        role: 'help',
        submenu: [
            {
                label:"sobre nootros",
                click(){
                    //console.log('hola mundo')
                    shell.openExternal("https://github.com/paquisha")
                }
            },
            {
                role:'toggledevtools'
            }
        ]

    },
    {
        label: 'Debugging',
        submenu:[
            {
                label:'Negritas',
                click(){
                    //console.log('negritas')
                    const win = BrowserWindow.getFocusedWindow()
                    win.webContents.send('editor-channel', 'style-bold')
                }
            }
        ]        
    }
]

template.push(

)


ipcMain.on('editor-channel', (event, arg) =>{
    console.log("Mensaje recibido del canal editor-channel " + arg)
})
const menu = Menu.buildFromTemplate(template)

module.exports = menu