import Logo from "../assets/logo-mobile.svg";
import downArrow from "../assets/icon-chevron-down.svg";
// import upArrow from "../assets/icon-chevron-up.svg";
import addTask from "../assets/icon-add-task-mobile.svg";
import hamburger from "../assets/icon-vertical-ellipsis.svg";
// import NavbarDropdown from "./NavbarDropdown";

// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';

function Navbar() {
  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center px-4 justify-between bg-grey-400">
        <div className="flex items-center">
          <img className="mr-4" src={Logo} alt="" />
          <p className="mx-2 text-secondary-700 text-lg font-bold">
            Platform Launch
          </p>
          <img src={downArrow} alt="" />
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-12 h-8 opacity-25 rounded-3xl flex items-center justify-center bg-primary-700">
            <img src={addTask} alt="" />
          </div>
          <img src={hamburger} alt="" />
        </div>
      </div>
      <div className="flex justify-center mt-4">
      {/* <NavbarDropdown /> */}
      </div>
   </div>
  );
}

export default Navbar;
