import {ReactNode, createContext , useContext, useEffect, useState} from 'react';
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
}

interface dialogs {
    [key: string]: boolean;
}

export type KanbanContext = {
    kanban: Kanban;
    handleDialog: (component : string, currentNav: string) => void;
    dialogs: dialogs;
    // closeDialogsOnOutsideClick: (component : string) => void;
    toggleTheme: () => void;
    toggle: boolean;
    currentPage: string;
    countCompletedSubtasks: (task: Task | null) => number;
    handleViewTask: (task: Task) => void;
    viewTaskDetails: Task | null;
    handleViewTaskCheckbox: (selectedTask : Subtask) => void;
    handleDeleteBoard: (board: boolean) => void;
    deleteBoard: boolean;
    handleNewTask : (addNewTask :boolean) => void;
    newTask: boolean;
}

export type kanbanProviderProps = {
    children: ReactNode;
}


export const kanbanContext = createContext<KanbanContext | null>(null);


export const Kanbanprovider = ({children} : kanbanProviderProps) => {

    const [kanban, setKanban] = useState<Kanban>({ boards: [] });
    const [dialogs, setDialogs] = useState<{ [key: string]: boolean }>({
        "NavbarDropdown": false,
        "ViewTask": false,
        "EditandDeleteTask":false,
        "EditTask":false,
        "DeleteTask": false,
        "AddNewTask": false,
        "EditandDeleteBoard":false,
        "EditBoard": false
    }) 

    const [currentPage, setCurrentPage] = useState<string>("");
    const [viewTaskDetails, setViewTaskDetails] = useState<Task | null>(null);
    const [deleteBoard, setDeleteBoard] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<boolean>(false);
    const [toggle,setToggle] = useState<boolean>(false)
    const toggleTheme = ():void => {
        setToggle(!toggle)
    }
    useEffect(() => {
        if (data && data.boards) {
          setKanban(data); 
          setCurrentPage(data?.boards[0]?.name)
        }
        console.log("data", data)
      }, []); 

      const handleDialog = (component: string, currentNav : string) => {
        setDialogs((prevDialogs) => ({
            ...prevDialogs,
            [component]: !prevDialogs[component], 
          }));
          setCurrentPage(currentNav);
      }

      const countCompletedSubtasks = (task: Task | null): number => {
        if(!task) return 0
        const completedSubtasks = task.subtasks.filter((subtask: Subtask) => subtask.isCompleted);
        return completedSubtasks.length;
      };

      const handleViewTask = (task : Task) => {
        setViewTaskDetails(task)
      }

      const handleViewTaskCheckbox = (selectedTask: Subtask) => {
        // Ensure viewTaskDetails exists and has subtasks
        if (viewTaskDetails && viewTaskDetails.subtasks) {
          // Map through the subtasks and find the matching task to update
          const updatedSubtasks = viewTaskDetails.subtasks.map(task =>
            task.title === selectedTask.title ? { ...task, isCompleted: !task.isCompleted } : task
          );
      
          // Update viewTaskDetails with the modified subtasks
          setViewTaskDetails({ ...viewTaskDetails, subtasks: updatedSubtasks });
        }
      }

      const handleDeleteBoard = (board: boolean) => {
        setDeleteBoard(!board)
      }

      const handleNewTask = (addNewTask : boolean) => {
        setNewTask(!addNewTask)
      }
 
    return(
        <kanbanContext.Provider value={{kanban,dialogs,handleDialog, toggleTheme , toggle, currentPage, countCompletedSubtasks, handleViewTask, viewTaskDetails, handleViewTaskCheckbox, deleteBoard, handleDeleteBoard, newTask, handleNewTask}}>
            {children}
        </kanbanContext.Provider>
    )

}

export const useKanban = () => {
    const kanbanConsumer = useContext(kanbanContext)
    if(!kanbanConsumer){
        throw new Error("useKanban used outside of Provider")
    }
    return kanbanConsumer
}



