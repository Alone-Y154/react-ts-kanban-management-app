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
  
  interface Task {
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
  }
 

interface Subtask {
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
    handleDialog: (component : string) => void;
    dialogs: dialogs;
    // closeDialogsOnOutsideClick: (component : string) => void;
    toggleTheme: () => void;
    toggle: boolean;
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
        "EditandDeleteBoard":false
    }) 
    // const boardData = data;
    const [toggle,setToggle] = useState<boolean>(false)
    const toggleTheme = ():void => {
        setToggle(!toggle)
    }
    useEffect(() => {
        if (data && data.boards) {
          setKanban(data); 
        }
        console.log("data", data)
      }, []); 

      const handleDialog = (component: string) => {
        setDialogs((prevDialogs) => ({
            ...prevDialogs,
            [component]: !prevDialogs[component], 
          }));
      }

    
 
    return(
        <kanbanContext.Provider value={{kanban,dialogs,handleDialog, toggleTheme , toggle}}>
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



