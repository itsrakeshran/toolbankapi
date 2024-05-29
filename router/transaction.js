import express from "express";
import {addTransction,getTransaction,getTransactionByUID} from '../controler/transaction.js'


const router = express.Router()

router.post('/',addTransction);
router.get('/',getTransaction);
router.post('/byid',getTransactionByUID);


export default router;
