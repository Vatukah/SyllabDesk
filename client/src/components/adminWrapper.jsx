import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAdmin } from "../contexts/providers/adminProvider";

export default function AdminWrapper (){
 const {init} = useAdmin();

  useEffect(()=>{
    init();
   
  },[])
    return(
        <>
        <Outlet/>
        </>
    )
}