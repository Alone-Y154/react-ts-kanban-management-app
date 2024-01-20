import Logo from "../assets/logo-mobile.svg";
import LogoDark from "../assets/logo-dark.svg";
import downArrow from "../assets/icon-chevron-down.svg";
import addTask from "../assets/icon-add-task-mobile.svg";
import hamburger from "../assets/icon-vertical-ellipsis.svg";
import NavbarDropdown from "./NavbarDropdown";
import { useKanban } from "../context/context";
import EditandDelete from "./EditandDeleteCard";
import { useEffect } from "react";
import LogoLight from "../assets/logo-light.svg";

function Navbar() {

  const {dialogs, sidebar, toggle, handleDialog,kanban, currentPage , handleCreateBoard, handleNewTask, handleDeleteBoard} = useKanban(); // Accessing handleDialog function from context

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
      <div className="flex h-16 md:h-20 items-center px-4 justify-between bg-grey-400 dark:bg-secondary-500">
        <div onClick={()=>handleNavbarDropdown("NavbarDropdown")}  className="flex md:gap-6 cursor-pointer items-center">
          <img className="mr-4 md:hidden" src={Logo} alt="" />
          <img src={toggle ? LogoLight :LogoDark } className={`hidden md:block ${sidebar ? "mr-[66px]" : "" }`} alt="logo"/>
          <p className="w-[1px] bg-grey-600 h-20 hidden md:block dark:bg-secondary-400"></p>
          <p className="mx-2 md:ml-0 dark:text-grey-400 text-secondary-700 text-lg md:text-xl font-bold">
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
          <img src={downArrow} className={`${dialogs.NavbarDropdown ? "rotate-180 md:hidden" : "md:hidden"}`} alt="" />
        </div>
        <div className="flex gap-4 items-center">
          <div onClick={handleTask} className="w-12 md:w-[164px] md:h-12 h-8 rounded-3xl flex items-center justify-center bg-primary-700 cursor-pointer"> {/* opacity-25 */}
            <img className="md:hidden" src={addTask} alt="" />
            <p className="hidden md:block text-grey-400 text-[15px] font-bold">+ Add New Task</p>
          </div>
          <img onClick={handleBoard} src={hamburger} alt="" />
        </div>
        <div className="absolute md:top-20 right-5 top-16 ">
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
