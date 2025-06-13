import { supabaseService } from "../supabaseClient.js";

export const updateUniversity = async (id, payload={}) => {

  // programme_id = university's programme's id


       const {data,error} = await supabaseService.from("profiles").update(payload).eq('id',id).select();

      if(error){
        return {success: false, message: error.message};
      }

      if(data.length === 0){
        return {success:false,message:"No row found !!!"}
      }

      return {success:true, updatedProfile:data[0]};
  
};

export const getProfile = async (userId) =>{

   const {data,error} = await  supabaseService.from('profiles').select('*').eq('id',userId).single();

   if(error){
    return {user:null,error}
   }

   return {user:data,error:null};
}