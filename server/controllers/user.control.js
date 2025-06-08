import * as userServices from '../services/user.service.js';


export const updateUniversity = async (req,res)=>{
    const {user:{id}} = req;
    const payload = req.body;


    if(!payload) return res.status(400).json({message:"Invalid Inputs."});

    const response = await userServices.updateUniversity(id,payload);

    if(!response.success){
        return res.status(500).json({message:response.message});
    }

    res.status(200).json({updatedProfile:response.updatedProfile});
}
 
