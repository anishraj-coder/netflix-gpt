import {Outlet, useNavigate} from "react-router-dom";
import {useAppStore} from "../store/appStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../utils/firebase.ts";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "../api/apiFunctions.ts";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useLastRoute} from "../store/lastRoute.ts";
import RouteTracker from "./RouteTracker.tsx";
import Footer from "../components/Footer.tsx";

const Body = () => {
    const {setUser, clearUser} = useAppStore(useShallow(state => ({
        setUser: state.setUser,
        clearUser: state.clearUser,
    })));

    const {lastRoute, isHydrated} = useLastRoute(useShallow(state => ({
        lastRoute: state.lastRoute,
        isHydrated: state.lastHydrated,
    })));

    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                setUserLoggedIn(true);
            } else {
                clearUser();
                setUserLoggedIn(false);
                navigate('/login', {replace: true});
            }
        });

        return () => unsubscribe();
    }, [navigate, setUser, clearUser]);


    useEffect(() => {
        const currPath = window.location.pathname;

        if (userLoggedIn && isHydrated && (currPath === '/' || currPath === '/login')) {
            if (lastRoute && ['/browse', '/search'].includes(lastRoute)) {
                navigate(lastRoute);
            } else {
                navigate('/browse', {replace: true});
            }
        }
    }, [userLoggedIn, isHydrated, lastRoute, navigate]);

    return (
        <QueryClientProvider client={queryClient}>
            <RouteTracker/>
            <div className={`w-full min-h-screen bg-black`}>
                <Outlet/>
            </div>
            <Footer/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};
export default Body;