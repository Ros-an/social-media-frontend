import Navbar from "./shared/components/Navbar";
import Routing from "./Routing";
import { LoaderBig } from "./shared/components/Loader";
import Toast from "./shared/components/Toast";
import { useAuthContext } from "./context-api/auth-context";
function App() {
  const { loader } = useAuthContext();

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
