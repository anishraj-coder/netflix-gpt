import {Outlet, useNavigate} from "react-router-dom";
import {useAppStore} from "../store/appStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../utils/firebase.ts";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "../api/apiFunctions.ts";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useSearchStore} from "../store/searchStore.ts";

const Body = () => {
    const {setUser, clearUser} = useAppStore(useShallow(state => ({
        setUser: state.setUser,
        clearUser: state.clearUser
    })));
    const search=useSearchStore(state => state.search);
    const navigate = useNavigate();
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                if(search)navigate('/search');
                else navigate('/browse')
            } else {
                clearUser();
                navigate('/login');
            }
        });
        return () => {
            unsuscribe();
        }
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <div className={`w-full min-h-screen bg-black`}>
                <Outlet/>
            </div>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

export default Body;