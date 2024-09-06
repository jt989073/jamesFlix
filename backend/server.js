import express from "express";
import authRoutes from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const port = ENV_VARS.PORT;

const app = express();

app.use(express.json());
app.use("/api", authRoutes);

app.use((req, res) => {
  if (ENV_VARS.NODE_ENV === "development") {
    console.log(req.method, req.statusCode);
  }
});

app.listen(port, () => {
  console.log(`server started at local host: ${port}`);
  connectDB();
});
