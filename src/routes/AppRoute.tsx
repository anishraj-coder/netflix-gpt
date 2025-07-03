import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.tsx";
import SignUp from "../pages/SignUp.tsx";

export const AppRoute=createBrowserRouter([{path:'/',element:<Login/>},{path:'/signup',element:<SignUp/>}]);