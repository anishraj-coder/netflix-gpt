import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.tsx";
import Browse from "../pages/Browse.tsx";
import Body from "../pages/Body.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";

export const AppRoute=createBrowserRouter([{path:'/',element:<Body/>,
    children:[
        {path:'/',element:<Login/>},
        {path:'/browse',element:<Browse/>}
    ]
},{path:'/error',element:<ErrorPage/>}]);