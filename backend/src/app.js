import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10Kb" }));
app.use(express.static("public"));
app.use(cookieParser());




// importing routes
import userRouter from './routes/user.routes.js'
import outpassRouter from './routes/outpass.routes.js'
// routes declartionation
app.use("/api/v1/users", userRouter)
app.use("/api/v1/outpass", outpassRouter)





export { app };
