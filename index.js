import express from 'express'
import dbConnection from './conection.js';
import user from './router/user.js'
import tools from './router/tools.js'
import transactions from './router/transaction.js'
import cors from 'cors'
const PORT=8000
const app=express();

// app.use(cors());
app.use(express.json())
app.use(cors());
app.use('/api/user',user);
app.use('/api/tool',tools)
app.use('/api/transactions',transactions)

app.listen(PORT,console.log(`Server is runing on : ${PORT}`),dbConnection); 