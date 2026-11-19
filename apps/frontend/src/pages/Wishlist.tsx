import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getWishlistMovies } from "../services/apis/wishlistApis";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Wishlist() {
    const navigate = useNavigate();

    const { data: movies = [], isLoading, isError } = useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishlistMovies,
    });

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (isError) {
        return (
            <Error />
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] px-8 py-10 text-white md:px-16">
            <h1 className="mb-8 text-3xl font-bold">
                My Wishlist
            </h1>

            {movies.length === 0 ? (
                <p className="text-gray-400">
                    Your wishlist is empty.
                </p>
            ) : (
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="cursor-pointer"
                        >
                            <img
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : "/placeholder.jpg"
                                }
                                alt={movie.title}
                                className="h-64 w-full rounded-lg object-cover transition hover:scale-105"
                            />

                            <h2 className="mt-3 truncate font-semibold">
                                {movie.title}
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                {movie.vote_average.toFixed(1)}/10 rating
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
