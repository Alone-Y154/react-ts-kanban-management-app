import AddColumn from "./Components/AddColumn";
import Navbar from "./Components/Navbar";
import ViewTask from "./Components/ViewTask";

function App() {
  return( 
  <div className="flex flex-col h-screen bg-grey-500">
    <Navbar />
    <AddColumn />
    <ViewTask />
    </div>
    );
}

export default App;
