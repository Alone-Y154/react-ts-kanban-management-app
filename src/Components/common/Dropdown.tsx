import { useState } from "react";
import { useKanban } from "../../context/context";


const Dropdown = () => {
    const {kanban, currentPage, viewTaskDetails} = useKanban();
  const [dropdown, setDropdown] = useState(viewTaskDetails?.status);

  return (
    <>
    {kanban.boards.map((board,index)=> {
        if(board.name === currentPage){
          return(
            <select value={dropdown} onChange={(e)=>setDropdown(e.target.value)} className="mb-2 w-[295px] h-10 rounded border border-solid outline-none px-4 py-2 text-[13px] font-medium leading-[23px] text-secondary-700 border-grey-700 border-opacity-25">

            {kanban.boards[index].columns.map((col)=>{
              return(
                <option>{col.name}</option>
              )
            })}
            </select>
            
          )
        }
      })}
      </>
  )
}

export default Dropdown