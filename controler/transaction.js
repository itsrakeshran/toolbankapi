import User from "../Model/user.js";
import Tools from "../Model/tools.js"
import Transcation from "../Model/transcation.js";






// Add Transcation
// export const addTransction=async(req,res)=>{ 
//     console.log(req.body);
//     //store req data
//     const date = new Date();
//     const today=date.toDateString();
//     const tData={
//         "mechEmail":req.body.mechEmail,
//         "toolId":req.body.toolId,
//         "IssueDate":today,
//         "transcationType":req.body.type,
//     }


//     //update stock function
//     const updateStock=async (type,currentqty)=>{
//         if(type === "Return"){
//             const remaining_qty=currentqty+1
//             console.log(remaining_qty);
//             await Tools.findOneAndUpdate({toolid:tData.toolId},{$set:{quantity:remaining_qty}})
//         }else{
//             const remaining_qty=currentqty-1
//             await Tools.findOneAndUpdate({toolid:tData.toolId},{$set:{quantity:remaining_qty}})
//         }
//         res.status(200).json({"msg":"Transaction Sucessfull"});
//     } 


//     //verify mechanic id
//     try{
//         let foundMech=await User.findOne({email:tData.mechEmail})

//         if(!foundMech){
//             res.status(400).json({"Msg":"User not foud with this id"})
//         }

//         if(!foundMech.role==='MECH'){
//             res.status(400).json({"Msg":"User is not mechanic"})
//         }

//     }catch(err){
//             res.status(400).json({"Msg":"User find error"})
//     }

//     //tooid  validation
//     try{
//         let toolFound = await Tools.findOne({toolid:tData.toolId})
//         if(!toolFound){
//             res.status(400).json({"Msg":"There is not tool with this id"}) 
//         }
        
//         if(toolFound.quantity <= 0){
//             res.status(200).json({"Msg":"tool out of stock"})
//         }

//         updateStock(tData.transcationType,toolFound.quantity);

//     }catch(err){
//             res.status(400).json({"Msg":"Tool verify error","err":err})
//     }

//     //transaction Sucess
//     let transaction=new Transcation(tData);
//     transaction.save();
   
// }


//Add transaction

export const addTransction = async (req, res) => {
    console.log(req.body);
    const date = new Date();
    const today = date.toDateString();
    const tData = {
        mechEmail: req.body.mechEmail,
        toolId: req.body.toolId,
        IssueDate: today,
        transactionType: req.body.type,
    }
    

    //update stock function
    const updateStock = async (type, currentqty) => {
        let remaining_qty;
        if (type === "Return") {
            remaining_qty = currentqty + 1;
        } else {
            remaining_qty = currentqty - 1;
        }
        await Tools.findOneAndUpdate({ toolid: tData.toolId }, { $set: { quantity: remaining_qty } });
        res.status(200).json({ "msg": "Transaction Successful" });
    }

    //verify mechanic id
    try {

        let foundMech = await User.findOne({ email: tData.mechEmail });
        if (!foundMech) {
            return res.status(400).json({ "Msg": "User not found with this id" });
    
        }
        if (foundMech.role !== 'MECH') {
            return res.status(400).json({ "Msg": "User is not a mechanic" });
        }
       

    } catch (err) {
        return res.status(400).json({ "Msg": "User find error" });
    }

    //toolId validation
    try {
 
        let toolFound = await Tools.findOne({ toolid: tData.toolId });
        if (!toolFound) {
            return res.status(400).json({ "Msg": "There is no tool with this id" });
        }

        if (toolFound.quantity <= 0) {
            return res.status(200).json({ "Msg": "Tool out of stock" });
        }
        console.log(tData.transactionType, toolFound.quantity);
        await updateStock(tData.transactionType, toolFound.quantity);

    } catch (err) {
        return res.status(400).json({ "Msg": "Tool verify error", "err": err });
    }

    //transaction Success
    let transaction = new Transcation(tData);
    await transaction.save();
}

// get all transaction

export const getTransaction=async(req,res)=>{
    try{
        let transaction=await Transcation.find();
        res.status(200).json(transaction)
    }catch(err){
        res.status(400).json({"msg":"fet transaction error"});
    }
}


// get transaction by user id
// query:db.transcations.aggregate([{$group:{_id:"$mechEmail",tools:{$push:"$toolId"}}}])

export const getTransactionByUID= async(req,res)=>{
    try{
        let transaction=await Transcation.aggregate([{$match:{mechEmail:req.body.email}},{$group:{_id:"$mechEmail",tools:{$push:{toolId: "$toolId",date: "$IssueDate"}}}}]);
        res.status(200).json(...transaction)
    }catch(err){
        res.status(400).json({"msg":"fet transaction error"});
    }
}
 
