import {Outlet, useNavigate} from "react-router-dom";
import {useAppStore} from "../store/appStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../utils/firebase.ts";

const Body = () => {
    const{setUser,clearUser}=useAppStore(useShallow(state=>({setUser:state.setUser,clearUser:state.clearUser})));
    const navigate=useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
                setUser(user);
                navigate('/browse');
            }else{
                clearUser();
                navigate('/');
            }
        });
    },[]);
    return (
        <div className={`w-full min-h-screen`}>
            <Outlet/>
        </div>
    );
};

export default Body;