import { useEffect, useState } from "react";
import "./dashboard.css";
import WelcomeMessage from "../../components/welcomeMessage";
import banner1 from "../../assets/Education-pana.svg";
import StatCard from "../../components/cards/statCard";
import {
  AcademicCapIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import BookMarkCont from "../../components/bookmark/bookmarkContainer";
import ActionCard from "../../components/cards/actionCard";
import UniversityDialog from "../../components/dialogs/universityDialog";
import { useAuth } from "../../contexts/providers/authProvider";

const Dashboard = () => {
  const {user} = useAuth();

  const isUniversity = !!user?.university;
  const [isOpen, setIsOpen] = useState(false);

  const close = (value) => {
    setIsOpen(false);
    console.log(value);
  };
  const closeModel = () => {
    setIsOpen(false);
  };

  return (
    <div className=" p-sm">
      {isOpen && (
        <UniversityDialog
          isOpen={isOpen}
          close={close}
          closeModel={closeModel}
        />
      )}
      <div className="flex  justify-between w-full h-72 border border-[rgba(var(--accent-light),.8)] bg-[rgba(var(--accent-light),.5)] rounded-md overflow-hidden relative mb-md z-0">
        <img
          src={banner1}
          alt="Decorative Illustration"
          className="absolute left-0 -top-md opacity-40  object-contain w-full h-full pointer-events-none block md:invisible z-10"
        />
        <div className="mx-md my-auto z-20">
          {" "}
          <WelcomeMessage />
          <p class="text-gray-600">
            You’ve completed 4 of 6 modules. Let’s keep the momentum going!
          </p>
        </div>
        <img
          src={banner1}
          alt="Main Illustration"
          className="invisible md:visible absolute right-4 bottom-0 w-100 "
        />
      </div>
      <BookMarkCont />

      <div className="my-sm p-2 ">
        <h2 className="text-accent font-bold">Academic Details</h2>
        <div className="flex gap-md m-xs ">
          {isUniversity? (
            <>
              <StatCard
                title={"University"}
                icon={<AcademicCapIcon className="w-8" />}
                value={user.university?.name}
                isEditable={true}
                editAction={(e)=>{
                  e.stopPropagation();
                  setIsOpen(true);

                }}
              />
              <StatCard
                title={"Programme"}
                icon={<BookOpenIcon className="w-8" />}
                value={user.programme?.name}
                isEditable={true}
                editAction={(e)=>{
                  e.stopPropagation();
                  setIsOpen(true);

                }}
              />
              <StatCard
                title={"Semester"}
                icon={<BookOpenIcon className="w-8" />}
                value={user.semester}
                isEditable={true}
                editAction={(e)=>{
                  e.stopPropagation();
                  setIsOpen(true);

                }}
              />
            </>
          ) : (
            <div className="w-full">
              <ActionCard
                title={"Select Your University to Get Started"}
                para={
                  "Choose your university to access personalized course materials, schedules, and updates tailored just for you."
                }
                textAlign={"center"}
                actionText={"Choose Your University"}
                icon={<BuildingLibraryIcon className="w-8" />}
                action={() => setIsOpen(true)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
