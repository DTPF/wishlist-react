import { createBrowserRouter } from "react-router-dom";
// Pages
import HomePage from '../views/pages/HomePage/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: ":isCompleted",
        element: <HomePage />,
      },
    ]
  },
  {
    path: "*",
    element: <HomePage />
  },
]);

export default router;