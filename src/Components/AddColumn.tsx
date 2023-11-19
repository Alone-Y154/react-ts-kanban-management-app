import plus from "../assets/icon-add-task-mobile.svg"

function AddColumn() {
  return (
    <div className="flex flex-col gap-[25px] px-4 items-center justify-center mt-52">
        <p className="text-grey-700 text-center text-lg font-bold">This board is empty. Create a new column to get started.</p>
        <div className="w-[174px] items-center justify-center flex h-12 rounded-3xl bg-primary-700">
            <img src={plus} alt="" />
            <p className="text-grey-400 ml-1 text-[15px] font-bold ">Add New Column</p>
        </div>
    </div>
  )
}

export default AddColumn;