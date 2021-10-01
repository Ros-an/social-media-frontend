import Navbar from "./shared/components/Navbar";
import Routing from "./Routing";
import { LoaderBig } from "./shared/components/Loader";
import Toast from "./shared/components/Toast";
import { useGeneralContext } from "./context-api/GeneralTaskProvider";
function App() {
  const { loader } = useGeneralContext();

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routing />
      </main>
      {loader && <LoaderBig />}
      <Toast />
    </div>
  );
}

export default App;
