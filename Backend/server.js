import express from 'express';
import {PORT,DB_URL} from './config/index.js';
import mongoose from 'mongoose';
import productRouter from './routes/productRoutes.js';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/product',productRouter)

mongoose.set('strictQuery',false)
mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() =>{
    console.log('Connected to Database');

    app.listen(PORT, () =>{
        console.log(`server running on port: http://localhost:${PORT}`);
    })
})
.catch((error) =>{
    console.log(`Error while connecting to database ${error.message}`);
})
