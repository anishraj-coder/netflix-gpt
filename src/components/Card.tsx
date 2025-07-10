import type {Movie} from "../api/apiFunctions.ts";
import {IMAGE_CDN} from "../utils/constant.ts";
import {AnimatePresence, motion} from "motion/react";
import {useHoverIntent} from "react-use-hoverintent";
import { FaStar } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";



const Card = ({data}: { data: Movie }) => {
    const [isHovering,ref]=useHoverIntent<HTMLDivElement>({timeout:200});
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate(`/movie/${data.id}`);
    };
    return (
        <motion.div key={data.id} ref={ref} onClick={handleClick}
            className={`
                h-44 w-72 bg-black rounded-sm shrink-0 overflow-hidden  group hover:z-20 shadow-md ring-2 ring-zinc-800 shadow-zinc-900 relative first:origin-left last:origin-right cursor-pointer`}
            whileHover={{
                scale: 1.35,
                transition: {
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.6
                }
            }}
        >
            <motion.img
                src={`${IMAGE_CDN}${data.backdrop_path}`}
                className={`h-full w-full object-center object-cover`}
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 }
                }}
                alt={data.original_title}
            />
            <AnimatePresence mode={`wait`}>
                <motion.h1
                    className={`absolute w-full h-fit bottom-4 left-4 text-lg  text-white  font-[poppins] font-medium z-3  max-w-[90%] flex flex-col `}
                           initial={{y:"62px"}}
                         whileHover={{y:0}}

                >
                    <span className={``}>{data.original_title}</span>
                    <motion.div
                        className="overflow-hidden"

                    >
                        <motion.span
                            className={`text-white font-light text-xs font-[poppins] block h-12 `}
                        >
                            {data.overview.slice(0,100)+"..."}
                        </motion.span>
                    </motion.div>
                </motion.h1>
            </AnimatePresence>
            <motion.div
                className={`absolute inset-0 bg-gradient-to-tr from-black/70 via-black/10 to-transparent`}
                whileHover={{
                    background: "linear-gradient(to top right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)"
                }}
            />
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        className="w-full h-[40px] absolute top-0 left-0 px-4 py-2 flex justify-between items-center cursor-pointer"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center gap-1 bg-red-500 px-1 py-[3px] rounded-xs">
                            <FaStar className="text-yellow-300 text-[10px]" />
                            <span className="text-white text-[10px] font-light">
          {data.vote_average.toFixed(1)}
        </span>
                        </div>

                        <div className="text-white text-[10px] font-light flex gap-4">
                            <span>{new Date(data.release_date).getFullYear()}</span>
                            <span>{data.original_language.toUpperCase()}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};


export default Card;