import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//entry server.js

//synchronous code problems | catch at entry
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  //we have to just shutdown we can't use the other method
  //node process is in an unclean state must restart
  process.exit(1);
});

//import config before app
dotenv.config({ path: "./config.env" });

import app from "./app.js";
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("DB connection successful!"));
const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//db doesn't work for example
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  //asynchronous problems
  //shutdown gracefully
  //let server handle next requests
  //then close this process
  //deployment tools will restart the server automatically
  server.close(() => {
    process.exit(1);
  });
});
//SIGTERMINATE BY OS HANDLING
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
