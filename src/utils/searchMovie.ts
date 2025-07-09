import {type Movie} from "../api/apiFunctions.ts";
import {useQuery} from "@tanstack/react-query";
import {searchMovieByTitles} from "./responseFetcher.ts";


export const useSearchMovie=(movies:string[])=>{
    return useQuery<Array<Array<Movie>>>({
        queryKey:[movies],
        queryFn:()=>searchMovieByTitles(movies),
        staleTime:3*60*1000,
        gcTime:5*60*1000,
    })
}