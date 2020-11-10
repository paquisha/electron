const { app, dialog } = require('electron')
const fs = require('fs')
const path = require('path')

module.exports.open_file = function(win){
    const option = {
        title: "Abrir archivo",
        filters:[
            {
                name:"archivo",
                extensions:['txt']
            }
        ]
    }

    paths = dialog.showOpenDialogSync(win,option)

    if(paths && paths.length > 0){
        const content = fs.readFileSync(paths[0]).toString()
        win.webContents.send('file-open',content)

        var filename = path.basename(paths[0]);
        win.webContents.send('title-change', app.name+" "+filename)
    }
}

module.exports.save_file = function(win,data){
    const option = {
        title: "Guardar archivo",
        filters:[
            {
                name:"archivo",
                extensions:['txt']
            }
        ]
    }

    path = dialog.showSaveDialogSync(win,option)
    console.log(path)
    fs.writeFileSync(path,data)

   /* dialog.showSaveDialog(win,option).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
    })*/

    console.log("Luego del dialogo")
}