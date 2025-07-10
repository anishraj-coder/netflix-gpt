import { FaStar } from "react-icons/fa";

interface MovieMetadataProps {
    voteAverage: number;
    releaseDate: string;
    runtime: number;
    language: string;
}

const MovieMetadata = ({ voteAverage, releaseDate, runtime, language }: MovieMetadataProps) => {
    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="flex flex-wrap items-center gap-4 mb-6 font-[poppins]">
            <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded">
                <FaStar className="text-yellow-300" />
                <span className="font-medium">{voteAverage.toFixed(1)}</span>
            </div>
            <span>{new Date(releaseDate).getFullYear()}</span>
            <span>{formatRuntime(runtime)}</span>
            <span className="uppercase">{language}</span>
        </div>
    );
};

export default MovieMetadata;