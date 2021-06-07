import Navbar from "./shared/components/Navbar";
import Routing from "./Routing";
import { LoaderBig } from "./shared/components/Loader";
import { useAuthContext } from "./context-api/auth-context";

function App() {
  const { loader } = useAuthContext();

  if (loader) {
    return <main className="loader-page">{<LoaderBig />}</main>;
  }
  return (
    <div className="App">
      <Navbar />
      <main className="content">
        <Routing />
      </main>
    </div>
  );
}

export default App;
