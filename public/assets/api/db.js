const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ceti2025',
    database:'basededatos'
});

connection.connect((err)=>{
    if(err) 
        throw err;
    console.log('Conectado a MySQL');
});

module.exports=connection;