import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import roomRouter from "./routes/roomRouter.js";
import userRouter from "./routes/userRouter.js";
import dataRouter from "./routes/dataRouter.js";
import productRouter from "./routes/ProductRouter.js";
import productRouters from "./routes/ProductRouters.js";
import ErroThrow from "./middleware/error.js";
import connectDatabase from "./server.js"
import UserRouters from "./routes/userRoutes.js";
import orderRouters from "./routes/orderRouters.js";
import cloundinary from "cloudinary"
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)
})


dotenv.config();
const port = process.env.PORT || 5000

const app = express();



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    next()
})

app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


app.use('/user', userRouter);
app.use('/room', roomRouter);
app.use('/data', dataRouter);
app.use('/product', productRouter)

// new routers
app.use('/api/v1', productRouters)
app.use('/api/v1', UserRouters)
app.use('/api/v1', orderRouters)


app.use(ErroThrow)


app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }))
app.use((req, res) => res.status(404).json({ success: false, message: 'Not Found' }))

connectDatabase()

cloundinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})
const server = app.listen(port, () => console.log(`Server is listining on port : ${port}`))

process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Unhandled promise Rejection`);
    server.close(() => {
        server.exit(1);
    })
})