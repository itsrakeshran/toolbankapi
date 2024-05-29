import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobile:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String ,
        enum : ['ADMIN','MECH'],
        require:true
    },
    level_Of_mech:
    {
        type:String,
        enum : ['Expert','Medium','New Recruit', 'Trainee'],
    }
})

const User=mongoose.model('User',userSchema)

export default User; 