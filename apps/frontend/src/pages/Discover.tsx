
import { useQuery } from "@tanstack/react-query";
import DiscoverNavbar from "../components/DiscoverNavbar";
import DiscoverHero from "../components/DiscoverHero";
import MovieRow from "../components/MovieRow";
import { getDiscoverMovies, getTrendingMovies, getWishlistMovies } from "../queries/queryFunction";


export default function Homepage() {
    const { data: movies = [], isLoading: moviesLoading } = useQuery({
        queryKey: ["discover-movies"],
        queryFn: getDiscoverMovies,
        staleTime: 10 * 60 * 1000,
    });

    const { data: trendingMovies = [], isLoading: trendingLoading } = useQuery({
        queryKey: ["trending-movies"],
        queryFn: getTrendingMovies,
        staleTime: 10 * 60 * 1000,
    });

    const { data: wishlistMovies = [], isLoading: wishlistLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishlistMovies,
        
    });

    const loading = moviesLoading || trendingLoading || wishlistLoading;

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#141414] text-white">
                Loading Netflix...
            </div>
        );
    }

    return (
        <div className="min-h-screen overflow-hidden bg-[#141414]">
            <DiscoverNavbar />
            <DiscoverHero movie={movies[0] ?? null} />
            <MovieRow title="Popular Movies" movies={movies} />
            <MovieRow title="Trending This Week" movies={trendingMovies} />
            <MovieRow title="My Wishlist" movies={wishlistMovies} />
        </div>
    );
}
