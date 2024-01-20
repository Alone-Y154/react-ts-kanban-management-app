import { useKanban } from "../context/context";
import NewColumn from "./NewColumn";
import Task from "./Task";

const Column = () => {
  const { kanban, currentPage } = useKanban();
  return (
    <div className="flex">
      {kanban.boards.map((board, index) => {
        if (board.name === currentPage) {
          return (
            <div className="flex gap-6">
              {kanban.boards[index].columns.map((col) => {
                return (
                  <div className="">
                    <div className="flex flex-col gap-6 w-[280px]">
                      <div className="flex gap-3">
                        <p className="w-[15px] h-[15px] bg-primary-600 rounded-full"></p>
                        <p className="text-xs font-bold tracking-[2.4px] text-grey-700">
                          {col.name} ({col.tasks.length})
                        </p>
                      </div>
                      <div className="rounded-md flex flex-col gap-5 w-[280px] bg-grey-500 dark:bg-secondary-600 min-h-[75vh]">
                       {
                        col.tasks.map((task,i) => {
                            if(col.name === task.status){
                                return(
                                    <Task key={i} taskIndex = {i} task={task}/>
                                        )
                            }
                           
                        })
                       }
                      </div>
                    </div>

                  </div>
                );
              })}
                 <div className="mt-10" >
                      <NewColumn />
                    </div>
            </div>
          );
        }

      })}
    </div>
  );
};

export default Column;
