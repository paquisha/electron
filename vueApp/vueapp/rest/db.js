const mysql = require('mysql')

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'task'
});


module.exports.getTasks = function (callback) {
    if (connection) {
        connection.query('SELECT * from tasks', (err, rows) => {
            if (err) {
                throw err
            } else {
                callback(rows)
            }
        })
    }
}

module.exports.getTask = function (id, callback) {
    if (connection) {
        connection.query('SELECT * from tasks WHERE id=?', id, (err, rows) => {
            if (err) {
                throw err
            } else {
                if (rows.length)
                    callback(rows[0])
                else
                    callback({})
            }
        })
    }
}

module.exports.insertTask = function (dataTask, callback) {
    if (connection) {
        connection.query('INSERT INTO tasks SET ?', dataTask, (err, results, fields) => {
            if (err) {
                throw err
            } else {
                callback({
                    'id': results.insertId
                })
            }
        })
    }
}

module.exports.updateTask = function (id, dataTask, callback) {
    if (connection) {
        connection.query('UPDATE tasks SET ? WHERE id = ?', [dataTask, id], (err, results, fields) => {
            if (err) {
                throw err
            } else {
                callback({
                    'id': id
                })
            }
        })
    }
}

module.exports.deleteTask = function (id, callback) {
    if (connection) {
        connection.query('DELETE FROM tasks WHERE id = ?', id , (err, results, fields) => {
            if (err) {
                throw err
            } else {
                callback({
                    'id': id
                })
            }
        })
    }
}