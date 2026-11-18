
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import DiscoverNavbar from "../components/DiscoverNavbar";
import { getTVSeries } from "../queries/queryFunction";

export default function WebSeries() {
    const navigate = useNavigate();

    const { data: series = [], isLoading, isError } = useQuery({
        queryKey: ["tv-series"],
        queryFn: getTVSeries,
        staleTime: 10 * 60 * 1000,
    });

    if (isLoading){
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#141414] text-white">
                Loading TV series...
            </div>
        );
    }

    if (isError){
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#141414] text-white">
                Failed to load TV series.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] text-white">
            <DiscoverNavbar />

            <div className="px-8 pt-24 md:px-16">
                <h1 className="mb-6 text-3xl font-bold">
                    Explore TV Series
                </h1>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {series.map((show) => (
                        <div
                            key={show.id}
                            onClick={() => navigate(`/movie/${show.id}`)}
                            className="cursor-pointer"
                        >
                            <img
                                src={
                                    show.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                                        : "/placeholder.jpg"
                                }
                                alt={show.name}
                                className="h-64 w-full rounded-lg object-cover transition hover:scale-105"
                            />

                            <h2 className="mt-3 truncate font-semibold">
                                {show.name}
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                ⭐ {show.vote_average.toFixed(1)}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                {show.first_air_date?.slice(0, 4)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
