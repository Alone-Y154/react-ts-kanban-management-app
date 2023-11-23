import AddEditBoard from "./Components/AddEditBoard";
import AddEditTask from "./Components/AddEditTask";
import Column from "./Components/Column";
import Delete from "./Components/Delete";
import Navbar from "./Components/Navbar";
import ViewTask from "./Components/ViewTask";
import { useKanban } from "./context/context";

function App() {
  const { dialogs } = useKanban();
  return (
    <div className="flex flex-col h-screen bg-grey-500">
      <Navbar />
      <div className="bg-grey-500 flex flex-col h-screen w-full p-6 overflow-x-scroll no-scrollbar scroll-smooth">
        <Column />
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
