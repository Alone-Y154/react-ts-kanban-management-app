import hamburger from "../assets/icon-vertical-ellipsis.svg"
import { useKanban } from "../context/context";
import EditandDelete from "./EditandDeleteCard";

const ViewTask = () => {

  const {handleDialog, kanban, dialogs, currentPage, viewTaskDetails, countCompletedSubtasks,handleViewTaskCheckbox, handleDeleteBoard, handleNewTask} = useKanban();
  const handleEditandDeleteCard = () => {
    handleDialog('EditandDeleteTask', currentPage); // Call handleDialog to open NavbarDropdown
    handleDeleteBoard(true);
    handleNewTask(false);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen bg-secondary-700 absolute bg-opacity-50">
    <div className="flex flex-col w-[343px] p-6 bg-grey-400 rounded-md">
       <div className="flex gap-4 justify-between items-center mb-6">
        <p className="text-secondary-700 text-lg font-bold">{viewTaskDetails?.title}</p>
        <img onClick={handleEditandDeleteCard} src={hamburger} alt=""/>
       </div>
       <div className="absolute ml-24 mt-14">
       {dialogs.EditandDeleteTask && <EditandDelete />}
       </div>
       <p className="text-grey-700 text-[13px] font-medium leading-[23px] mb-6">{viewTaskDetails?.description}</p>
       <p className="text-grey-700 text-xs font-bold mb-4">Subtasks({countCompletedSubtasks(viewTaskDetails)} of {viewTaskDetails?.subtasks.length})</p>
       {viewTaskDetails?.subtasks.map(task => {
        return(
          <div className="w-[295px] flex gap-4 items-center p-3 rounded bg-grey-500 mb-2">
            <input type="checkbox" checked={task.isCompleted} onChange={()=> handleViewTaskCheckbox(task)} id={task.title}/>
            <label htmlFor={task.title} className="text-secondary-700 font-bold text-xs">{task.title}</label>
          </div>
        )
       })}

          {kanban.boards.map((board,index)=> {
            if(board.name === currentPage){
              return(
                <select className="mb-2 w-[295px] h-10 rounded border border-solid outline-none px-4 py-2 text-[13px] font-medium leading-[23px] text-secondary-700 border-grey-700 border-opacity-25">

                {kanban.boards[index].columns.map((col)=>{
                  return(
                    <option>{col.name}</option>
                  )
                })}
                </select>
                
              )
            }
          })}

    </div>
</div>
  )
}

export default ViewTask