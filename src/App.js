import Navbar from "./shared/components/Navbar";
import Routing from "./Routing";

function App() {
  console.log("app rendering");
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routing />
      </main>
    </div>
  );
}

export default App;
