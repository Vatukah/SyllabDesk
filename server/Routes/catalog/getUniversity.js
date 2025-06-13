import { Router } from "express";
import supabase from "../../supabaseClient.js";

const getUniversity = Router();

getUniversity.get("/university",async(req,res)=>{

    const {data,error} = await supabase.from('universities').select("*");

    if(error){
        return res.status(404).json({message:"University not found"});
    }

    res.status(200).json({data});

})

export default getUniversity;