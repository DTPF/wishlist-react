import { createBrowserRouter } from "react-router-dom";
// Pages
import HomePage from '../views/pages/HomePage/HomePage';
import ActivePage from '../views/pages/ActivePage';
import CompletedPage from '../views/pages/CompletedPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "active",
    element: <ActivePage />,
  },
  {
    path: "completed",
    element: <CompletedPage />
  },
  {
    path: "*",
    element: <HomePage />
  },
]);

export default router;