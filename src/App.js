import Navbar from "./shared/components/Navbar";
import RouteComponent from "./RouteComponent";

function App() {
  console.log("app rendering");
  return (
    <div className="App">
      <Navbar />
      <main>
        <RouteComponent />
      </main>
    </div>
  );
}

export default App;
