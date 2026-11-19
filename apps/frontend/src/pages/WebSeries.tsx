import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import DiscoverNavbar from "../components/DiscoverNavbar";
import { getTVSeries } from "../services/apis/movieSeriesApis";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function WebSeries() {
    const navigate = useNavigate();
    const observerTarget = useRef<HTMLDivElement>(null);

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["tv-series"],
        queryFn: getTVSeries,
        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },

        staleTime: 10 * 60 * 1000
    });

    // Combine all pages into one series array
    const series = data?.pages.flatMap(
        (page) => page.results
    ) ?? [];

    // Observe the bottom of the page
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 }
        );

        const target = observerTarget.current;

        if (target) {
            observer.observe(target);
        }

        return () => {
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

            <div className="px-8 pt-24 md:px-16">
                <h1 className="mb-6 text-3xl font-bold">
                    Explore TV Series
                </h1>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {series.map((show) => (
                        <div
                            key={show.id}
                            onClick={() => navigate({
                                to : `/movie/${show.id}`
                            })}
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

                {/* Intersection Observer Target */}
                <div
                    ref={observerTarget}
                    className="flex h-20 items-center justify-center"
                >
                    {isFetchingNextPage && (
                        <p>Loading more TV series...</p>
                    )}

                    {!hasNextPage && (
                        <p className="text-gray-500">
                            No more TV series.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
