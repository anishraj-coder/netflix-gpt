import { motion } from "motion/react";
import { FaPlay } from "react-icons/fa";

interface TrailerButtonProps {
    trailerKey: string;
}

const TrailerButton = ({ trailerKey }: TrailerButtonProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`https://youtube.com/watch?v=${trailerKey}`, '_blank')}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors font-[poppins]"
        >
            <FaPlay />
            Watch Trailer
        </motion.button>
    );
};

export default TrailerButton;