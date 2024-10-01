import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/index.middleware";
import api from "./api/index.api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cookieParser());

app.use("/api/", api);

app.use(notFound);
app.use(errorHandler);

export default app;
