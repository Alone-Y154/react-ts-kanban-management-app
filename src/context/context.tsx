/* eslint-disable react-refresh/only-export-components */
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

export interface Column {
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
  handleViewTaskCheckbox: (selectedTask: Subtask, taskIndex: number) => void;
  handleDeleteBoard: (board: boolean) => void;
  deleteBoard: boolean;
  handleNewTask: (addNewTask: boolean) => void;
  newTask: boolean;
  handleViewTaskDropdown: (dropdown: string) => void;
  updateKanban: (updatedTaskDetails : Task) => void;
  updateKanbanState: (updatedTaskDetails: Task, taskIndex: number) => void;
  viewTaskIndex: number;
  handleSubtaskRemove: (index: number)=> void;
  handleAddSubtask: () => void;
  handleDeleteViewTask: (deleteTaskDetails: Task,deleteTaskIndex: number) => void;
  addNewTaskDetails: (addNewTaskDetails: Task) => void;
  addTaskDetails: Task;
  handleNewSubtaskRemove: (index:number)=> void;
  handleAddNewSubTask: () => void;
  setAddTaskDetails: (task: Task) => void;
  setViewTaskDetails: (task: Task) => void;
  handleCreateBoard: (newBoard: boolean) => void;
  newBoard: boolean;
  setAddBoard: (board: Board) => void;
  addBoard : Board;
  handleNewColumn: () => void;
  handleRemoveNewColumn: (colIndex: number) => void;
  handleAddNewBoard: (board: Board) => void;
  setEditBoard: (board: Kanban) => void;
  setCurrentPageIndex: (boardIndex : number) => void;
  currentPageIndex: number;
  editBoard: Kanban;
  handleRemoveColumn: (colIndex: number) => void;
  handleAddNewColumn: () => void;
  handleBoardNameChange: (e:React.ChangeEvent<HTMLInputElement>) => void
  handleBoardColumnNameChange: (e:React.ChangeEvent<HTMLInputElement>, colIndex: number) => void;
  handleDeleteCurrentBoard: () => void;
  handleSidebar: () => void;
  sidebar: boolean;
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
    // AddNewBoard: false,
  });

  const sampleTask: Task = {
    title: "",
    description: "",
    status: "",
    subtasks: [
      {
        title: "",
        isCompleted: false,
      },
    ],
  };

  const sampleBoard: Board =     {
    "name": "",
    "columns": [
      {
        "name": "",
        "tasks": []
      }
    ]
  }

  const [currentPageIndex , setCurrentPageIndex] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<string>("");
  const [viewTaskDetails, setViewTaskDetails] = useState<Task>(sampleTask);
  const [deleteBoard, setDeleteBoard] = useState<boolean>(false); // to handle same component for differnent data the components are edit and create board
  const [newTask, setNewTask] = useState<boolean>(false); // to handle same component for differnent data the components are edit and create Task
  const [toggle, setToggle] = useState<boolean>(false); // theme
  const [viewTaskIndex, setViewTaskIndex] = useState<number>(0);
  // const [dropdown, setDropdown] = useState<string>(viewTaskDetails?.status);

  const [addTaskDetails, setAddTaskDetails] = useState<Task>(sampleTask);
  const [newBoard,setNewBoard] = useState<boolean>(false)
  const [addBoard, setAddBoard] = useState<Board>(sampleBoard)
  const [editBoard, setEditBoard] = useState<Kanban>({ boards: [] })
  const [sidebar, setSidebar] = useState<boolean>(true)

  const toggleTheme = (): void => {
    setToggle(!toggle);
    handleTheme()
  };

  const handleTheme = () => {
    toggle ? setLightMode() : setDarkMode()
}


  const setDarkMode = ():void => {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
}

const setLightMode = ():void => {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  }

  useEffect(() => {
    if (data && data.boards) {
      setKanban(data);
      setCurrentPage(data?.boards[0]?.name);
      setCurrentPageIndex(0)
      setEditBoard(data)
    }
    // console.log("data", data);
  }, []);

  const handleDialog = (component: string, currentNav: string) => {
    setDialogs((prevDialogs) => ({
      ...prevDialogs,
      [component]: !prevDialogs[component],
    }));

    setCurrentPage(currentNav);
    handleToggle(component)
  };

  // console.log("out", dialogs)

  const handleToggle = (component: string)=> {
    // console.log("cc", dialogs[component], component)
    if(component === "ViewTask"){
      if(dialogs[component]){
        setDialogs((prevDialogs) => ({
          ...prevDialogs,
          EditandDeleteTask: false,
        }));
      }
    }

    if(component === "EditTask"){
      if(!dialogs[component]){
        setDialogs((prevDialogs) => ({
          ...prevDialogs,
          ViewTask: false,
          EditandDeleteTask: false,
        }));
      }
    }

    if(component === "EditBoard"){
      if(!dialogs[component]){
        setDialogs((prevDialogs) => ({
          ...prevDialogs,
          EditandDeleteBoard: false,
          NavbarDropdown: false
        }));
      }
    }

    if(component === "DeleteTask"){
      if(!dialogs[component]){
        setDialogs((prevDialogs) => ({
          ...prevDialogs,
          EditandDeleteBoard: false,
          ViewTask: false,
          EditandDeleteTask: false
        }));
      }
    }

    // if(component === "NavbarDropdown"){
    //   if(dialogs[component]){
    //     setDialogs((prevDialogs) => ({
    //       ...prevDialogs,
    //       NavbarDropdown: false
    //     }));
    //   }
    // }
  }




  const addNewTaskDetails = (newTaskDetails: Task) => {
    const updatedKanban = {
      ...kanban,
      boards: kanban.boards.map(board => {
        if (board.name === currentPage) {
          return {
            ...board,
            columns: board.columns.map(column => {
              if (column.name === newTaskDetails.status) {
                return {
                  ...column,
                  tasks: [...column.tasks, newTaskDetails],
                };
              }
              return column;
            }),
          };
        }
        return board;
      }),
    };
  
    // Log the updated kanban for debugging
    console.log("inside Kanban:", updatedKanban);
  
    // Update the kanban state using a function like UpdateBoard (Replace UpdateBoard with your actual update function)
    UpdateBoard(updatedKanban);

    // updateKanbanState(newTaskDetails)
    setAddTaskDetails(sampleTask)
  };
 
  const UpdateBoard = (board: Kanban) => { 
    setKanban(board)
    console.log("Updated Kanban:", board);
  }

  useEffect(() => {
    console.log("Outside Kanban:", kanban);
  }, [kanban]);


  const handleDeleteViewTask = (deleteTaskDetails:Task, deleteTaskIndex: number) => {
    let updatedKanban = { ...kanban };
  
    if (deleteTaskDetails === viewTaskDetails) {
      updatedKanban = {
        ...updatedKanban,
        boards: updatedKanban.boards.map(board => {

          if (board.name === currentPage) {
            return {
              ...board,
              columns: board.columns.map(column => {
                if (column.name === deleteTaskDetails.status && deleteTaskIndex === viewTaskIndex) {
                  const updatedTasks = column.tasks.filter((_task, index) => index !== deleteTaskIndex);
                  return {
                    ...column,
                    tasks: updatedTasks,
                  };
                }
                return column;
              }),
            };
          }
          return board;
        }),
      };
    }
  
    UpdateBoard(updatedKanban)

    // const updateKanban = {...kanban}
    // // if(deleteTaskDetails === viewTaskDetails) {
    //   updateKanban.boards.map(board => {
    //     if(board.name === currentPage) {
    //       board.columns.map(col=> {
    //         if(col.name === viewTaskDetails.status){
    //           col.tasks.splice(viewTaskIndex,1)
    //         }
    //       })
    //     }
    //   })
    // }

    // setKanban(updateKanban)
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
    updateKanbanState(task, taskIndex)
  };


// useEffect(()=> {
//   setKanban(kanban)
//   console.log("hello")
// },[kanban])

  const handleViewTaskCheckbox = (selectedTask: Subtask, taskIndex: number) => {
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
      updateKanbanState({...viewTaskDetails, subtasks: updatedSubtasks}, taskIndex)
    }
  };

  // to edit the kanban task and reflect the changes 
  const updateKanbanState = (updatedTaskDetails: Task , updatedTaskIndex?: number) => {
    // Map through the boards in the kanban state
    const updatedBoards = kanban.boards.map((board) => {
      if(board.name === currentPage){
      // Map through the columns in each board
      const updatedColumns = board.columns.map((column) => {
        // Map through the tasks in each column
        const updatedTasks = column.tasks.map((task,taskIndex) =>
          // Checking if the task title matches the updatedTaskDetails title
          (task === updatedTaskDetails) || (taskIndex === updatedTaskIndex) ? updatedTaskDetails : task
        );
        return { ...column, tasks: updatedTasks };
      });
      return { ...board, columns: updatedColumns };
    }
    else {
      return {...board}
    }
    });
  
    // Update the kanban state with the modified boards
    UpdateBoard({ boards: updatedBoards });
  };

  const handleViewTaskDropdown = (dropdown: string) => {

    const updatedTaskDetails = { ...viewTaskDetails, status: dropdown };
    setViewTaskDetails(updatedTaskDetails);
    updateKanban(updatedTaskDetails);
  };

  // const handleAddTaskDropdown = (addTask: Task, dropdown: string) => {

  //   const updatedTaskDetails = { ...addTask, status: dropdown };
  //   setAddTaskDetails(updatedTaskDetails);
  //   updateKanban(updatedTaskDetails);
  //   setAddTaskDetails(sampleTask)
  // };

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

    UpdateBoard(updateKanban)
    // setKanban(updateKanban)
  }

  const handleDeleteBoard = (board: boolean) => {
    setDeleteBoard(!board);
  };

  const handleCreateBoard = (newBoard: boolean) => {
    setNewBoard(!newBoard)
  }

  const handleNewTask = (addNewTask: boolean) => {
    setNewTask(!addNewTask);
  };


  const handleNewColumn = () => {
    const sampleColumn =   {
      "name": "",
      "tasks": []
    }
    setAddBoard({...addBoard, columns: [...addBoard.columns , sampleColumn]})
  }

  const handleAddNewColumn = () => {
    const sampleColumn =   {
      "name": "",
      "tasks": []
    }

    const updatedKanban = { ...editBoard };
    updatedKanban.boards[currentPageIndex].columns = [...updatedKanban.boards[currentPageIndex].columns , sampleColumn]
    setEditBoard(updatedKanban);
    UpdateBoard(updatedKanban)
   
  }

  const handleBoardNameChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    const updatedKanban = { ...editBoard };
    updatedKanban.boards[currentPageIndex].name = e.target.value;
    handleDialog("",e.target.value)
    setEditBoard(updatedKanban);
    UpdateBoard(updatedKanban)
}

const handleBoardColumnNameChange = (e:React.ChangeEvent<HTMLInputElement>, colIndex: number) => {
  const colName = e.target.value
  const updatedKanban = { ...editBoard };
  updatedKanban.boards[currentPageIndex].columns[colIndex].name = e.target.value;
  updatedKanban.boards[currentPageIndex].columns[colIndex].tasks.map(task => {
     task.status = colName
  })
  setEditBoard(updatedKanban);
  UpdateBoard(updatedKanban)
}

  
  const handleRemoveNewColumn = (colIndex: number) => {

    const updatedCol = addBoard.columns.filter((_,index) => index !==colIndex )
    setAddBoard({
      ...addBoard,
      columns: [...updatedCol]
    })
  }

  const handleRemoveColumn = (colIndex: number) => {
    const updatedKanban = { ...editBoard };
    const updatedCol = updatedKanban.boards[currentPageIndex].columns.filter((_,index) => index !==colIndex )
    updatedKanban.boards[currentPageIndex].columns = updatedCol;
    setEditBoard(updatedKanban);
    UpdateBoard(updatedKanban)
  }

  const handleAddNewBoard = (addNewBoard : Board) => {
    UpdateBoard({boards : [...kanban.boards, addNewBoard]})
  }


  const handleSubtaskRemove = (index: number): void => {
    const updateSubtask = viewTaskDetails.subtasks.filter((_task,i)=> i !== index)
    setViewTaskDetails({...viewTaskDetails,subtasks: updateSubtask})
    updateKanbanState({...viewTaskDetails,subtasks: updateSubtask}, viewTaskIndex);
  }

  const handleDeleteCurrentBoard = () => {
    const updatedKanban = { ...kanban };
    updatedKanban.boards = updatedKanban.boards.filter(board => board.name !== currentPage);
  
    // let newIndex = currentPageIndex;
    // if (newIndex >= updatedKanban.boards.length) {
    //   newIndex = updatedKanban.boards.length - 1;
    // }
  
    // if (newIndex >= 0) {
    //   handleDialog("", updatedKanban.boards[newIndex].name);
    //   setCurrentPageIndex(newIndex);
    // }
  
    UpdateBoard(updatedKanban);
  };
  
  

  const handleNewSubtaskRemove = (index:number): void => {
    const updateSubtask = addTaskDetails.subtasks.filter((_task,i)=> i !== index);
      setAddTaskDetails({...addTaskDetails,subtasks:updateSubtask})
  }

  const handleAddSubtask = () => {
    const tempSubtask: Subtask = {
      "title": "",
      "isCompleted" :false
    }
    const updatetask:Task = {...viewTaskDetails, subtasks: [...viewTaskDetails.subtasks,tempSubtask]}
    setViewTaskDetails(updatetask);
    updateKanbanState(updatetask , viewTaskIndex)
  }

  const handleAddNewSubTask = () => {
    const tempSubtask: Subtask = {
      "title": "",
      "isCompleted" :false
    }
    const updatetask:Task = {...addTaskDetails, subtasks: [...addTaskDetails.subtasks,tempSubtask]}
    setAddTaskDetails(updatetask)
  }


  const handleSidebar = () => {
    setSidebar(!sidebar)
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
        handleDeleteViewTask,
        addNewTaskDetails,
        addTaskDetails,
        handleNewSubtaskRemove,
        handleAddNewSubTask,
        setAddTaskDetails,
        setViewTaskDetails,
        handleCreateBoard,
        newBoard,
        setAddBoard,
        addBoard,
        handleNewColumn,
        handleRemoveNewColumn,
        handleAddNewBoard,
        setEditBoard,
        setCurrentPageIndex,
        currentPageIndex,
        editBoard,
        handleRemoveColumn,
        handleAddNewColumn,
        handleBoardNameChange,
        handleBoardColumnNameChange,
        handleDeleteCurrentBoard,
        handleSidebar,
        sidebar
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



type ClickOutsideCallback = (event: MouseEvent) => void;

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handleClickOutside: ClickOutsideCallback
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClickOutside(event);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, handleClickOutside]);
};



// useClick outside without context
// const ref = useRef<HTMLDivElement>(null);

// useEffect(() => {
//   const handleClickOutside = (event: MouseEvent) => {
//     if (ref.current && !ref.current.contains(event.target as Node)) {
//       // Handle logic when clicked outside the element
//       handleEditandDeleteCard("ViewTask");
//     }
//   };

//   document.addEventListener('click', handleClickOutside, true);

//   return () => {
//     document.removeEventListener('click', handleClickOutside, true);
//   };
// }, [handleEditandDeleteCard]);


// give ref = {ref} to which component outside you want to click