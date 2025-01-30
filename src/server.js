const express = require('express');
const connectDB = require('./config/database');

const app = express();

connectDB();

app.listen(3000,()=>{
    console.log("server started")
})