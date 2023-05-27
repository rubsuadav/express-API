import { Router } from "express";
import {
  getEmployeers,
  getEmployeerById,
  createEmployeers,
  updateEmployeers,
  deleteEmployeers,
} from "../controllers/employeers.controller.js";

const router = Router();

router.get("/employeers", getEmployeers);
router.get("/employeers/:id", getEmployeerById);
router.post("/employeers", createEmployeers);
router.put("/employeers/:id", updateEmployeers);
router.delete("/employeers/:id", deleteEmployeers);

export default router;
