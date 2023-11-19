import AddColumn from "./Components/AddColumn";
import AddEditTask from "./Components/AddEditTask";
import Navbar from "./Components/Navbar";

function App() {
  return( 
  <div className="flex flex-col h-screen bg-grey-500">
    <Navbar />
    <AddColumn />
    <AddEditTask />
    </div>
    );
}

export default App;
