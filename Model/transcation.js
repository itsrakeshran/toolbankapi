import mongoose from "mongoose";

const transcationSchema=new mongoose.Schema({
    mechEmail:{
        type:String,
        require:true,
    },
    toolId:{
        type:String,
        require:true
    },
    IssueDate:{
        type:String,
        require:true
    },
    transcationType:{
        type:String,
        enum:["Return","Issue"],
        require:true
    }
})

const Transcation=mongoose.model('Transcation',transcationSchema)

export default Transcation;
 