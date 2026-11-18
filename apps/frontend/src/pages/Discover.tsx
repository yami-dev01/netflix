import { useQuery } from "@tanstack/react-query";
import DiscoverNavbar from "../components/DiscoverNavbar";
import DiscoverHero from "../components/DiscoverHero";
import MovieRow from "../components/MovieRow";
import Loading from "../components/Loading"
import { getDiscoverMovies, getTrendingMovies } from "../services/apis/movieSeriesApis";
import { getWishlistMovies } from "../services/apis/wishlist" 


export default function Homepage() {
    const { data: movies = [], isLoading: moviesLoading } = useQuery({
        queryKey: ["discover-movies"],
        queryFn: getDiscoverMovies,
    });

    const { data: trendingMovies = [], isLoading: trendingLoading } = useQuery({
        queryKey: ["trending-movies"],
        queryFn: getTrendingMovies,
    });

    const { data: wishlistMovies = [], isLoading: wishlistLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishlistMovies,
    });

    const loading = !moviesLoading && !trendingLoading && !wishlistLoading;

    if (loading) {
        return (
            <Loading />
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
