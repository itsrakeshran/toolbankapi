import mongoose from "mongoose";

const toolSchema=new mongoose.Schema({
    toolid:{
        type:String,
        require:true,
        unique:true
    },
    title:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        enum:["Screw Driver", "Wrench","Plier","Hammer"],
    },
    quantity:{
        type:Number,
        require:true
    }
})

const Tools=mongoose.model('Tools',toolSchema)

export default Tools;
 