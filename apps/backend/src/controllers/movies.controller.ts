import type { Context } from "hono";
import { api } from "../utils/axiosInstance";
import type { MovieResponse, MovieDetailsData, TVSeries, } from "@share/types";

export const discover = async (c: Context) => {
    try {
        const movieData = await api.get<MovieResponse>("/discover/movie", {
            params: {
                include_adult: false,
                include_video: false,
                language: "en-US",
                page: 1,
                sort_by: "popularity.desc",
            },
        });

        return c.json({
            data: movieData.data,
        }, 200);

    } catch (e) {
        return c.json({
            message: "couldnt fetch data from tmdb",
            error: e,
        }, 500);
    }
};


export const getMovieById = async (c: Context) => {
    try {
        const movieId = c.req.param("movieId");

        const response = await api.get<MovieDetailsData>(`/movie/${movieId}`, {
            params: {
                language: "en-US",
                append_to_response: "credits,videos,similar,recommendations",
                include_video_language: "en,null",
            },
        });

        return c.json({
            success: true,
            data: response.data,
        }, 200);

    } catch (e) {
        return c.json({
            message: "couldnt fetch movie data",
            error: e,
        }, 500);
    }
};


export const getTrendingMovies = async (c: Context) => {
    try {
        const response = await api.get<MovieResponse>("/trending/movie/day", {
            params: {
                language: "en-US",
            },
        });

        return c.json({
            success: true,
            data: response.data,
        }, 200);

    } catch (e) {
        return c.json({
            message: "Couldn't fetch trending movies from TMDB",
            error:  "Unknown error",
        }, 500);
    }
};


export const getOnlyMovies = async (c: Context) => {
    try {
        const page = Math.max(1, Number(c.req.query("page")) || 1);

        const response = await api.get<MovieResponse>("/discover/movie", {
            params: {
                include_adult: false,
                include_video: false,
                language: "en-US",
                page,
                sort_by: "popularity.desc",
            },
        });

        return c.json({
            success: true,
            data: response.data,
        }, 200);

    } catch (e) {
        return c.json({
            message: "Couldn't fetch movies from TMDB",
            error: "Unknown error",
        }, 500);
    }
};


export const WebSeries = async (c: Context) => {
    try {
        const page = Math.max(1, Number(c.req.query("page")) || 1);

        const response = await api.get<{
            page: number;
            results: TVSeries[];
            total_pages: number;
            total_results: number;
        }>("/discover/tv", {
            params: {
                language: "en-US",
                page,
                sort_by: "popularity.desc",
            },
        });

        return c.json({
            success: true,
            data: response.data,
        }, 200);

    } catch (e) {
        return c.json({
            message: "Couldn't fetch TV series from TMDB",
            error:  e,
        }, 500);
    }
};