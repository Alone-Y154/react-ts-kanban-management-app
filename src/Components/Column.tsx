import NewColumn from "./NewColumn";
import Task from "./Task";

const Column = () => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-6 w-[280px]">
        <div className="flex gap-3">
            <p className="w-[15px] h-[15px] bg-primary-600 rounded-full"></p>
            <p className="text-xs font-bold tracking-[2.4px] text-grey-700">TODO (4)</p>
        </div>
        <div className="rounded-md flex flex-col gap-5 w-[280px] bg-grey-500 min-h-[75vh]">
            <Task />
            <Task />
            <Task />
        </div>
      </div>
      <div className="mt-10">
      <NewColumn />
      </div>
    </div>
  );
};

export default Column;
