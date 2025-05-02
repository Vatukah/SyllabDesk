import  protect  from "../middleware/protect.js";

import { Router } from "express";


const dashboard = Router();


dashboard.get('/',protect,async(req,res)=>{
  const user = req.user;
//  const { board, course, semester } = req.query;

//   const { data, error } = await supabase
//     .from('materials')
//     .select('*')
//     .eq('board', board)
//     .eq('course', course)
//     .eq('semester', semester);

//   if (error) return res.status(500).json({ error: error.message });
  res.json({user:user});
})

export default dashboard