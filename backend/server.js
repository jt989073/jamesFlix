import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from './routes/movies.route.js'
import tvRoutes from './routes/tv.route.js'
import searchRoutes from './routes/search.route.js'
import  protectRoute  from "./middleware/protectRoute.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

const port = ENV_VARS.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/movie", protectRoute, movieRoutes);
app.use("/api/tv",protectRoute, tvRoutes);
app.use("/api/search",protectRoute, searchRoutes);

app.use((req, res) => {
  if (ENV_VARS.NODE_ENV === "development") {
    console.log(req.method, req.statusCode);
  }
});


app.listen(port, () => {
  console.log(`server started at local host: ${port}`);
  connectDB();
});

