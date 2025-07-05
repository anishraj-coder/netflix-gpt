import {useQuery} from "@tanstack/react-query";
import {fetchTopRated} from "../api/apiFunctions.ts";
import {loading_spinner} from "../utils/constant.ts";
import {motion} from "motion/react";
import { IoMdPlay,IoMdInformationCircleOutline  } from "react-icons/io";

const Hero = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['hero'],
        queryFn: fetchTopRated,
        staleTime: 10 * 60 * 1000,
        gcTime: 5 * 60 * 1000
    });
    const hero=data?.[0];

    return (
        <div className="h-screen w-full relative bg-black">
            {error?<div className={`w-full h-full flex items-center justify-center`}>
                <h1 className={`text-4xl text-white font-[poppins] font-medium`}>Error</h1>
                </div>: isLoading ? <div className={`w-full h-full flex items-center justify-center`}>
                    <h1 className={`text-4xl font-bold font-[poppins] text-white`}>
                        <img className={`h-24 w-24`} src={loading_spinner} alt=""/>
                    </h1>
                </div> :
                hero ? (
                    <div className={`w-full h-full absolute overflow-hidden`}>
                        <span className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black to-transparent z-10"></span>
                        <img
                        src={`https://image.tmdb.org/t/p/original/${hero.backdrop_path}`}
                        className={`w-full h-full object-cover object-center `} alt=""/>
                        <motion.div initial={{translateX:-400,opacity:0.2}} animate={{translateX:0,opacity:1}} transition={{duration:0.6,delay:0.8}} className={`bottom-wrapper z-12 absolute bottom-40 left-7`}>
                            <h1 className={`font-[poppins] font-medium text-2xl text-white mb-4 `}>{hero.original_title}</h1>
                            <div className={`flex items-center gap-4`}>
                                <button className={`bg-white px-6 md:px-8 py-2 flex items-center gap-2 rounded-xs font-[poppins] text-md lg:text-xl font-semibold`}><IoMdPlay className={'text-3xl'} /> Play</button>
                                <button className={`bg-white/30 px-3 md:px-4 py-2 flex items-center gap-2 rounded-xs font-[poppins] font-medium text-white`}><IoMdInformationCircleOutline className={`text-3xl`}/>More Info</button>
                            </div>
                        </motion.div>
                    </div>

                ) : (
                    <div>No backdrop image available</div>
                )}
        </div>

    );
};

export default Hero;
