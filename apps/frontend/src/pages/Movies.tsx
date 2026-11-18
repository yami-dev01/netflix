
import { useQuery } from "@tanstack/react-query";
import DiscoverNavbar from "../components/DiscoverNavbar";
import MovieCard from "../components/MovieCard";
import { getAllMovies } from "../queries/queryFunction";

export default function Movies() {
    const { data: movies = [], isLoading, isError } = useQuery({
        queryKey: ["all-movies"],
        queryFn: getAllMovies,
        staleTime: 10 * 60 * 1000,
    });

    if (isLoading){
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#141414] text-white">
                Loading movies...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#141414] text-white">
                Failed to load movies.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] text-white">
            <DiscoverNavbar />

            <div className="px-8 pb-10 pt-28 md:px-16">
                <h1 className="mb-8 text-3xl font-bold">
                    Explore Movies
                </h1>

                <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
