import {useQuery} from "@tanstack/react-query";
import {fetchPopularMovies} from "../api/apiFunctions.ts";

export const usePopularMovies=()=>{
    return useQuery({
        queryKey:['popularMovies'],
        queryFn: fetchPopularMovies,
        staleTime:10*60*1000,
        gcTime:5*60*1000,
    })
}