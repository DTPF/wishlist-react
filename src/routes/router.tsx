import { createBrowserRouter } from "react-router-dom";
// Layouts
import MainLayout from "views/layout/mainLayout";
// Pages
import WishlistPage from '../views/pages/wishlistPage/WishlistPage';
import HomePage from "views/pages/wishlistPage/homePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
        children: [
          {
            path: ":isCompleted",
            element: <WishlistPage />,
          },
        ]
      },
      {
        path: "*",
        element: <div>Not found</div>
      },
    ]
  }
]);

export default router;