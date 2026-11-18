
export * from "./zodschema/auth.schema.js"


export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date: string;
    genre_ids: number[];
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface MovieDetailsData {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string | null;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    runtime: number;
    genres: { id: number; name: string }[];

    videos?: {
        results: {
            id: string;
            key: string;
            name: string;
            site: string;
            type: string;
            official: boolean;
        }[];
    };

    credits?: {
        cast: {
            id: number;
            name: string;
            character: string;
            profile_path: string | null;
        }[];
    };
}


export interface TVSeries {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    first_air_date: string;
}