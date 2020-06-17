var mysql = require('mysql');
var db = {
    host     : 'localhost',
    port: 3306,
    user     : 'root',
    password : 'Root@123456',
    database : 'mysql'
  };
const mydb = mysql.createPool(db);
var  addSql = 'INSERT INTO users(Id,name,sex,age,country) VALUES(0,?,?,?,?)';
var  addSqlParams = ['feng', 'man', 29, 'CN'];
mydb.getConnection((e, connection) => {
    connection.query(addSql, addSqlParams, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result)
        connection.release();
    })
})