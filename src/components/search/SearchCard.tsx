import type {Movie} from "../../api/apiFunctions.ts";
import {motion} from "motion/react";
import {IMAGE_CDN} from "../../utils/constant.ts";
import {useNavigate} from "react-router-dom";

const SearchCard = ({mov}:{mov:Movie}) => {
    const navigate=useNavigate();
    const handleClick=()=>navigate(`/movie/${mov?.id}`)
    return (
        <motion.div onClick={handleClick} key={mov.id} className={`h-48 w-36 ring-2 ring-zinc-600 shrink-0 relative rounded-sm overflow-hidden first:origin-left last:origin-right`} whileHover={{scale:1.1}}>
            <h1 className={`text-sm text-white font-white font-[poppins] font-medium absolute bottom-[8px] left-[5px] z-10`}>{mov.original_title}</h1>
            <img className={`w-full h-full object-center object-cover absolute inset-0`} src={IMAGE_CDN+mov.poster_path} alt=""/>
            <span className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-5`} />
            <span className={`absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/60 to-transparent z-5`} />
            <motion.span initial={{y:-25}} animate={{y:0}} transition={{duration:0.9}}
                         className={`w-full h-7 absolute top-0 left-0 z-10 flex justify-between items-center px-3 py-1`}>
                <h5 className={`text-white text-[10px]  bg-red-500/60 px-2 py-[2px] rounded-[2px]`}>{mov.vote_average.toFixed(1)}</h5>
                <h5 className={`text-sm font-semibold font[poppins] text-white/80`}>{mov.original_language}</h5>
            </motion.span>
        </motion.div>
    );
};

export default SearchCard;