import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies, fetchMovieVideos } from "../api/apiFunctions";
import type { MovieDetails, MovieCredits, Movie } from "../api/apiFunctions";
import type { MovieVideosResponse } from "./useTopRated";

export const useMovieDetails = (movieId: number) => {
    return useQuery<MovieDetails, Error>({
        queryKey: ['movie-details', movieId],
        queryFn: () => fetchMovieDetails(movieId),
        enabled: !!movieId,
        staleTime: 30 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useMovieCredits = (movieId: number) => {
    return useQuery<MovieCredits, Error>({
        queryKey: ['movie-credits', movieId],
        queryFn: () => fetchMovieCredits(movieId),
        enabled: !!movieId,
        staleTime: 30 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useSimilarMovies = (movieId: number) => {
    return useQuery<Movie[], Error>({
        queryKey: ['similar-movies', movieId],
        queryFn: () => fetchSimilarMovies(movieId),
        enabled: !!movieId,
        staleTime: 30 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useMovieTrailer = (movieId: number) => {
    return useQuery<MovieVideosResponse, Error>({
        queryKey: ['movie-videos', movieId],
        queryFn: () => fetchMovieVideos(movieId),
        enabled: !!movieId,
        staleTime: 30 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};