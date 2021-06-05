import Navbar from "./shared/components/Navbar";
import Authenticate from "./users/pages/Authenticate";
import { Routes, Route } from "react-router-dom";

function Home() {
  return <div>roshan</div>;
}
function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/authenticate" element={<Authenticate />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
