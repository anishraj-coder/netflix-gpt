import { motion } from "motion/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IMAGE_CDN_High } from "../../utils/constant";

interface MovieHeroProps {
    backdropPath: string|null;
    title: string;
}

const MovieHero = ({ backdropPath, title }: MovieHeroProps) => {
    const navigate = useNavigate();

    return (
        <div className="relative h-[70vh] md:h-[80vh] font-[poppins]">
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                src={`${IMAGE_CDN_High}${backdropPath}`}
                alt={title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <motion.button
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => navigate(-1)}
                className="absolute top-32 left-10 flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
                <FaArrowLeft className="text-xl" />
                <span className="font-[poppins] text-lg">Back</span>
            </motion.button>
        </div>
    );
};

export default MovieHero;