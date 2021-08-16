const express = require("express");
const app = express();
const mysql = require("mysql");
require('dotenv').config();


const db = mysql.createConnection({
    
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
});




app.get('/',(req,res)=>{
    const sqlInsert =("select * from user;")
    
    db.query(sqlInsert,(err,result)=>{
        res.send("Datos mostrados");
        return console.log(result)
    })

}); 


app.listen(3001,()=>{
    console.log("running on port 3001");
});
