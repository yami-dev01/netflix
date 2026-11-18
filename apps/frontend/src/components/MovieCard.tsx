
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="group min-w-45 cursor-pointer transition duration-300 hover:scale-105"
        >
            <div className="overflow-hidden rounded-lg">
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/placeholder.jpg"
                    }
                    alt={movie.title}
                    className="h-64 w-full rounded-lg object-cover transition group-hover:brightness-75"
                />
            </div>

            <div className="mt-2">
                <h3 className="truncate font-semibold text-white">
                    {movie.title}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                    {movie.vote_average.toFixed(1)}/10 star
                </p>
            </div>
        </div>
    );
}
