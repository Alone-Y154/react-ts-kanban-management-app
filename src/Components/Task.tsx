import { useKanban } from "../context/context"
import { Task as TaskType } from "../context/context";


const Task = ({ task, taskIndex }: { task: TaskType, taskIndex: number }) => {
  // const task = props.task;
  const {handleDialog, currentPage, countCompletedSubtasks, handleViewTask} = useKanban();
  const handleDialogViewTask = () => {
    handleDialog('ViewTask', currentPage); // Call handleDialog to open NavbarDropdown
    handleViewTask(task,taskIndex)
  };


  return (
    <div onClick={handleDialogViewTask} className="w-[280px] gap-2 flex flex-col min-h-[88px] rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.10)] bg-grey-400 dark:bg-secondary-500 p-6">
        <p className="text-secondary-700 dark:text-grey-400 hover:text-primary-700 dark:hover:text-primary-700 cursor-pointer font-bold text-[15px] tracking-normal leading-normal" >{task.title}</p>
        <p className="text-grey-700 text-xs font-bold leading-normal tracking-normal">{countCompletedSubtasks(task)} of {task.subtasks.length} substasks</p>
    </div>
  )
}

export default Task