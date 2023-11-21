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
    board: Board[];
}

export type KanbanContext = {
    kanban: Kanban;

}

export type kanbanProviderProps = {
    children: ReactNode;
}


export const kanbanContext = createContext<KanbanContext | null>(null);


export const Kanbanprovider = ({children} : kanbanProviderProps) => {

    const [kanban, setKanban] = useState<Kanban>({ board: [] }); 

    useEffect(() => {
        if (data && data.boards) {
          setKanban(data); 
        }
        console.log("data", data)
      }, []); 
    

    return(
        <kanbanContext.Provider value={{kanban}}>
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



