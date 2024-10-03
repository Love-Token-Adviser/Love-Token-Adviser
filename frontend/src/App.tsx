import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
