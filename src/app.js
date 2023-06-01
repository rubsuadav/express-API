import express from "express";
import morgan from "morgan";
import cors from "cors";
import employeersRoutes from "./routes/employeers.routes.js";
import listEndpoints from "express-list-endpoints";
import "./config.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", employeersRoutes);

//MUESTRA TODAS LAS RUTAS DISPONIBLES
app.get("/", (req, res) => {
  const routes = listEndpoints(app).map((route) => {
    return {
      path: route.path,
      methods: route.methods,
      };
  });
  res.json({ routes });
});

app.use((req, res) => {
  res.status(404).json({ msg: "Not found" });
});

export default app;
