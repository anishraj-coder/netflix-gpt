import {type FormEvent, useEffect, useRef, useState} from 'react';
import Header from "../components/Header.tsx";
import {BACKGROUND_IMAGE, } from "../utils/constant.ts";
import useResponse from "../Hooks/useResponse.ts";
import { useSearchMovie} from "../utils/searchMovie.ts";

import CardWrapper from "../components/search/CardWrapper.tsx";
import {nanoid} from "nanoid";


const GptSearch = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<string[]>([]);
    const { data:apiData,isError:apiError,isLoading:apiLoading } = useResponse(query);
    const {data,isLoading}=useSearchMovie(movies);

    useEffect(() => {
        if (apiData) setMovies(apiData.split(',').map(s => s.trim()));
    }, [apiData]);



    const handler = (e: FormEvent) => {
        e.preventDefault();
        if (ref.current?.value) {
            setQuery(ref.current.value);
        }
    };
    return (
        <div className={`bg-black min-h-screen w-full bg-[url(${BACKGROUND_IMAGE})]  flex flex-col items-center gap-4 px-5`}>

            <Header/>
            <h1 className={`text-white font-semibold text-center text-2xl font-[poppins] pt-28 px-10  `}>GPTSearch</h1>
            <form action=""
                  className={`bg-zinc-800/60 w-full lg:w-[60%] rounded-sm px-4 py-2 flex gap-2 items-center `}
                  onSubmit={handler}>
                <input ref={ref} type="text"
                       className={`h-full w-full px-3 py-2 font-[poppins] outline-none bg-white focus:ring-2 ring-red-500/70 rounded-lg`}
                       placeholder={`Search for your choice`}/>
                <button
                    className={`h-full px-4 py-2 font-[poppins] font-medium text-xl text-center rounded-lg text-white bg-red-500 outline-none`}>Search
                </button>
            </form>
            <div className={`results-wrapper min-h-[65vh] overflow-y-auto overflow-x-hidden bg-black/60 w-full md:w-[80%] lg:w-[70%] rounded-md flex flex-col items-center py-4 px-3 `}>
                {query.length<5&&<h1 className={`text-3xl text-white font-[poppins]`}>The search text should be at least 5 letters long</h1>}
                {apiLoading?<h1 className={`text-3xl text-white font-[poppins]`}>ApiLoading....</h1>:apiError?<h1 className={`text-3xl text-white font-[poppins]`}>{apiError}</h1>:(data?(
                    <div className={`w-full `}>
                        {movies.map((movie,i)=>{
                            return(
                               <CardWrapper key={nanoid()} data={data} title={movie} i={i}/>
                            )
                        })}
                    </div>
                ):isLoading&&<h1 className={`text-3xl text-white font-[poppins] font-medium`}>Movies are Loading.......</h1>)}
            </div>
        </div>
    );
};

export default GptSearch;