import type {Movie} from "../api/apiFunctions.ts";
import Card from "./Card.tsx";
import {useEffect, useRef} from "react";

const CardsWrapper = ({data:datas,title}:{data:Movie[]|undefined,title:string}) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(!ref.current)return;
        const handleScroll=(e:WheelEvent)=>{
            if(!ref.current)return;
            if(e.deltaY===0)return;
            e.preventDefault();

            ref.current.scrollTo({
                left: (ref.current.scrollLeft + e.deltaY*5),
                behavior:'smooth',
            })
        }
        ref.current.addEventListener('wheel',handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return()=>ref?.current?.removeEventListener('wheel',handleScroll);
    }, []);

    return (
        <div  className={`h-[32vh] md:h-[40vh] flex flex-col justify-center px-6 z-10 relative `}>
            <h1 className={`text-2xl md:text-5xl font-[poppins] font-medium text-white`}>{title}</h1>
            <div ref={ref} className={`h-fit w-full overflow-x-auto overflow-y-visible relative py-[1rem] md:py-[3rem] flex gap-5`}>
                {datas?.map(data=><Card key={data.id} data={data}/>)}
            </div>
        </div>
    );
};

export default CardsWrapper;