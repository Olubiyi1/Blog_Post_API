import express from "express"
import { globalErrorHandler } from "./errorHandlers/globalErrorHandler.js";
import { notFoundHandler } from "./errorHandlers/notFound.js";

const app = express()
app.use(express)


app.use(notFoundHandler)
app.use(globalErrorHandler)
export default app;
