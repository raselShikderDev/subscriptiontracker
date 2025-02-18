/* eslint-disable no-unused-vars */
import express from 'express';
import { config } from 'dotenv';
import userRoutes from './routes/user.routes';
import subscriptionRoutes from './routes/subscription.routes';
import authRouter from './routes/auth.routes';

// Load environment variables from .env file
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const port = process.env.PORT || 3000; 

const app = express();

// Hitting home route endpoint
app.get("/", (req, res) => {
    console.log("Welcome to subscription tracker");
    res.send("Welcome to Subscription tracker");
    console.log("Port:", port); 

});

app.listen(port, () => {
    console.log(`The app is running at http://localhost:${port}`);
});

export default app;
