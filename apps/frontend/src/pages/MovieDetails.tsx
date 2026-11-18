import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/apis/movieSeriesApis";
import { addToWishlist } from "../services/apis/wishlist";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function MovieDetails() {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: movie, isLoading, isError} = useQuery({
        queryKey: ["movie-details", movieId],
        queryFn: () => getMovieDetails(movieId!),
        enabled: !!movieId,
    });

    const wishlistMutation = useMutation({
        mutationFn: () => addToWishlist(movieId!),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });
        },
    });

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (isError || !movie) {
        return (
            <Error />
        );
    }

    // Find official YouTube trailer
    const trailer =
        movie.videos?.results.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer" &&
                video.official
        ) ??
        movie.videos?.results.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        );

    return (
        <div className="min-h-screen bg-[#141414] text-white">

            {/* Backdrop */}
            <div
                className="relative h-[65vh] min-h-112.5 bg-cover bg-center"
                style={{
                    backgroundImage: movie.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                        : "none"
                }}
            >
                <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-black/40 to-black/20" />

                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-8 top-8 z-10 rounded-full bg-black/60 px-5 py-2 hover:bg-black"
                >
                    ← Back
                </button>

                <div className="absolute bottom-10 left-8 z-10 max-w-3xl md:left-16">

                    <h1 className="text-4xl font-extrabold md:text-6xl">
                        {movie.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
                        <span>
                            ⭐ {movie.vote_average.toFixed(1)}/10
                        </span>

                        <span>{movie.release_date}</span>

                        <span>{movie.runtime} min</span>
                    </div>

                    {/* Genres */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {movie.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="rounded-full border border-gray-500 px-3 py-1 text-sm"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* Wishlist Button */}
                    <button
                        onClick={() => wishlistMutation.mutate()}
                        disabled={
                            wishlistMutation.isPending ||
                            wishlistMutation.isSuccess
                        }
                        className="mt-6 flex items-center gap-2 rounded bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {wishlistMutation.isPending
                            ? "Adding..."
                            : wishlistMutation.isSuccess
                                ? "✓ Added to Wishlist"
                                : "+ Add to Wishlist"
                        }
                    </button>

                    {wishlistMutation.isError && (
                        <p className="mt-2 text-sm text-red-400">
                            Failed to add movie to wishlist.
                        </p>
                    )}

                </div>
            </div>

            {/* Movie Information */}
            <div className="px-8 py-8 md:px-16">

                <h2 className="mb-4 text-2xl font-bold">
                    About the Movie
                </h2>

                <p className="max-w-4xl leading-relaxed text-gray-300">
                    {movie.overview || "No description available."}
                </p>

                {/* Trailer */}
                <h2 className="mb-5 mt-10 text-2xl font-bold">
                    Official Trailer
                </h2>

                {trailer ? (
                    <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-xl">
                        <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={trailer.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <p className="text-gray-400">
                        No trailer available for this movie.
                    </p>
                )}

                {/* Cast */}
                <h2 className="mb-5 mt-10 text-2xl font-bold">
                    Cast
                </h2>

                <div className="flex gap-5 overflow-x-auto pb-5">
                    {movie.credits?.cast?.slice(0, 12).map((actor) => (
                        <div key={actor.id} className="min-w-32.5">
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                        : "/placeholder.jpg"
                                }
                                alt={actor.name}
                                className="h-40 w-32 rounded-lg object-cover"
                            />

                            <p className="mt-2 font-semibold">
                                {actor.name}
                            </p>

                            <p className="text-sm text-gray-400">
                                {actor.character}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
