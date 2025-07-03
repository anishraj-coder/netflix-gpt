import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.tsx";

export const AppRoute=createBrowserRouter([{path:'/',element:<Login/>}]);