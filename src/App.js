import Navbar from "./shared/components/Navbar";
import Authenticate from "./users/pages/Authenticate";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/authenticate" element={<Authenticate />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
