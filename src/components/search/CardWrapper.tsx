import {nanoid} from "nanoid";
import {motion} from "motion/react";
import type {Movie} from "../../api/apiFunctions.ts";
import {useEffect, useRef} from "react";
import SearchCard from "./SearchCard.tsx";

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
                    <SearchCard key={mov.id} mov={mov}/>
                ))}
            </div>
        </motion.div>
    );
};
export default CardWrapper;