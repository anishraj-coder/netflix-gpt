import {nanoid} from "nanoid";
import {motion} from "motion/react";
import {IMAGE_CDN} from "../../utils/constant.ts";
import type {Movie} from "../../api/apiFunctions.ts";
import {useEffect, useRef} from "react";

const CardWrapper=({data,title,i}:{data:Movie[][],title:string,i:number})=>{
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!ref.current)return;
        const handleScroll=(e:WheelEvent)=>{
            const container = ref.current;
            if (!container) return;

            // If scrolling vertically (deltaY = 0), allow default
            if (e.deltaY === 0) return;

            // Allow default vertical scroll if content does NOT overflow horizontally
            const isScrollable = container.scrollWidth > container.clientWidth;
            if (!isScrollable) return;

            // Prevent default vertical scroll, and scroll the container horizontally
            e.preventDefault();
            container.scrollTo({
                left: container.scrollLeft + e.deltaY * 2, // adjust scroll speed if needed
                behavior: "smooth",
            });
        };
        ref?.current.addEventListener('wheel',handleScroll);
        return ()=>ref?.current?.removeEventListener('wheel',handleScroll);
    }, []);
    return(
        <motion.div key={nanoid()} className={`w-full min-h-64 flex flex-col justify-center  `} >
            <h1 className={`text-2xl font-light font-[poppins] text-white`}>{title}</h1>
            <div ref={ref} className={`card-Wrapper flex gap-4 overflow-x-auto   py-4 px-1`}>
                {data[i].map(mov=>(
                    <motion.div key={nanoid()} className={`h-48 w-36 ring-2 ring-zinc-600 shrink-0 relative rounded-sm overflow-hidden first:origin-left last:origin-right`} whileHover={{scale:1.1}}>
                        <h1 className={`text-sm text-white font-white font-[poppins] font-medium absolute bottom-[8px] left-[5px] z-10`}>{mov.title}</h1>
                        <img className={`w-full h-full object-center object-cover absolute inset-0`} src={IMAGE_CDN+mov.poster_path} alt=""/>
                        <span className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-5`} />
                        <span className={`absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/60 to-transparent z-5`} />

                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
export default CardWrapper;