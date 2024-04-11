var mysql=require("mysql")
var pool=mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'ANKIT123',
    database:'electronicsdb',
    connectionLimit:100,
    multipleStatements:'true',

})
module.exports=pool