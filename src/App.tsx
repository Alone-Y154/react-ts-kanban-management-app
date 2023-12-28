import AddEditBoard from "./Components/AddEditBoard";
import AddEditTask from "./Components/AddEditTask";
import Column from "./Components/Column";
import Delete from "./Components/Delete";
import Navbar from "./Components/Navbar";
import SideNavBar from "./Components/SideNavBar";
import ViewTask from "./Components/ViewTask";
import { useKanban } from "./context/context";
import ShowSidebar from "./assets/icon-show-sidebar.svg"
// import AddColumn from "./Components/AddColumn";

function App() {
  const { dialogs, sidebar, handleSidebar } = useKanban(); {/* kanban, currentPage */}
  return (
    <div className="flex flex-col h-screen bg-grey-500">
      <Navbar />
     {!sidebar && <p onClick={handleSidebar} className="bg-primary-700 hidden  cursor-pointer absolute bottom-8 rounded-r-full w-14 h-12 md:flex justify-center items-center"><img src={ShowSidebar} /></p>}
      <div className="bg-grey-500 flex flex-col md:flex-row h-screen w-full  overflow-x-scroll no-scrollbar scroll-smooth">
      {sidebar && <SideNavBar />}  
        <div className="p-6  overflow-x-scroll no-scrollbar scroll-smooth">
          {/* {kanban.boards.map(board => {
              if(board.name === currentPage) {
                return(
                board.columns.length > 0 ? <Column /> : <AddColumn />
                )
              }
          })  } */}
          <Column />
          
        </div>
      </div>

      {dialogs.ViewTask && <ViewTask />}
      {dialogs.EditTask && <AddEditTask />}
      {dialogs.DeleteTask && <Delete />}
      {dialogs.AddNewTask && <AddEditTask />}
      {dialogs.EditBoard && <AddEditBoard />}
    </div>
  );
}

export default App;
