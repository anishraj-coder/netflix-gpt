import {loading_spinner} from "../utils/constant.ts";
import {motion} from "motion/react";
import {IoMdPlay, IoMdInformationCircleOutline} from "react-icons/io";
import {useHeroTrailer, useTopRated} from "../Hooks/useTopRated.ts";

const Hero = () => {
    const {data, isLoading, error} = useTopRated();
    const hero = data?.[5];
    const {isLoading: isVideoLoading, data: videoData} = useHeroTrailer(hero?.id??-1);
    if (!hero && isLoading) {
        return <div className={`w-full h-screen flex items-center justify-center`}>
            <h1 className={`text-4xl font-bold font-[poppins] text-white`}>
                <img className={`h-24 w-24`} src={loading_spinner} alt=""/>
            </h1></div>
    } else if (!hero && error) {
        return <div className={`w-full h-screen flex items-center justify-center`}>
            <h1 className={`text-4xl text-white font-[poppins] font-medium`}>{error.message}</h1>
        </div>
    }
    const trailer = videoData?.results?.find(movie => movie.type.toLowerCase() === 'Trailer'.toLowerCase()||movie.type.toLowerCase()==='teaser');
    return (
        <div className="h-[60vh] md:h-[80vh] lg:h-screen w-full relative bg-black">
            {hero ? (
                <div className={`w-full h-full absolute overflow-hidden`}>
                    <span
                        className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black to-transparent z-10"></span>
                    {!isVideoLoading ? <iframe
                        className={`w-full h-full aspect-auto object-cover pointer-events-none`}
                        src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${trailer?.key}&showinfo=0&iv_load_policy=3&disablekb=1&fs=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    /> : <img
                        src={`https://image.tmdb.org/t/p/original/${hero.backdrop_path}`}
                        className={`w-full h-full object-cover object-center `} alt=""/>}
                    <motion.div initial={{translateX: -400, opacity: 0.2}} animate={{translateX: 0, opacity: 1}}
                                transition={{duration: 0.6, delay: 0.8}}
                                className={`bottom-wrapper scale-80 origin-left md:scale-100 z-12 absolute bottom-32 md:bottom-40 lg:bottom-56 left-7`}>
                        <h1 className={`font-[poppins] font-medium text-2xl text-white mb-4 `}>{hero.original_title}</h1>
                        <div className={`flex items-center gap-4`}>
                            <button
                                className={`bg-white px-6 md:px-8 py-2 flex items-center gap-2 rounded-xs font-[poppins] text-md lg:text-xl font-semibold`}>
                                <IoMdPlay className={'text-3xl'}/> Play
                            </button>
                            <button
                                className={`bg-white/30 px-3 md:px-4 py-2 flex items-center gap-2 rounded-xs font-[poppins] font-medium text-white`}>
                                <IoMdInformationCircleOutline className={`text-3xl`}/>More Info
                            </button>
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
