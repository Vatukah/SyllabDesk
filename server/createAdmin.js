import { supabaseService } from "./services/supabaseClient.js";
import { Router } from "express";


  const createAdmin = Router();
  
createAdmin.get("/createAdmin",async (req,res)=>{

    try{

        const {data,error}=await supabaseService.auth.admin.createUser({
            email: 'anupamthakur058@gmail.com',
            password: 'anupamAdmin@supa',
            user_metadata: {
              role: 'admin',
              full_name: 'Anupam Thakur'
            },
            email_confirm: true,
            is_super_admin:true
          });

          if(error){
            throw error
          }

          res.status(200).json({data});
    }catch(error){
        res.json({status:"failed",message:error.message});
    }
  });

 export default createAdmin;