import {create} from "zustand/react";
import {devtools, persist} from "zustand/middleware";

interface LastRoute{
    lastRoute:string|null,
    lastHydrated: boolean,
    setLastRoute:(route:string)=>void,
    setHydrated:(hydrated:boolean)=>void
}
export const useLastRoute=create<LastRoute>()(persist(
    devtools(
        set=>({
            lastRoute: null,
            lastHydrated:false,
            setLastRoute:(route:string)=>set(() =>({lastRoute:route}) ),
            setHydrated:(hydrated:boolean)=>set({lastHydrated:hydrated})
        })
        ,{name:"LastRouteDev"})
    ,{name:'LastRoute',onRehydrateStorage:()=>state => state?.setHydrated(true)}))