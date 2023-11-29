import { useRef, useState } from "react";
import cross from "../assets/icon-cross.svg";
import { useClickOutside, useKanban } from "../context/context";

const AddEditTask = () => {
  const {
    viewTaskDetails,
    newTask,
    kanban,
    currentPage,
    handleDialog,
     viewTaskIndex,
    handleViewTask,
    // handleViewTaskDropdown,
    handleSubtaskRemove,
    handleAddSubtask,
  } = useKanban();

  // const [titleChange, setTitleChange] = useState<string>(viewTaskDetails?.title)
  // const [descriptionChange, setDescriptionChange] = useState<string>(viewTaskDetails?.description)
  // const [subtaskchange, setSubtaskChange] = useState<Subtask[]>(viewTaskDetails?.subtasks)
  const [dropdown, setDropdown] = useState<string>(viewTaskDetails?.status);

  const handleSaveChanges = (component: string) => {
    handleDialog(component, currentPage);
  };

  
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    handleSaveChanges(newTask ? 'EditTask': "AddNewTask");
  };

  useClickOutside(ref, handleClickOutside);
  return (
    <div className="w-full flex justify-center items-center h-screen bg-secondary-700 absolute bg-opacity-50">
      <div ref={ref} className="flex flex-col w-[343px] p-6 bg-grey-400 rounded-md">
        <p className="text-secondary-700 text-lg font-bold mb-6">
          {newTask ? "Edit Task" : "Add New Task"}
        </p>
        <p className="text-grey-700 text-xs font-bold mb-2">Tittle</p>
        <input
          value={newTask ? viewTaskDetails?.title : ""} onChange={(e)=>handleViewTask({...viewTaskDetails, title: e.target.value},viewTaskIndex)}
          placeholder="e.g. Web Design"
          className="mb-6 placeholder:opacity-25 placeholder:text-secondary-700 w-[295px] h-10 rounded border text-secondary-700 text-[13px] font-medium leading-[23px] border-solid border-grey-700 outline-none px-4 py-2 border-opacity-25"
          type="text"
          id="boardName"
        />
        <p className="text-grey-700 text-xs font-bold mb-2">Description</p>
        <textarea
          value={newTask ? viewTaskDetails?.description : ""} onChange={(e)=>handleViewTask({...viewTaskDetails, description: e.target.value},viewTaskIndex)}
          placeholder="e.g. It’s always good to take a break. This 
          15 minute break will  recharge the batteries 
          a little."
          className="text-secondary-700 mb-6 placeholder:opacity-25 text-[13px] leading-[23px] font-medium w-[295px] h-[112px] rounded border border-solid border-grey-700 bg-grey-400 border-opacity-25 px-4 py-2 outline-none"
        ></textarea>
        <p className="text-grey-700 text-xs font-bold mb-2">Subtasks</p>

        {!newTask && (
          <div className="flex mb-3 w-[295px] gap-4 items-center ">
            <input
              className="w-[264px] h-10 rounded border border-solid border-grey-700 outline-none bg-grey-400 border-opacity-25 placeholder:opacity-25 placeholder:text-secondary-700 text-secondary-700 text-[13px] font-medium leading-[23px] px-4 py-2"
              type="text"
            />
            <img src={cross} alt="" />
          </div>
        )}

        {newTask &&
          viewTaskDetails?.subtasks.map((_subTask, index) => {

            return (
              <div className="flex mb-3 w-[295px] gap-4 items-center ">
                <input
                  value={_subTask.title} onChange={(e)=>{
                    const updatedSubtasks = [...viewTaskDetails.subtasks];
                    updatedSubtasks[index].title = e.target.value;
                    handleViewTask({...viewTaskDetails, subtasks: updatedSubtasks},viewTaskIndex)}}
                  className="w-[264px] h-10 rounded border border-solid border-grey-700 outline-none bg-grey-400 border-opacity-25 placeholder:opacity-25 placeholder:text-secondary-700 text-secondary-700 text-[13px] font-medium leading-[23px] px-4 py-2"
                  type="text"
                />
                <img
                  onClick={() => handleSubtaskRemove(index)}
                  className="cursor-pointer"
                  src={cross}
                  alt=""
                />
              </div>
            );
          })}

        <button
          onClick={handleAddSubtask}
          className="w-[295px] mb-6 h-10 rounded-[20px] bg-primary-700 bg-opacity-10 text-primary-700 flex items-center justify-center text-[13px] font-bold"
        >
          +Add New Subtask
        </button>

        {!newTask && (
          <p className="text-grey-700 text-xs font-bold mb-2">Status</p>
        )}
        {!newTask &&
          kanban.boards.map((board, index) => {
            if (board.name === currentPage) {
              return (
                <select
                  value={dropdown}
                  onChange={(e) => setDropdown(e.target.value)}
                  className="mb-2 w-[295px] h-10 rounded border border-solid outline-none px-4 py-2 text-[13px] font-medium leading-[23px] text-secondary-700 border-grey-700 border-opacity-25"
                >
                  {kanban.boards[index].columns.map((col) => {
                    return <option>{col.name}</option>;
                  })}
                </select>
              );
            }
          })}

        <div
          onClick={()=>handleSaveChanges(newTask ? 'EditTask': "AddNewTask")}
          className="w-[295px] mt-2 mb-2 h-10 rounded-[20px] bg-primary-700  text-grey-400 flex items-center justify-center text-[13px] font-bold"
        >
          {newTask ? "Save Changes" : "Create Task"}
        </div>
      </div>
    </div>
  );
};

export default AddEditTask;
