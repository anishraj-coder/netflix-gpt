import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useMovieDetails, useMovieCredits, useSimilarMovies, useMovieTrailer } from "../Hooks/useMovieDetails";
import Header from "../components/Header";
import CardsWrapper from "../components/CardsWrapper";
import { Loading } from "../components/MoviesContainer";
import MovieHero from "../components/movieDetails/MovieHero";
import MoviePoster from "../components/movieDetails/MoviePoster";
import MovieMetadata from "../components/movieDetails/MovieMetadata";
import GenreTags from "../components/movieDetails/GenreTags";
import TrailerButton from "../components/movieDetails/TrailerButton";
import MovieFinancials from "../components/movieDetails/MovieFinancials";
import CastSection from "../components/movieDetails/CastSection";

export const MovieError = ({ error }: { error: string }) => {
    return (
        <div className="h-screen flex items-center justify-center text-white">
            <h1 className="text-2xl font-[poppins]">{error}</h1>
        </div>
    );
};

const MovieDetails = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const id = parseInt(movieId || "0");

    const { data: movie, isLoading: loadingDetails, error: errorDetails } = useMovieDetails(id);
    const { data: credits, isLoading: loadingCredits } = useMovieCredits(id);
    const { data: similarMovies } = useSimilarMovies(id);
    const { data: videos } = useMovieTrailer(id);

    const trailer = videos?.results.find(
        video => video.type === "Trailer" && video.site === "YouTube"
    );

    const director = credits?.crew.find(person => person.job === "Director");

    if (loadingDetails || loadingCredits) return <Loading />;
    if (errorDetails) return <MovieError error={errorDetails.message} />;
    if (!movie) return null;

    return (
        <div className={`min-h-screen bg-black text-white pb-10`}>
            <Header />

            <MovieHero backdropPath={movie.backdrop_path} title={movie.title} />

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`relative -mt-40 z-10 px-10 pb-10`}
            >
                <div className={`flex flex-col md:flex-row gap-8`}>
                    <MoviePoster posterPath={movie.poster_path as string} title={movie.title} />

                    <div className={`flex-1`}>
                        <h1 className={`text-4xl md:text-6xl font-[poppins] font-bold mb-4`}>
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className={`text-xl text-gray-400 italic mb-4`}>"{movie.tagline}"</p>
                        )}

                        <MovieMetadata
                            voteAverage={movie.vote_average}
                            releaseDate={movie.release_date}
                            runtime={movie.runtime}
                            language={movie.original_language}
                        />

                        <GenreTags genres={movie.genres} />

                        <p className={`text-lg leading-relaxed mb-6 max-w-3xl font-[poppins]`}>
                            {movie.overview}
                        </p>

                        {trailer && <TrailerButton trailerKey={trailer.key as string} />}

                        <MovieFinancials
                            director={director}
                            budget={movie.budget}
                            revenue={movie.revenue}
                        />
                    </div>
                </div>

                <CastSection cast={credits?.cast || []} />


            </motion.div>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`relative -mt-10  z-10  pb-10`}
            >
                {similarMovies && similarMovies.length > 0 && (
                    <div className={`px-3`} >
                        <CardsWrapper data={similarMovies} title="Similar Movies" />
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default MovieDetails;