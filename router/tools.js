import express from "express";
import {addTool, removeTool, getTool} from '../controler/tools.js'



const router = express.Router()

router.post('/',addTool);
router.delete('/',removeTool);
router.get('/',getTool);

export default router;
