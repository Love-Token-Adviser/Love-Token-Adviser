import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { LoginProvider } from "./components/context/LoginContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen overflow-hidden">
        <LoginProvider>
          <RouterProvider router={router} />
        </LoginProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
