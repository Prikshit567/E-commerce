const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary")

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

const connectToMongo  = require("./db")

// Config

dotenv.config({path:"backend/config/config.env"})

// Connecting to Database

connectToMongo();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT,()=>{

    console.log(`Server running on port https://localhost:${process.env.PORT}  ` )
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });