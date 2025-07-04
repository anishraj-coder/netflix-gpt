import {RouterProvider, } from "react-router-dom";
import {AppRoute} from "./routes/AppRoute.tsx";


const App = () => {

    return (
        <div>
            <RouterProvider router={AppRoute}/>
        </div>
    );
};

export default App;