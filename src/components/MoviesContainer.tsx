import CardsWrapper from "./CardsWrapper.tsx";
import {useTopRated} from "../Hooks/useTopRated.ts";

const MoviesContainer = () => {
    const{data,isLoading}=useTopRated();
    return (
        <div className={`min-h-screen  flex flex-col gap-6 -mt-30 md:-mt-40 z-20`}>

            {isLoading?<div className={`h-[40vh] flex items-center justify-center`}>
                <h1 className={`text-6xl font-[poppins] font-semibold text-white`}>Loading....</h1>
            </div>:<CardsWrapper data={data} title={`Top Rated`} />}
        </div>
    );
};

export default MoviesContainer;