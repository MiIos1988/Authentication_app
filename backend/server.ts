import * as dotenv from "dotenv";
dotenv.config();
import express from "express"
import mongoose  from "mongoose";
import cors from "cors";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
const portNumber = process.env.PORT;
const mongoDbUrl = process.env.MONGO_DB_URL;
const app = express();

if(mongoDbUrl){
  mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("Mongo DB is connected...");
  })
  .catch((err: any) => {
    console.log(err);
    console.log("Error while connecting to Mongo DB...");
  });
}

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(portNumber, (err?: any) => {
  err
    ? console.log("Error on server start...")
    : console.log(`Server is running on port ${portNumber}...`);
});
