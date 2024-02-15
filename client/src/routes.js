import Admin from "./pages/Admin";
import Crm from "./pages/Crm";
import Auth from "./pages/Auth";
import Maps from "./pages/Map";
import Run from "./pages/Run";
import ApplicationPage from "./pages/ApplicationPage";
import {
  ADMIN_ROUTE,
  APPLICATION_ROUTE,
  CRM_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  MAP_ROUTE,
  RUN_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const publicRoutes = [
  {
    path: CRM_ROUTE,
    Component: Crm,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: MAP_ROUTE,
    Component: Maps,
  },
  {
    path: RUN_ROUTE,
    Component: Run,
  },
  {
    path: APPLICATION_ROUTE + "/:id",
    Component: ApplicationPage,
  },
];
