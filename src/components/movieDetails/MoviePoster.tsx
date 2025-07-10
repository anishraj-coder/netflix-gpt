import { IMAGE_CDN_High } from "../../utils/constant";

interface MoviePosterProps {
    posterPath: string;
    title: string;
}

const MoviePoster = ({ posterPath, title }: MoviePosterProps) => {
    return (
        <div className="flex-shrink-0">
            <img
                src={`${IMAGE_CDN_High}${posterPath}`}
                alt={title}
                className="w-64 rounded-lg shadow-2xl"
            />
        </div>
    );
};

export default MoviePoster;