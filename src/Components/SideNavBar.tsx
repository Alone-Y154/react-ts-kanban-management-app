import { Board } from "./Icons";
import dark from "../assets/icon-dark-theme.svg";
import light from "../assets/icon-light-theme.svg";
import hideSideBar from "../assets/icon-hide-sidebar.svg";
import { useKanban } from "../context/context";

const SideNavBar = () => {
  const {
    handleDialog,
    toggleTheme,
    toggle,
    kanban,
    currentPage,
    handleCreateBoard,
    setCurrentPageIndex,
    handleSidebar
  } = useKanban();

  const handleNavbarDropdown = (currentNav: string, boardIndex: number) => {
    handleDialog("NavbarDropdown", currentNav); // Call handleDialog to open NavbarDropdown
    setCurrentPageIndex(boardIndex);
  };

  const handleNewBoard = () => {
    handleDialog("EditBoard", currentPage);
  };

  const handleBoard = () => {
    handleCreateBoard(false);
    handleNewBoard();
  };

  return (
    <div className="hidden md:flex justify-between flex-col w-[260px] h-full bg-grey-400">
      <div className="md:flex flex-col">
        <p className="text-grey-700 text-xs font-bold tracking-[2.4px] px-6 py-4">
          ALL BOARDS ({kanban.boards.length})
        </p>
        {kanban.boards.map((board, index) => {
          return (
            <div key={index} className=" flex flex-col pr-6">
              <div
                onClick={() => handleNavbarDropdown(board.name, index)}
                className={`p-4 hover:rounded-r-full flex cursor-pointer items-center gap-3 ${currentPage === board.name ? "text-grey-400 fill-grey-400 bg-primary-700 rounded-r-full": "text-grey-700 fill-grey-700 hover:text-primary-700 hover:fill-primary-700 hover:bg-primary-700 hover:bg-opacity-10 "}`}
              >
                <Board />
                <p className=" text-[15px] font-bold">{board.name}</p>
              </div>
            </div>
          );
        })}

        <div
          onClick={handleBoard}
          className="fill-primary-700 cursor-pointer flex gap-3 text-primary-700 text-[15px] font-bold p-4 items-center"
        >
          <Board /> + Create New Board
        </div>
      </div>

      <div className="flex flex-col mx-3 mb-12 gap-[30px]">
        <div className="w-[235px] rounded-md h-12 bg-grey-500 flex items-center justify-center gap-4">
          <img src={light} alt="light" />
          <input
            onChange={toggleTheme}
            className="hidden"
            type="checkbox"
            id="theme"
          />
          <label
            className={` before:absolute before:content-[''] before:bg-grey-500 before:w-[18px] before:h-[18px] before:rounded-full before:my-[3px] before:mx-[3px] ${
              toggle ? "before:right-0" : "before:left-0"
            } before:translate-[0.2s] w-12 h-6  rounded-[14.5px] bg-primary-700 cursor-pointer relative transition-[0.2s]`}
            htmlFor="theme"
          ></label>
          <img src={dark} alt="dark" />
        </div>
        <div onClick={handleSidebar} className="flex cursor-pointer gap-[10px] items-center ">
            <img src={hideSideBar} alt="hide"/>
            <p className="text-[15px] font-bold text-grey-700">Hide Sidebar</p>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
