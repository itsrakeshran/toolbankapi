import User from "../Model/user.js";

// Add User
export const addUser=async(req,res)=>{
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:req.body.password,
        role:req.body.role,
        level_Of_mech:req.body.level_Of_mech
    })
    try{
        await user.save();
        res.status(200).json({"Msg":"User Addition Sucess"})
    }catch(err){
        res.status(400).json({"Msg":"User Addition Not Sucess","err":err })
    }
    
}

// login user
export const loginUser=async(req,res)=>{

    const data={"email":req.body.email,"password":req.body.password}
    try{
        let user=await User.findOne({"email":data.email});
        if(!user){
            res.status(400).json({"Msg":"User Doesn't Exist"})
        }

        //check passwrod
        if(user.password === data.password){
            res.status(200).json({email:user.email,role:user.role})
        }else{
            res.status(400).json({"Msg":"incorrect password"})
        }

    }catch(err){
        res.status(400).json({"Msg":"Accout with this id not foudn","err":err })
    }
    
}


//get user by email id
export const getUserByEmail=async(req,res)=>{
    const data={"email":req.body.email}
    try{
        let user=await User.findOne({"email":data.email},{"password":0,"_id":0});
        if(!user){
            res.status(400).json({"Msg":"User Doesn't Exist"})
        }
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({"Msg":"Accout with this id not foudn","err":err })
    }
}


//get user by email id
// export const getUserByEmail = async (req, res) => {
//     const data = { "email": req.params.email }
//     try {
//         let user = await User.findOne({ "email": data.email }, { "password": 0, "_id": 0 });
//         if (!user) {
//             return res.status(400).json({ "Msg": "User Doesn't Exist" });
//         }
//         return res.status(200).json(user);
//     } catch (err) {
//         return res.status(400).json({ "Msg": "Account with this id not found", "err": err });
//     }
// }

