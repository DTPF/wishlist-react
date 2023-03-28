import HomePage from "../views/pages/HomePage/HomePage";
import ActivePage from "../views/pages/ActivePage";
import CompletedPage from "../views/pages/CompletedPage";

const routes = [
      {
        path: "/",
        exact: true,
        component: HomePage,
      },
      {
        path: "/active",
        exact: true,
        component: ActivePage,
      },
      {
        path: "/completed",
        exact: true,
        component: CompletedPage,
      },
      {
        path: "*",
        exact: "false",
        component: HomePage
      }
    ]

export default routes;