
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Movie } from "../types/movie";

interface HeroProps {
    movie: Movie | null;
}

export default function DiscoverHero({ movie }: HeroProps) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    if (!movie) return null;

    const handlePlay = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `http://localhost:8080/api/v1/movie/details/${movie.id}`,
                {
                    withCredentials: true
                }
            );

            const videos = response.data.data.videos.results;

            const trailer =
                videos.find(
                    (video: any) =>
                        video.site === "YouTube" &&
                        video.type === "Trailer" &&
                        video.official
                ) ||
                videos.find(
                    (video: any) =>
                        video.site === "YouTube" &&
                        video.type === "Trailer"
                );

            if (trailer) {
                window.open(
                    `https://www.youtube.com/watch?v=${trailer.key}`,
                    "_blank",
                    "noopener,noreferrer"
                );
            } else {
                alert("No trailer available for this movie.");
            }

        } catch (error) {
            console.error("Failed to fetch trailer:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMoreInfo = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <section
            className="relative h-[75vh] min-h-137 bg-cover bg-center"
            style={{
                backgroundImage: movie.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    : "none"
            }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />

            <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-black/20" />

            {/* Hero Content */}
            <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16">

                <h1 className="max-w-2xl text-4xl font-extrabold text-white md:text-6xl">
                    {movie.title}
                </h1>

                <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-gray-300">
                    <span className="text-green-400">
                        TMDB Rating: {movie.vote_average.toFixed(1)}
                    </span>

                    <span>
                        {movie.release_date?.split("-")[0]}
                    </span>
                </div>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white md:text-base">
                    {movie.overview}
                </p>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">

                    {/* Play Button */}
                    <button
                        onClick={handlePlay}
                        disabled={loading}
                        className="flex items-center gap-2 rounded bg-white px-7 py-3 font-bold text-black transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span>▶</span>
                        {loading ? "Loading..." : "Play"}
                    </button>

                    {/* More Info Button */}
                    <button
                        onClick={handleMoreInfo}
                        className="flex items-center gap-2 rounded bg-gray-500/70 px-7 py-3 font-bold text-white transition hover:bg-gray-500/90"
                    >
                        <span>ⓘ</span>
                        More Info
                    </button>

                </div>

            </div>
        </section>
    );
}
