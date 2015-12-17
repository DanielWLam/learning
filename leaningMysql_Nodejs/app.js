/* 
 * @Author: daniel
 * @Date:   2015-12-15 13:06:41
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-17 17:21:01
 */

'use strict';
var mysql = require('mysql');

(function() {
    var con = mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "123456",
        database: 'antTest'
    });

    con.connect(function(err) {
        if (err) {
            console.log('Error connecting to DB');
            return;
        }
        console.log('Connection established!');
    })

    // con.query('SELECT * FROM employees', function(err, rows) {
    //     if (err) throw err;

    //     console.log('Data received from dv:\n');
    //     for(var i=0;i<rows.length;i++){
    //         console.log(rows[i].name)
    //     }
    // })

    var employee = [{
        name: 'Winnie',
        location: 'Autralia'
    }, {
        name: 'ddd',
        location: 'ddd'
    }];
    for (var i = 0; i < employee.length; i++) {
        con.query('INSERT INTO employees SET ?', employee[i], function(err, res) {
            if (err) throw err;
            console.log('Last insert ID:', res.insertId);
        })
    }


    // con.query(
    //     'UPDATE employees SET location = ? WHERE ID = ?',
    //     ["South Afrca",5],
    //     function(err,result){
    //         if(err)throw err;
    //         console.log('Changed '+result.changedRows+' rows');
    //     }
    //     )
    con.query(
        'DELETE FROM employees WHERE id = (?)', [6, 7],
        function(err, result) {
            if (err) throw err;
            console.log('Deleted ' + result.affectedRows + ' rows');
        }
    )

    con.end(function(err) {

    });
})()