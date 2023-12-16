import { useKanban } from "../context/context";

const NewColumn = () => {

  const {currentPage, handleDialog, handleCreateBoard } = useKanban();

  const handleBoard = () => {
    handleCreateBoard(true);
    handleDialog("EditBoard", currentPage)
  }
  return (
      <div onClick={handleBoard} className="text-grey-700 cursor-pointer rounded-md text-lg font-bold flex justify-center w-[280px] bg-grey-600 h-[75vh] items-center ">
        + New Column
      </div>
  );
};

export default NewColumn;
