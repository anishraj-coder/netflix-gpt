import {create} from "zustand/react";
import {devtools, persist} from "zustand/middleware";

interface SearchStore{
    search: boolean,
    toggle: ()=>void,
}
export const useSearchStore=create<SearchStore>()(persist(devtools(
    set=>({
        search: false,
        toggle:()=>set((state) =>({search:!state.search}) ),
    })
),{name:"Search Store"}));