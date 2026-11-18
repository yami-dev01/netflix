
import axios from "axios";
import type { MovieResponse , Movie , TVSeries, MovieDetailsData } from "@share/types";



export const getAllMovies = async ({ pageParam }: { pageParam: number }) => {
    const response = await axios.get(
        "http://localhost:8080/api/v1/movie/movies",
        {
            params: {
                page: pageParam
            },
            withCredentials: true
        }
    );

    return response.data.data;
};



export const getTVSeries = async ({ pageParam }: { pageParam: number }) => {
    const response = await axios.get(
        `http://localhost:8080/api/v1/movie/series?page=${pageParam}`,
        { withCredentials: true }
    );

    return response.data.data;
};



export const getDiscoverMovies = async () => {
    const response = await axios.get<{ data: MovieResponse }>(
        "http://localhost:8080/api/v1/movie/discover",
        { withCredentials: true }
    );

    return response.data.data.results;
};


export const getTrendingMovies = async () => {
    const response = await axios.get<{ data: MovieResponse }>(
        "http://localhost:8080/api/v1/movie/trending",
        { withCredentials: true }
    );

    return response.data.data.results;
};


export const getMovieDetails = async (movieId: string) => {
    const response = await axios.get<{ data: MovieDetailsData }>(
        `http://localhost:8080/api/v1/movie/details/${movieId}`,
        { withCredentials: true }
    );

    return response.data.data;
};

export const addToWishlist = async (movieId: string) => {
    const response = await axios.post(
        `http://localhost:8080/api/v1/wishlist/add/${movieId}`,
        {},
        { withCredentials: true }
    );

    return response.data;
};

interface WishlistEntry {
    id: number;
    movieId: number;
    userId: number;
}

export const getWishlistMovies = async () => {
    const wishlistResponse = await axios.get<{
        wishlistMovies: WishlistEntry[];
    }>(
        "http://localhost:8080/api/v1/wishlist/",
        { withCredentials: true }
    );

    const wishlistEntries = wishlistResponse.data.wishlistMovies;
    const wishlistDetails: Movie[] = [];

    for (const entry of wishlistEntries) {
        const response = await axios.get<{ data: Movie }>(
            `http://localhost:8080/api/v1/movie/details/${entry.movieId}`,
            { withCredentials: true }
        );

        wishlistDetails.push(response.data.data);
    }

    return wishlistDetails;
};


