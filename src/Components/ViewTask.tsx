import { useRef, useState } from "react";
import hamburger from "../assets/icon-vertical-ellipsis.svg";
import { useKanban } from "../context/context";
import EditandDelete from "./EditandDeleteCard";
import { useClickOutside } from "../context/context";

const ViewTask = () => {
  const {
    handleDialog,
    kanban,
    dialogs,
    currentPage,
    viewTaskDetails,
    viewTaskIndex,
    countCompletedSubtasks,
    handleViewTaskCheckbox,
    handleDeleteBoard,
    handleNewTask,
    handleViewTaskDropdown
  } = useKanban();

  const [dropdown, setDropdown] = useState<string>(viewTaskDetails?.status);
  const handleEditandDeleteCard = (component: string) => {
    handleDialog(component, currentPage); // Call handleDialog to open NavbarDropdown
    handleDeleteBoard(true);
    handleNewTask(false);
    handleViewTaskDropdown(dropdown)
  };

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    handleEditandDeleteCard('ViewTask');
  };

  useClickOutside(ref, handleClickOutside);
  
  return (
    <div className="w-full flex justify-center items-center h-screen bg-secondary-700 absolute bg-opacity-50">
      <div ref={ref} className="flex flex-col w-[343px] md:w-[480px] p-6 bg-grey-400 dark:bg-secondary-500 rounded-md">
        <div className="flex gap-4 justify-between items-center mb-6">
          <p className="text-secondary-700 dark:text-grey-400 text-lg font-bold">
            {viewTaskDetails?.title}
          </p>
          <img
            onClick={() => handleEditandDeleteCard("EditandDeleteTask")}
            src={hamburger}
            alt=""
          />
        </div>
        <div className="absolute ml-24 mt-8 md:ml-56">
          {dialogs.EditandDeleteTask && <EditandDelete />}
        </div>
        <p className="text-grey-700 text-[13px] font-medium leading-[23px] mb-6">
          {viewTaskDetails?.description}
        </p>
        <p className="text-grey-700 dark:text-grey-400 text-xs font-bold mb-4">
          Subtasks({countCompletedSubtasks(viewTaskDetails)} of {viewTaskDetails?.subtasks.length})
        </p>
        {viewTaskDetails?.subtasks.map((subtask) => {
          return (
            <div className="w-[295px] md:w-full flex gap-4 items-center p-3 rounded bg-grey-500 dark:bg-secondary-600 mb-2">
              <input
                className=""
                type="checkbox"
                checked={subtask.isCompleted}
                onChange={() => handleViewTaskCheckbox(subtask,viewTaskIndex)}
                id={subtask.title}
              />
              <label
                htmlFor={subtask.title}
                className="text-secondary-700 dark:text-grey-400 font-bold text-xs"
              >
                {subtask.title}
              </label>
            </div>
          );
        })}

        <p className="text-xs font-bold text-grey-700 dark:text-grey-400 mt-6">Current Status</p>
        {kanban.boards.map((board, index) => {
          if (board.name === currentPage) {
            return (
              <select value={dropdown} onChange={(e)=>setDropdown(e.target.value)} className="mb-2 mt-3 w-[295px] md:w-full h-10 rounded border border-solid outline-none px-4 py-2 text-[13px] font-medium leading-[23px] text-secondary-700 dark:text-grey-400 dark:bg-secondary-500 border-grey-700 border-opacity-25">
                {kanban.boards[index].columns.map((col) => {
                  return <option>{col.name}</option>;
                })}
              </select>
            );
          }
        })}

        <button
          onClick={() => handleEditandDeleteCard("ViewTask")}
          className="rounded-[20px] md:w-full mt-5 bg-primary-700 dark:hover:bg-primary-700 dark:bg-grey-400 hover:bg-primary-700 hover:text-grey-400 bg-opacity-10 text-primary-700 w-[295px] h-10 flex justify-center items-center text-[13px] font-bold leading-[23px]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ViewTask;
