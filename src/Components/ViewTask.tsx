import hamburger from "../assets/icon-vertical-ellipsis.svg"
import { useKanban } from "../context/context";
import EditandDelete from "./EditandDeleteCard";

const ViewTask = () => {

  const {handleDialog, dialogs} = useKanban();
  const handleEditandDeleteCard = () => {
    handleDialog('EditandDeleteTask'); // Call handleDialog to open NavbarDropdown
  };
  
  return (
    <div className="w-full flex justify-center items-center h-screen bg-secondary-700 absolute bg-opacity-50">
    <div className="flex flex-col w-[343px] p-6 bg-grey-400 rounded-md">
       <div className="flex gap-4 justify-center items-center mb-6">
        <p className="text-secondary-700 text-lg font-bold">Research pricing points of various competitors and trial different business models</p>
        <img onClick={handleEditandDeleteCard} src={hamburger} alt=""/>
       </div>
       <div className="absolute ml-24 mt-14">
       {dialogs.EditandDeleteCard && <EditandDelete />}
       </div>
       <p className="text-grey-700 text-[13px] font-medium leading-[23px] mb-6">We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.</p>
       <p className="text-grey-700 text-xs font-bold mb-4">Subtasks(2 of 3)</p>
       <div className="w-[295px] flex items-center gap-4 justify-center p-3 rounded bg-grey-500 mb-2">
        <input type="checkbox" id="subtask1"/>
        <label htmlFor="subtask1" className="text-secondary-700 font-bold text-xs">Research competitor pricing and business models</label>
       </div>
       <div className="w-[295px] flex items-center gap-4 justify-center p-3 rounded bg-grey-500 mb-2">
        <input type="checkbox" id="subtask1"/>
        <label htmlFor="subtask1" className="text-secondary-700 font-bold text-xs">Research competitor pricing and business models</label>
       </div>
       <div className="w-[295px] flex items-center gap-4 justify-center p-3 rounded bg-grey-500 mb-2">
        <input type="checkbox" id="subtask1"/>
        <label htmlFor="subtask1" className="text-secondary-700 font-bold text-xs">Research competitor pricing and business models</label>
       </div>
       <p className="text-grey-700 text-xs font-bold mb-4 mt-4">Subtasks(2 of 3)</p>
       <select className="mb-2 w-[295px] h-10 rounded border border-solid outline-none px-4 py-2 text-[13px] font-medium leading-[23px] text-secondary-700 border-grey-700 border-opacity-25">
          <option>Todo</option>
          <option>Doing</option>
          <option>Done</option>
        </select>
    </div>
</div>
  )
}

export default ViewTask