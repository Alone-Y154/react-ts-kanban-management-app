import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import data from "../data.json";

interface Board {
  name: string;
  columns: Column[];
}

interface Column {
  name: string;
  tasks: Task[];
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export type Kanban = {
  boards: Board[];
};

interface dialogs {
  [key: string]: boolean;
}

export type KanbanContext = {
  kanban: Kanban;
  handleDialog: (component: string, currentNav: string) => void;
  dialogs: dialogs;
  // closeDialogsOnOutsideClick: (component : string) => void;
  toggleTheme: () => void;
  toggle: boolean;
  currentPage: string;
  countCompletedSubtasks: (task: Task | null) => number;
  handleViewTask: (task: Task, taskIndex: number) => void;
  viewTaskDetails: Task;
  handleViewTaskCheckbox: (selectedTask: Subtask) => void;
  handleDeleteBoard: (board: boolean) => void;
  deleteBoard: boolean;
  handleNewTask: (addNewTask: boolean) => void;
  newTask: boolean;
  handleViewTaskDropdown: (dropdown: string) => void;
  updateKanban: (updatedTaskDetails : Task) => void;
  updateKanbanState: (updatedTaskDetails: Task) => void;
  viewTaskIndex: number;
  handleSubtaskRemove: (index: number)=> void;
  handleAddSubtask: () => void;
};

export type kanbanProviderProps = {
  children: ReactNode;
};

export const kanbanContext = createContext<KanbanContext | null>(null);

export const Kanbanprovider = ({ children }: kanbanProviderProps) => {
  const [kanban, setKanban] = useState<Kanban>({ boards: [] });
  const [dialogs, setDialogs] = useState<{ [key: string]: boolean }>({
    NavbarDropdown: false,
    ViewTask: false,
    EditandDeleteTask: false, //need to verify all the boolean values and remove unnecessary ones
    EditTask: false,
    DeleteTask: false,
    AddNewTask: false,
    EditandDeleteBoard: false,
    EditBoard: false,
  });

  const sampleTask: Task = {
    title: "Build UI for search",
    description: "",
    status: "Todo",
    subtasks: [
      {
        title: "Search page",
        isCompleted: false,
      },
    ],
  };

  const [currentPage, setCurrentPage] = useState<string>("");
  const [viewTaskDetails, setViewTaskDetails] = useState<Task>(sampleTask);
  const [deleteBoard, setDeleteBoard] = useState<boolean>(false); // to handle same component for differnent data the components are edit and create board
  const [newTask, setNewTask] = useState<boolean>(false); // to handle same component for differnent data the components are edit and create Task
  const [toggle, setToggle] = useState<boolean>(false); // theme
  const [viewTaskIndex, setViewTaskIndex] = useState<number>(0);
  // const [dropdown, setDropdown] = useState<string>(viewTaskDetails?.status);


  const toggleTheme = (): void => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (data && data.boards) {
      setKanban(data);
      setCurrentPage(data?.boards[2]?.name);
    }
    console.log("data", data);
  }, []);

  const handleDialog = (component: string, currentNav: string) => {
    // if(component === "")
    setDialogs((prevDialogs) => ({
      ...prevDialogs,
      [component]: !prevDialogs[component],
    }));
    setCurrentPage(currentNav);
  };

  const countCompletedSubtasks = (task: Task | null): number => {
    if (!task) return 0;
    const completedSubtasks = task.subtasks.filter(
      (subtask: Subtask) => subtask.isCompleted
    );
    return completedSubtasks.length;
  };

  const handleViewTask = (task: Task, taskIndex: number) => {
    setViewTaskDetails(task);
    setViewTaskIndex(taskIndex);
    updateKanbanState(task)
  };


useEffect(()=> {
  // updateKanban(viewTaskDetails)
  console.log("hello")
},[viewTaskDetails])

  const handleViewTaskCheckbox = (selectedTask: Subtask) => {
    // Ensure viewTaskDetails exists and has subtasks
    if (viewTaskDetails && viewTaskDetails.subtasks) {
      // Map through the subtasks and find the matching task to update
      const updatedSubtasks = viewTaskDetails.subtasks.map((task) =>
        task.title === selectedTask.title
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );

      // Update viewTaskDetails with the modified subtasks
      setViewTaskDetails({ ...viewTaskDetails, subtasks: updatedSubtasks });
      updateKanbanState({...viewTaskDetails, subtasks: updatedSubtasks})
    }
  };

  const updateKanbanState = (updatedTaskDetails: Task) => {
    // Map through the boards in the kanban state
    const updatedBoards = kanban.boards.map((board) => {
      // Map through the columns in each board
      const updatedColumns = board.columns.map((column) => {
        // Map through the tasks in each column
        const updatedTasks = column.tasks.map((task) =>
          // Checking if the task title matches the updatedTaskDetails title
          task.title === updatedTaskDetails.title ? updatedTaskDetails : task
        );
        return { ...column, tasks: updatedTasks };
      });
      return { ...board, columns: updatedColumns };
    });
  
    // Update the kanban state with the modified boards
    setKanban({ boards: updatedBoards });
  };

  const handleViewTaskDropdown = (dropdown: string) => {

    const updatedTaskDetails = { ...viewTaskDetails, status: dropdown };
    setViewTaskDetails(updatedTaskDetails);
    updateKanban(updatedTaskDetails);
  };

  const updateKanban = (updatedTaskDetails : Task) => {
    const updateKanban= {...kanban}

    if(updatedTaskDetails.status !== viewTaskDetails.status){
      updateKanban.boards.map((board,boardIndex) => {
        if(board.name === currentPage){
          updateKanban.boards[boardIndex].columns.map((col) => {
            if(col.name === viewTaskDetails.status && col.name !== updatedTaskDetails.status) {
             col.tasks.splice(viewTaskIndex, 1)
            }
            if(col.name === updatedTaskDetails.status){
                  col.tasks.push(updatedTaskDetails)
            }
          })
        }
      })
    }


    setKanban(updateKanban)
  }

  const handleDeleteBoard = (board: boolean) => {
    setDeleteBoard(!board);
  };

  const handleNewTask = (addNewTask: boolean) => {
    setNewTask(!addNewTask);
  };

  // const handleTaskTitleChange = () => {

  // }
  const handleSubtaskRemove = (index: number): void => {
    const updateSubtask = viewTaskDetails.subtasks.filter((_task,i)=> i !== index)
    setViewTaskDetails({...viewTaskDetails,subtasks: updateSubtask})
    updateKanbanState({...viewTaskDetails,subtasks: updateSubtask});

  }

  const handleAddSubtask = () => {
    const tempSubtask: Subtask = {
      "title": "",
      "isCompleted" :false
    }
    const updateSubtask:Task = {...viewTaskDetails, subtasks: [...viewTaskDetails.subtasks,tempSubtask]}
    setViewTaskDetails(updateSubtask);
    updateKanbanState(updateSubtask)
  }

  return (
    <kanbanContext.Provider
      value={{
        kanban,
        dialogs,
        handleDialog,
        toggleTheme,
        toggle,
        currentPage,
        countCompletedSubtasks,
        handleViewTask,
        viewTaskDetails,
        handleViewTaskCheckbox,
        deleteBoard,
        handleDeleteBoard,
        newTask,
        handleNewTask,
        handleViewTaskDropdown,
        updateKanban,
        updateKanbanState,
        viewTaskIndex,
        handleSubtaskRemove,
        handleAddSubtask,
      }}
    >
      {children}
    </kanbanContext.Provider>
  );
};

export const useKanban = () => {
  const kanbanConsumer = useContext(kanbanContext);
  if (!kanbanConsumer) {
    throw new Error("useKanban used outside of Provider");
  }
  return kanbanConsumer;
};
