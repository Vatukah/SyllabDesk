import {
    HomeIcon,
    UsersIcon,
    AcademicCapIcon,
    UserGroupIcon,
    BookOpenIcon,
    ClipboardDocumentListIcon,
    BuildingOfficeIcon,
    ChartBarIcon,
    Cog6ToothIcon,
  } from "@heroicons/react/24/outline";
  
  export const adminNavigationLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: HomeIcon },
    { name: "Users", path: "/admin/users", icon: UsersIcon },
   
  
    { name: "Courses", path: "/admin/courses", icon: BookOpenIcon },
   
    { name: "Universities", path: "/admin/universities", icon: BuildingOfficeIcon },
    { name: "Reports", path: "/admin/reports", icon: ChartBarIcon },
    { name: "Settings", path: "/admin/settings", icon: Cog6ToothIcon },
  ];
  