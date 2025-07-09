import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.tsx";
import Browse from "../pages/Browse.tsx";
import Body from "../pages/Body.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import GPTSearch from "../pages/GPTSearch.tsx";

export const AppRoute=createBrowserRouter([{path:'/',element:<Body/>,
    errorElement:<ErrorPage/>,
    children:[
        {path:'/login',element:<Login/>},
        {path:'/browse',element:<Browse/>},
        {path:'/search',element:<GPTSearch/>}
    ]
},{path:'/error',element:<ErrorPage/>}]);