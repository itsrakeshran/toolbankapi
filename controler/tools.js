import Tools from '../Model/tools.js'
import { v4 as uuidv4 } from 'uuid';

// const mySerialNumber = uuidv4().split('-')[0];
//     const currentId=mySerialNumber.toUpperCase();
//     req.body.tool=currentId;


//create tools
export const addTool= async(req,res)=>{
    //tool id genration
    const randomid=uuidv4().split('-')[0].toUpperCase();

    const tool=new Tools({
        toolid:randomid,
        title:req.body.title,
        category:req.body.category,
        quantity:req.body.quantity
    })
    try{
        await tool.save();
        res.status(200).json({"Msg":"sucess"})
    }catch(err){
        res.status(400).json({"Msg":"User Addition Not Sucess","err":err })
    }
        
}

//delete tools
export const removeTool= async(req,res)=>{
    // const data={
    //     toolid:req.body.toolid
    // }
    // console.log(data);
    console.log(req.body.toolid);
    try{
        await Tools.findOneAndDelete({toolid:req.body.toolid}); 
        res.status(200).json({"Msg":"success"})
    }catch(err){
        res.status(400).json({"Msg":"User Addition Not success","err":err })
    }    
}


// get all tools
export const getTool= async(req,res)=>{
    try{
        let tool= await Tools.find();
        res.status(200).json(tool)
    }catch(err){
        res.status(400).json({"Msg":"get al tools error","err":err })
    }    
}