import Column from "./Components/Column";
import EditandDelete from "./Components/EditandDeleteCard";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="flex flex-col h-screen bg-grey-500">
      <Navbar />
      <EditandDelete />
      <div className="bg-grey-500 h-screen w-full p-6 overflow-x-scroll no-scrollbar scroll-smooth">
        <Column />
      </div>
    </div>
  );
}

export default App;
