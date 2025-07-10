import { IMAGE_CDN } from "../../utils/constant";
import {useEffect, useRef} from "react";

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface CastSectionProps {
    cast: CastMember[];
}

const CastSection = ({ cast }: CastSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const handleWheel=(e:WheelEvent)=>{
        if(e.deltaY===0)return;
        if(!ref.current)return;
        if(ref.current.clientWidth<=ref.current.scrollWidth)
            e.preventDefault();
        ref.current.scrollTo({
            left:ref.current.scrollLeft+e.deltaY,
            behavior:'smooth',
        })
    }
    useEffect(() => {
        if(!ref.current)return;
        ref.current.addEventListener('wheel',handleWheel);
        return()=>ref?.current?.removeEventListener('wheel',handleWheel);
    }, []);

    if (!cast || cast.length === 0) return null;
    return (
        <div className="mt-12 font-[poppins]">
            <h2 className="text-3xl font-[poppins] font-semibold mb-6">Cast</h2>
            <div ref={ref} className="flex gap-4 overflow-x-auto pb-4">
                {cast.slice(0, 10).map(actor => (
                    <div key={actor.id} className="flex-shrink-0 w-32">
                        <img
                            src={actor.profile_path ? `${IMAGE_CDN}${actor.profile_path}` : '/Assets/Images/profile_img.png'}
                            alt={actor.name}
                            className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                        <p className="font-medium text-sm font-[poppins]">{actor.name}</p>
                        <p className="text-gray-400 text-xs font-[poppins]">{actor.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CastSection;