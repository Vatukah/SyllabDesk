import { useAdmin } from "../contexts/providers/adminProvider";
import { useEffect, useState } from "react";
import StatCard from "../components/cards/statCard";
import WelcomeMessage from "../components/welcomeMessage";
import {
  AcademicCapIcon,
  ChartBarIcon,
  UserGroupIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import BarGraph from "../components/statGraph/barGraph";
import Loader from "../components/loader/loader";



export default function AdminDash() {
  const {loading,totalUsers} = useAdmin();
  const [chartData,setChartData] = useState({})
  const stats = [
    {
      icon: <UserGroupIcon className="w-6" />,
      label: "Total Users",
      value: totalUsers?.length,
    },
    {
      icon: <BookOpenIcon className="w-6" />,
      label: "Total Courses",
      value: null,
    },
    {
      icon: <AcademicCapIcon className="w-6" />,
      label: "Universities",
      value: null,
    },
    {
      icon: <ChartBarIcon className="w-6" />,
      label: "Active Students",
      value: "3",
    },
  ];

  const recentActivity = [
    "John enrolled in React Basics",
    "Sarah created 'UI Design Pro'",
    "Jane updated Python Fundamentals",
  ];
 

const getActiveUser = (user) => {
  if (!user?.last_sign_in_at) return null;



  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7); // Change to 1 if you really mean 1 day
  const threshold = sevenDaysAgo.getTime();

  const lastSignIn = new Date(user.last_sign_in_at).getTime();

  return lastSignIn > threshold ? user : null;
}




  if(loading) return <Loader/>
  return (
    <section className="p-md">
   
    <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,max-content))] gap-md justify-items-start my-md ">
      {stats.map((stats, index) => (
        <StatCard title={stats.label} icon={stats.icon} value={stats.value} key={index} />
      ))}
    </div>
   
  
     <BarGraph/>
 
  </section>);
}
