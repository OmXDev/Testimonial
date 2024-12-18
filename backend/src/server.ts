import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoute from'./router/user.route'
import connectDB from './utils/db';
import dotenv from 'dotenv'
import spaceRoute from './router/space.route'

dotenv.config({})
const app : express.Application = express()

const port: number = 5000;

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders:['content-type','Authorization'],
}))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/user',userRoute)
app.use('/api/user',spaceRoute)
 
// Server setup
app.listen(port, () => {
    connectDB()
    console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});