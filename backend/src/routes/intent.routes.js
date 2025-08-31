import express from "express";
import  {detectIntent} from "../controllers/intent.controller.js";

const router = express.Router();

router.post("/detect-intent", detectIntent);

export default router;
