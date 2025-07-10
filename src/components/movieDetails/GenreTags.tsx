interface Genre {
    id: number;
    name: string;
}

interface GenreTagsProps {
    genres: Genre[];
}

const GenreTags = ({ genres }: GenreTagsProps) => {
    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {genres.map(genre => (
                <span
                    key={genre.id}
                    className="px-3 py-1 bg-zinc-800 rounded-full text-sm font-[poppins]"
                >
                    {genre.name}
                </span>
            ))}
        </div>
    );
};

export default GenreTags;