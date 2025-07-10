import {useLocation} from "react-router-dom";
import {useLastRoute} from "../store/lastRoute.ts";
import {useEffect} from "react";

const RouteTracker=()=>{
    const location=useLocation();
    const setLastRoute=useLastRoute(state => state.setLastRoute);
    useEffect(() => {
        if(location.pathname!=='/'&&location.pathname!=='/login')
            setLastRoute(location.pathname)
    }, [location.pathname,setLastRoute]);
    return null;
}
export default  RouteTracker;