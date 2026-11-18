import type { Movie } from "@share/types";
import MovieCard from "./MovieCard";

interface MovieRowProps {
    title: string;
    movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
    return (
        <section className="px-8 py-8 md:px-16">
            <h2 className="mb-6 text-2xl font-bold text-white">
                {title}
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-5">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
}