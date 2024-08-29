import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser"; 
import cors from 'cors'
import globalErrorHandler from "./controllers/errorController.js";

import AppError from "./utils/appError.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import adminRouter from "./routes/adminRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
const app = express();
//1) global middlewares
//Implement CORS(Headers)
//Access-Control-Allow-Origin : * (all requests no matter where they're coming from)
app.use(cors());
//allow non simple requests (patch/delete/options/uses cookies / non standard headers)
app.options('*',cors())
//set security http headers

app.use(helmet());

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//rate limiting
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, //1 hour
  message: "Too many requests, please try again in an hour",
});
app.use(limiter);
//body parser reads data from body into req.body, limit request body size
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//Server static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(`${__dirname}/public`));
//serving images
//http://localhost:8000/products/user-1723933583456-cover.jpeg
// Serving images with Cross-Origin-Resource-Policy header
app.use(
  "/products",
  express.static(path.join(__dirname, "public", "img", "products"), {
    setHeaders: (res) => {
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  })
);
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS(cross site scripting attacks)
app.use(xss());

// Prevent parameter pollution
//remove duplicate fields
app.use(
  hpp({
    //properties allowed to have duplicate fields in queryString
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/cart",cartRouter)
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
export default app;
