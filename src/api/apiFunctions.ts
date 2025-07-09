import {QueryClient} from "@tanstack/react-query";
import axios from "axios";
import type {MovieVideosResponse} from "../Hooks/useTopRated.ts";


export interface MovieChange {
    id: number;
    adult: boolean;
}

export interface MovieChangesResponse {
    results: MovieChange[];
    page: number;
    total_pages: number;
    total_results: number;
}

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
export const queryClient=new QueryClient({});
export const axiosApi=   axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    }
});
export const fetchTopRated= async():Promise<Movie[]>=>{
    const res= await  axiosApi.get('/movie/top_rated');
    return res.data.results;
}
export const fetchMovies= async( page:number=1)=>{
    const res=await axiosApi.get<MovieChangesResponse>(`movie/changes`,{params:{page:page}});
    return res.data.results;
}
export const fetchMovieVideos = async (movieId: number) => {
    const res = await axiosApi.get<MovieVideosResponse>(`movie/${movieId}/videos`);
    return res.data;
};
export const fetchNowPlaying= async()=>{
    const res=await axiosApi.get<Movie[]>(`movie/now_playing`);
    return res.data.results;
}
export const fetchPopularMovies=async()=>{
    const res=await axiosApi.get<Movie[]>(`movie/popular`);
    return res.data.results;
}