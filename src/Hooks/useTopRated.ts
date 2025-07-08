// hooks/useTopRated.ts
import { useQuery } from '@tanstack/react-query';
import {fetchMovieVideos, fetchTopRated} from '../api/apiFunctions';
import type { Movie } from '../api/apiFunctions';

export interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string; // ISO 8601 date string
    id: string;
}

export interface MovieVideosResponse {
    id: number;
    results: Video[];
}
export const useTopRated=()=> {
    return useQuery<Movie[], Error>({
        queryKey: ['top-rated'],
        queryFn: fetchTopRated,
        staleTime: (10 * 60 * 1000),
        gcTime:5*60*100,
    });
}
export const useHeroTrailer=(id:number)=>{
    return useQuery<MovieVideosResponse,Error>({
        queryKey:['hero-videos',id],
        queryFn:()=>fetchMovieVideos(id),
        enabled:!!id&&id>0,
    });
}