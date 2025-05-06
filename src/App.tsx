import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

