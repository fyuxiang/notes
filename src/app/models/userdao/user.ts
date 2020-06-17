import mysql from 'mysql';
import {db} from '../../../util/util'
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