import { Axios } from "../axiosInstance";
import type { MovieResponse, MovieDetailsData } from "@share/types";

export const getAllMovies = async ({ pageParam }: { pageParam: number }) => {
    const response = await Axios.get("/movie/movies", {
        params: { page: pageParam },
    });

    return response.data.data;
};


export const getDiscoverMovies = async () => {
    const response = await Axios.get<{ data: MovieResponse }>("/movie/discover");

    return response.data.data.results;
};


export const getTVSeries = async ({ pageParam }: { pageParam: number }) => {
    const response = await Axios.get("/movie/series", {
        params: { page: pageParam },
    });

    return response.data.data;
};


export const getTrendingMovies = async () => {
    const response = await Axios.get<{ data: MovieResponse }>("/movie/trending");

    return response.data.data.results;
};



export const getMovieDetails = async (movieId: string) => {
    const response = await Axios.get<{ data: MovieDetailsData }>(
        `/movie/details/${movieId}`
    );
    return response.data.data;
};

