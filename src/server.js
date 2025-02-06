import express from 'express';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

connectDB();

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }
  next();
});

app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(3000,()=>{
    console.log("server started")
})