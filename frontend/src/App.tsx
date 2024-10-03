import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Header } from "./components";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
