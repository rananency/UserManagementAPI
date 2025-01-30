const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/users', userRoutes);

app.listen(3000,()=>{
    console.log("server started")
})