import { useKanban } from "../context/context";


const EditandDelete = () => {
  const {handleDialog, currentPage, deleteBoard} = useKanban();
  const handleEditTask = (component: string) => {
    handleDialog(component, currentPage); // Call handleDialog to open NavbarDropdown
  };
  return (
    <div className="w-[192px] flex flex-col p-4 gap-4 h-[92px] rounded-lg bg-grey-400 shadow-[0px_10px_20px_0px_rgba(54,_78,_126,_0.25)]">
        <p onClick={()=>handleEditTask(deleteBoard ? "EditBoard": "EditTask")} className="text-grey-700 text-[13px] font-medium leading-[23px]">{deleteBoard ? "Edit Board": "Edit Task"}</p>
        <p onClick={()=>handleEditTask("DeleteTask")} className="text-danger-700 text-[13px] font-medium leading-[23px]">{deleteBoard ? "Delete Board": "Delete Task"}</p>
    </div>
  )
}

export default EditandDelete