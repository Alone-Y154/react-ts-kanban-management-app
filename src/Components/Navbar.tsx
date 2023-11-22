import Logo from "../assets/logo-mobile.svg";
import downArrow from "../assets/icon-chevron-down.svg";
import addTask from "../assets/icon-add-task-mobile.svg";
import hamburger from "../assets/icon-vertical-ellipsis.svg";
import NavbarDropdown from "./NavbarDropdown";
import { useKanban } from "../context/context";
import EditandDelete from "./EditandDeleteCard";

function Navbar() {

  const {dialogs, handleDialog } = useKanban(); // Accessing handleDialog function from context

  const handleNavbarDropdown = (component : string) => {
    handleDialog(component); // Call handleDialog to open NavbarDropdown
  };
  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center px-4 justify-between bg-grey-400">
        <div onClick={()=>handleNavbarDropdown("NavbarDropdown")}  className="flex cursor-pointer items-center">
          <img className="mr-4" src={Logo} alt="" />
          <p className="mx-2 text-secondary-700 text-lg font-bold">
            Platform Launch
          </p>
          <img src={downArrow} className={`${dialogs.NavbarDropdown ? "rotate-180" : ""}`} alt="" />
        </div>
        <div className="flex gap-4 items-center">
          <div onClick={()=>handleNavbarDropdown("AddNewTask")} className="w-12 h-8 opacity-25 rounded-3xl flex items-center justify-center bg-primary-700">
            <img src={addTask} alt="" />
          </div>
          <img onClick={()=>handleNavbarDropdown("EditandDeleteBoard")} src={hamburger} alt="" />
        </div>
        <div className="absolute right-5 top-16 ">
       {dialogs.EditandDeleteBoard && <EditandDelete />}
       </div>
      </div>
      <div className="flex justify-center">
        {dialogs.NavbarDropdown && <NavbarDropdown />}
      
      </div>
   </div>
  );
}

export default Navbar;
