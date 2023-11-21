import Column from "./Components/Column";
import Navbar from "./Components/Navbar";

function App() {
  return( 
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="bg-grey-500 h-screen w-full p-6 overflow-x-scroll no-scrollbar scroll-smooth">
    <Column />
    </div>
    </div>
    );
}

export default App;
