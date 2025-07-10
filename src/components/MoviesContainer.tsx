import CardsWrapper from "./CardsWrapper.tsx";
import {useTopRated} from "../Hooks/useTopRated.ts";
import {useNowPlaying} from "../Hooks/useNowPlaying.ts";
import {usePopularMovies} from "../Hooks/usePopularMovies.ts";
export const Loading=()=>{
    return(<div className={`h-[40vh] flex items-center justify-center`}>
        <h1 className={`text-6xl font-[poppins] font-semibold text-white`}>Loading....</h1>
    </div>);
};
export const Error=({error}:{error:boolean})=>{
    return (<div className={`h-[40vh] flex items-center justify-center`}>
        <h1 className={`text-6xl font-[poppins] font-semibold text-white`}>{error&&`Error Occurred`}</h1>
    </div>);
}
const MoviesContainer = () => {
    const{data:topRated,isLoading:loadingTopRated,isError:errorTopRated}=useTopRated();
    const {data:nowPlaying,isLoading:loadingNowPlaying,isError:errorNowPlaying}=useNowPlaying();
    const {data:popular,isLoading:loadingPopular,isError: errorPopular}=usePopularMovies();
    return (
        <div className={`min-h-screen  flex flex-col gap-6 -mt-30 md:-mt-40 z-20 pb-20`}>

            {loadingTopRated?<Loading/>:errorTopRated?<Error error={errorTopRated}/>:<CardsWrapper data={topRated} title={`Top Rated`} />}
            {loadingNowPlaying?<Loading/>:errorNowPlaying?<Error error={errorNowPlaying}/>:<CardsWrapper data={nowPlaying} title={`Now Playing`}/>}
            {loadingPopular?<Loading/>:errorPopular?<Error error={errorPopular}/>:<CardsWrapper data={popular} title={`Popular Movies`}/>}
        </div>
    );
};

export default MoviesContainer;