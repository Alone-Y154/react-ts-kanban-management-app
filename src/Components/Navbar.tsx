import Logo from "../assets/logo-mobile.svg";
import downArrow from "../assets/icon-chevron-down.svg";
import addTask from "../assets/icon-add-task-mobile.svg";
import hamburger from "../assets/icon-vertical-ellipsis.svg";
import NavbarDropdown from "./NavbarDropdown";
import { useKanban } from "../context/context";
import EditandDelete from "./EditandDeleteCard";
import { useEffect } from "react";

function Navbar() {

  const {dialogs, handleDialog,kanban, currentPage , handleCreateBoard, handleNewTask, handleDeleteBoard} = useKanban(); // Accessing handleDialog function from context

  const handleNavbarDropdown = (component : string) => {
    handleDialog(component, currentPage); // Call handleDialog to open NavbarDropdown
  };

const handleTask = () => {
  handleNavbarDropdown("AddNewTask")
  handleNewTask(true);
}

const handleBoard = () => {
  handleCreateBoard(true);
  handleDeleteBoard(false);
  handleNavbarDropdown("EditandDeleteBoard")
}

useEffect(()=>{
  console.log("cnhc", currentPage)
},[currentPage])

// const ref = useRef<HTMLDivElement>(null);

// const handleClickOutside = () => {
//   handleNavbarDropdown("NavbarDropdown")
// };

// useClickOutside(ref, handleClickOutside);
  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center px-4 justify-between bg-grey-400">
        <div onClick={()=>handleNavbarDropdown("NavbarDropdown")}  className="flex cursor-pointer items-center">
          <img className="mr-4" src={Logo} alt="" />
          <p className="mx-2 text-secondary-700 text-lg font-bold">
            {currentPage &&
              
              kanban.boards.map(board => {
              if(board.name === currentPage){
                return (
                  board.name
                )
              }
            })}

            {/* {currentPage} */}
          </p>
          <img src={downArrow} className={`${dialogs.NavbarDropdown ? "rotate-180" : ""}`} alt="" />
        </div>
        <div className="flex gap-4 items-center">
          <div onClick={handleTask} className="w-12 h-8 opacity-25 rounded-3xl flex items-center justify-center bg-primary-700">
            <img src={addTask} alt="" />
          </div>
          <img onClick={handleBoard} src={hamburger} alt="" />
        </div>
        <div className="absolute right-5 top-16 ">
       {dialogs.EditandDeleteBoard && <EditandDelete />}
       </div>
      </div>
      <div className="flex test justify-center">
        {dialogs.NavbarDropdown && <NavbarDropdown />}
      
      </div>
   </div>
  );
}

export default Navbar;
