import supabase from "../../services/supabaseClient.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { Router } from "express";

const courses = Router();

courses.get('/courses',requireAdmin,async(req,res)=>{
    const {data,error} = await supabase.from("courses").select("*");

    if(error){
        return res.status(500).json({message:"failed to fetch course"})
    }

    res.status(200).json({data})
});

export default courses