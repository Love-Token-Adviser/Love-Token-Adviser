import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <h1 className="text-blue-500 bg-black">home</h1>
    </div>
  );
}

export default App;
