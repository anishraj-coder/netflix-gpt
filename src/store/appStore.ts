import {create} from "zustand/react";
import {devtools,persist} from "zustand/middleware";


interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    createdAt?: string;
    lastLoginAt?: string;
    isAnonymous: boolean;
}
// Interface for the store
interface AppStore {
    user: UserData | null;
    isLoading: boolean;
    setUser: (user: UserData | null) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
}
export const useAppStore=create<AppStore>()(persist(devtools(
    set=>({
        user: null,
        isLoading:true,
        setUser:(user)=>set(()=> ({user:user})),
        clearUser:()=>set(()=>({user:null})),
        setLoading:(loading)=>set(()=>({isLoading:loading}))
    })
),{name:'Appstore'}));