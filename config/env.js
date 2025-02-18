import { config } from "dotenv";

// Load environment variables
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { port, NODE_ENV } = process.env;

console.log('Loaded PORT:', port); // This will log the PORT value from your .env file
