require('dotenv').config();
const express=require('express');
const app=express();

//inbuilt express error management
require('express-async-errors')

//rest of packages
const morgan=require('morgan')//middleware
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')

//middlewares
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')
const { authenticateUser } = require('./middleware/authentication')

const connectDB=require('./db/connect');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
//app.use(express.static());
app.use(fileUpload());

//import routers
const authRouter=require('./routes/authRoutes')


//routes
app.get('/',(req,res)=>{
    res.send("hello");
})

app.use('/api/v1/auth',authRouter)



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);//this should always come affter notfound error

const PORT=5005;

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`server is listening at ${PORT}`)
        })
    }
    catch(err){
        console.log(err);
    }
}

start();