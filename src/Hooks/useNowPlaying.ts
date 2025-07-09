import {useQuery} from "@tanstack/react-query";
import {fetchNowPlaying, type Movie} from "../api/apiFunctions.ts";

export const useNowPlaying=()=>{
    return useQuery <Movie[], Error>({
        queryKey:['now-playing'],
        queryFn:()=>fetchNowPlaying(1),
        staleTime: 10*60*1000,
        gcTime:5*60*1000,
    });
}