import express from "express";
import morgan from "morgan";
import employeersRoutes from "./routes/employeers.routes.js";
import "./config.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", employeersRoutes);
app.use((req, res) => {
  res.status(404).json({ msg: "Not found" });
});

export default app;
