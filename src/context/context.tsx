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
    EditandDeleteTask: false,
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
  const [deleteBoard, setDeleteBoard] = useState<boolean>(false); // to handle same component for differnent component edit and create board
  const [newTask, setNewTask] = useState<boolean>(false); // to handle same component for differnent component edit and create Task
  const [toggle, setToggle] = useState<boolean>(false); // theme
  const [viewTaskIndex, setViewTaskIndex] = useState<number>(0);

  const toggleTheme = (): void => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (data && data.boards) {
      setKanban(data);
      setCurrentPage(data?.boards[0]?.name);
    }
    console.log("data", data);
  }, []);

  const handleDialog = (component: string, currentNav: string) => {
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
    setViewTaskIndex(taskIndex)

  };

  const handleViewTaskCheckbox = (selectedTask: Subtask) => {
    // Ensure viewTaskDetails exists and has subtasks
    // if (viewTaskDetails && viewTaskDetails.subtasks) {
      // Map through the subtasks and find the matching task to update
      const updatedSubtasks = viewTaskDetails.subtasks.map((task) =>
        task.title === selectedTask.title
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );

      // Update viewTaskDetails with the modified subtasks
      setViewTaskDetails({ ...viewTaskDetails, subtasks: updatedSubtasks });
    // }
  };

  const handleViewTaskDropdown = (dropdown: string) => {

    const updatedTaskDetails = { ...viewTaskDetails, status: dropdown };

    setViewTaskDetails(updatedTaskDetails);

    // console.log("drop", dropdown)
    // console.log("task",updatedTaskDetails)
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
              // col.tasks.map(task => {
                // if(task.title === updatedTaskDetails.title){
                  col.tasks.push(updatedTaskDetails)
                // }
              // })
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
        updateKanban
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
