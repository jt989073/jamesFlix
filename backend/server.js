import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from './routes/movies.route.js'
import tvRoutes from './routes/tv.route.js'
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const port = ENV_VARS.PORT;

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/tv", tvRoutes);

app.use((req, res) => {
  if (ENV_VARS.NODE_ENV === "development") {
    console.log(req.method, req.statusCode);
  }
});

app.listen(port, () => {
  console.log(`server started at local host: ${port}`);
  connectDB();
});

