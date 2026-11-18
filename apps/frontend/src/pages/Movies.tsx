import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import DiscoverNavbar from "../components/DiscoverNavbar";
import MovieCard from "../components/MovieCard";
import { getAllMovies } from "../services/apis/movieSeriesApis";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Movies() {
    const observerTarget = useRef<HTMLDivElement>(null);

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["all-movies"],
        queryFn: getAllMovies,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
        staleTime: 10 * 60 * 1000
    });

    // Combine all pages into one movies array
    const movies = data?.pages.flatMap(
        (page) => page.results
    ) ?? [];

    // Observe the bottom of the page
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 }
        );

        const target = observerTarget.current;

        if (target) {
            observer.observe(target);
        }

        return ()=> {
            observer.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

                {/* Infinite scroll trigger */}
                <div
                    ref={observerTarget}
                    className="flex justify-center py-10"
                >
                    {isFetchingNextPage && (
                        <p>Loading more movies...</p>
                    )}

                    {!hasNextPage && movies.length > 0 && (
                        <p className="text-gray-400">
                            You've reached the end.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
