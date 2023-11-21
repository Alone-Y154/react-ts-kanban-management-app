import { Board } from "./Icons";
import dark from "../assets/icon-dark-theme.svg";
import light from "../assets/icon-light-theme.svg"
import { useState } from "react";

const NavbarDropdown = () => {
    const [toggle,setToggle] = useState<boolean>(false)
    const toggleTheme = ():void => {
        setToggle(!toggle)
    }
  return (
    <div className="w-[264px] mt-4 rounded-lg bg-grey-400  overflow-hidden absolute">
      <p className="text-grey-700 text-xs font-bold tracking-[2.4px] px-6 py-4">
        ALL BOARDS (3)
      </p>
      <div className=" flex flex-col pr-6">
        <div className="p-4 hover:rounded-r-full text-grey-700 fill-grey-700 hover:text-grey-400 hover:fill-grey-400 hover:bg-primary-700 flex items-center gap-3 ">
          <Board />
          <p className=" text-[15px] font-bold">Platform Launch</p>
        </div>
        <div className="p-4 hover:rounded-r-full text-grey-700 fill-grey-700 hover:text-grey-400 hover:fill-grey-400 hover:bg-primary-700 flex items-center gap-3 ">
          <Board />
          <p className=" text-[15px] font-bold">Marketing Plan</p>
        </div>
        <div className="p-4 hover:rounded-r-full text-grey-700 fill-grey-700 hover:text-grey-400 hover:fill-grey-400 hover:bg-primary-700 flex items-center gap-3 ">
          <Board />
          <p className=" text-[15px] font-bold">Roadmap</p>
        </div>
      </div>
      <div className="fill-primary-700 flex gap-3 text-primary-700 text-[15px] font-bold p-4 items-center">
        <Board /> + Create New Board
      </div>
      <div className="m-4 w-[235px] rounded-md h-12 bg-grey-500 flex items-center justify-center gap-4">
        <img src={light} alt="light" />
        <input onChange={toggleTheme} className="hidden" type="checkbox" id="theme"/>
        <label className={` before:absolute before:content-[''] before:bg-grey-500 before:w-[18px] before:h-[18px] before:rounded-full before:my-[3px] before:mx-[3px] ${toggle ? "before:right-0" : "before:left-0"} before:translate-[0.2s] w-12 h-6  rounded-[14.5px] bg-primary-700 cursor-pointer relative transition-[0.2s]`} htmlFor="theme"></label>
        <img src={dark} alt="dark"/>
      </div>
    </div>
  );
}

export default NavbarDropdown;
