import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { LoginProvider } from "./components/context/LoginContext";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
    </div>
  );
}

export default App;
