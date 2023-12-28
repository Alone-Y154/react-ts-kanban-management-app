import { useRef } from "react";
import cross from "../assets/icon-cross.svg"
import { useClickOutside, useKanban } from "../context/context"

const AddEditBoard = () => {
    const { currentPage, handleBoardColumnNameChange, editBoard, handleBoardNameChange ,handleDialog, newBoard, handleAddNewColumn, addBoard, setAddBoard, handleNewColumn, handleRemoveNewColumn, handleRemoveColumn , handleAddNewBoard, currentPageIndex} = useKanban(); {/*editBoard */}

    const handleBoard = (component: string) => {
        handleDialog(component,currentPage)
    }
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = () => {
        handleBoard("EditBoard")
    };

    const handleCreateNewBoard = () => {
        handleAddNewBoard(addBoard)
        handleClickOutside()
    }
  
    useClickOutside(ref, handleClickOutside);

  return (
    <div className="w-full flex justify-center items-center h-screen bg-secondary-700 absolute bg-opacity-50">
        <div ref={ref} className="flex flex-col w-[343px] md:w-[480px] p-6 bg-grey-400 rounded-md">
            <p className="text-secondary-700 text-lg font-bold mb-6">{newBoard ?"Add New Board" :"Edit Board"}</p>
            <p className="text-grey-700 text-xs font-bold mb-2">Board Name</p>
            <input value={newBoard ? addBoard?.name :editBoard.boards[currentPageIndex].name} placeholder="e.g. Web Design" onChange={(e)=> {
                newBoard ? setAddBoard({ ...addBoard , name : e.target.value }) : handleBoardNameChange(e)
                }} className="mb-6 md:w-full placeholder:opacity-25 placeholder:text-secondary-700 w-[295px] h-10 rounded border text-secondary-700 text-[13px] font-medium leading-[23px] border-solid border-grey-700 outline-none px-4 py-2 border-opacity-25" type="text" id="boardName"/>
            <p className="text-grey-700 text-xs font-bold mb-2">Board Columns {newBoard && <span className="text-[8px] text-danger-700 float-right">Please add atleast 2 columns</span>}</p>
            {!newBoard && editBoard.boards.map((board, index) => { {/* editBoard    earlier kanban was editBoard */}
                 if (board.name === currentPage) {
                    return(
                        <div>
                            {editBoard.boards[index].columns.map((col, colIndex) => {
                                return(
                                    <div className="flex mb-3 w-[295px] md:w-[432px] gap-4 items-center ">
                                        <input value={col.name} onChange={(e) => {
                                            handleBoardColumnNameChange(e,colIndex)
                                        }} className="w-[264px] md:w-full h-10 rounded border border-solid border-grey-700 outline-none bg-grey-400 border-opacity-25 placeholder:opacity-25 placeholder:text-secondary-700 text-secondary-700 text-[13px] font-medium leading-[23px] px-4 py-2" type="text" /> 
                                        <img onClick={() => handleRemoveColumn(colIndex)} src={cross} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    )
                 }
            })}

            {newBoard && 
                addBoard.columns.map((col,colIndex) => {
                    return(
                        <div className="flex mb-3 w-[295px] md:w-[432px] gap-4 items-center ">
                        <input value={col.name} onChange={(e) => {
                          const updatedColumns = addBoard.columns.map((col,index) => {
                            if(index === colIndex){
                                return {
                                    ...col,
                                    name: e.target.value,
                                  };
                            }
                            return col;
                           })
                           setAddBoard({ ...addBoard, columns: updatedColumns });
                        }} className="w-[264px] md:w-full h-10 rounded border border-solid border-grey-700 outline-none bg-grey-400 border-opacity-25 placeholder:opacity-25 placeholder:text-secondary-700 text-secondary-700 text-[13px] font-medium leading-[23px] px-4 py-2" type="text" /> 
                        <img onClick={() => handleRemoveNewColumn(colIndex)} src={cross} alt="" />
                    </div>
                    )
                })

            }
            

            <div onClick={newBoard ? handleNewColumn : handleAddNewColumn} className="w-[295px] md:w-full mb-6 h-10 rounded-[20px] bg-primary-700 bg-opacity-10 text-primary-700 flex items-center justify-center text-[13px] font-bold">
                +Add New Column
            </div>
            <div onClick={newBoard ? handleCreateNewBoard : handleCreateNewBoard} className="w-[295px] md:w-full mb-2 h-10 rounded-[20px] bg-primary-700  text-grey-400 flex items-center justify-center text-[13px] font-bold">
                Save Changes
            </div>
        </div>
    </div>
  )
}

export default AddEditBoard