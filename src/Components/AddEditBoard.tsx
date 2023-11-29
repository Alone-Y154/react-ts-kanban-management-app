import { useRef } from "react";
import cross from "../assets/icon-cross.svg"
import { useClickOutside, useKanban } from "../context/context"

const AddEditBoard = () => {
    const {deleteBoard, currentPage, kanban,handleDialog} = useKanban();

    const handleBoard = (component: string) => {
        handleDialog(component,currentPage)
    }
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = () => {
        handleBoard("EditBoard")
    };
  
    useClickOutside(ref, handleClickOutside);

  return (
    <div className="w-full flex justify-center items-center h-screen bg-secondary-700 absolute bg-opacity-50">
        <div ref={ref} className="flex flex-col w-[343px] p-6 bg-grey-400 rounded-md">
            <p className="text-secondary-700 text-lg font-bold mb-6">{deleteBoard ? "Edit Board":"Add New Board"}</p>
            <p className="text-grey-700 text-xs font-bold mb-2">Board Name</p>
            <input value={deleteBoard ? currentPage :""} placeholder="e.g. Web Design" className="mb-6 placeholder:opacity-25 placeholder:text-secondary-700 w-[295px] h-10 rounded border text-secondary-700 text-[13px] font-medium leading-[23px] border-solid border-grey-700 outline-none px-4 py-2 border-opacity-25" type="text" id="boardName"/>
            <p className="text-grey-700 text-xs font-bold mb-2">Board Columns</p>
            {deleteBoard && kanban.boards.map((board, index) => {
                 if (board.name === currentPage) {
                    return(
                        <div>
                            {kanban.boards[index].columns.map((col) => {
                                return(
                                    <div className="flex mb-3 w-[295px] gap-4 items-center ">
                                        <input value={col.name} className="w-[264px] h-10 rounded border border-solid border-grey-700 outline-none bg-grey-400 border-opacity-25 placeholder:opacity-25 placeholder:text-secondary-700 text-secondary-700 text-[13px] font-medium leading-[23px] px-4 py-2" type="text" /> 
                                        <img src={cross} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    )
                 }
            })}

            {!deleteBoard && 
            <div className="flex mb-3 w-[295px] gap-4 items-center ">
                <input  className="w-[264px] h-10 rounded border border-solid border-grey-700 outline-none bg-grey-400 border-opacity-25 placeholder:opacity-25 placeholder:text-secondary-700 text-secondary-700 text-[13px] font-medium leading-[23px] px-4 py-2" type="text" /> 
                <img src={cross} alt="" />
            </div>
            }
            

            <div className="w-[295px] mb-6 h-10 rounded-[20px] bg-primary-700 bg-opacity-10 text-primary-700 flex items-center justify-center text-[13px] font-bold">
                +Add New Column
            </div>
            <div className="w-[295px] mb-2 h-10 rounded-[20px] bg-primary-700  text-grey-400 flex items-center justify-center text-[13px] font-bold">
                Save Changes
            </div>
        </div>
    </div>
  )
}

export default AddEditBoard