import { useEffect, useRef } from "react";
import AddTopicsForm from "../forms/addTopicForm";

export default function AddTopicDialog({ open, close }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      const dialog = dialogRef.current;
      if (!open) dialog.showModel();
      const handleClose = (e) => close?.(dialog.returnValue);
      dialog.addEventListener("close", handleClose);

      return () => dialog.removeEventListener("close", handleClose);
    } else {
      const dialog = dialogRef.current;
      if (dialog.open) dialog.close();
    }
  }, [open, close]);

  return <dialog ref={dialogRef} className=" w-full h-full fixed top-0 left-0 z-30 bg-transparent  md:py-xs">
     <div className="p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Topic</h2>
      <AddTopicsForm/>
       </div>
  </dialog>;
}
