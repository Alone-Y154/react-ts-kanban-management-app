import { useRef } from "react";
import { useClickOutside, useKanban } from "../context/context";

const Delete = () => {

  const {viewTaskDetails, deleteBoard, handleDeleteCurrentBoard,  currentPage, handleDialog, handleDeleteViewTask, viewTaskIndex} =useKanban();

  const ref = useRef<HTMLDivElement>(null);

  const handleDelete = (component: string) => {
    handleDialog(component, currentPage); // Call handleDialog to open NavbarDropdown
  }

  const handleClickOutside = () => {
    handleDelete("DeleteTask")
  };
  
  const handleDeleteTask = () => {
    handleDeleteViewTask(viewTaskDetails, viewTaskIndex)
    handleClickOutside();
  }

  const handleDeleteBoard = () => {
    handleDeleteCurrentBoard();
    handleClickOutside()
  }
  useClickOutside(ref, handleClickOutside);
  return (
    <div className="w-full flex justify-center items-center h-screen bg-secondary-700 absolute bg-opacity-50">
      <div ref={ref} className="flex flex-col w-[343px] md:w-[480px] h-[284px] md:h-[229px] p-6 bg-grey-400 rounded-md">
        <p className="text-danger-700 mb-6 text-lg font-bold">{deleteBoard ? "Delete this board":"Delete this task?"}</p>
        <p className="text-[13px] mb-6 text-grey-700 font-medium leading-[23px]">
          {deleteBoard ? `Are you sure you want to delete the ‘${currentPage}’ board? This action will remove all columns and tasks and cannot be reversed.`:` Are you sure you want to delete the ‘${viewTaskDetails?.title}’ task and its
          subtasks? This action cannot be reversed.`}
        </p>
        <div className="flex md:flex-row flex-col md:gap-4 md:items-center ">
        <button onClick={deleteBoard ? handleDeleteBoard :handleDeleteTask } className="rounded-[20px] md:w-[200px] bg-danger-700 text-grey-400 w-[295px] h-10 flex justify-center items-center text-[13px] font-bold leading-[23px] mb-4 md:mb-0">Delete</button>
        <button onClick={handleClickOutside} className="rounded-[20px] bg-primary-700 bg-opacity-10 md:w-[200px] text-primary-700 w-[295px] h-10 flex justify-center items-center text-[13px] font-bold leading-[23px] ">cancel</button>
        </div>
        
      </div>
    </div>
  );
};

export default Delete;
