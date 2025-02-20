import express from 'express';
import { config } from 'dotenv';
import userRoutes from './routes/users.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import connectDatabse from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware.js';
import arcjetMiddleware from './middlewares/arcjetMiddleware.js';
import workflowRouter from './routes/workflow.routes.js';


config(); 
const port = process.env.PORT || 3000; 
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/scriptionRoutes", subscriptionRoutes)
app.use("/api/v1/workfolows", workflowRouter)

app.use(errorMiddleware)

// Hitting home route endpoint
app.get("/", (req, res) => {
    console.log("Welcome to subscription tracker");
    res.send("Welcome to Subscription tracker");
    console.log("Port:", port); 
});

app.listen(port, async() => {
    console.log(`The app is running at http://localhost:${port}`);
    await connectDatabse()
});

export default app;
