
import axios from "axios";
import type { Context } from "hono";


export const discover = async (c: Context) => {
    try {
        const TMDB_TOKEN = process.env.TMDB_TOKEN;
        const options = {
            method: "GET",
            url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${TMDB_TOKEN}`
            }
        };

        const movieData = await axios.request(options);
        return c.json({
            data: movieData.data
        }, 200);

    } catch (e) {
        console.log(e);
        return c.json({
            data: "couldnt fetch data from tmdb"
        }, 500);
    }
};


export const getMovieById = async (c: Context) => {
    try {
        const movieId = c.req.param("movieId");
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}`,
            {
                params: {
                    language: "en-US",
                    append_to_response: "credits,videos,similar,recommendations",
                    include_video_language: "en,null"
                },
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
                }
            }
        );

        return c.json({
            success: true,
            data: response.data
        }, 200);

    } catch (e) {
        console.log(e);
        return c.json({
            message: "couldnt fetch movie data"
        }, 500);
    }
};


export const getTrendingMovies = async (c: Context) => {
    try {
        const response = await axios.get(
            "https://api.themoviedb.org/3/trending/movie/day",
            {
                params: {
                    language: "en-US"
                },
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
                }
            }
        );

        return c.json({
            success: true,
            data: response.data
        }, 200);

    } catch (e) {
        console.log(e);
        return c.json({
            success: false,
            message: "Couldn't fetch trending movies from TMDB"
        }, 500);
    }
};


export const getOnlyMovies = async(c: Context) => {
    try {
        const page = Math.max(1, Number(c.req.query("page")) || 1);

        const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
                params: {
                    include_adult: false,
                    include_video: false,
                    language: "en-US",
                    page,
                    sort_by: "popularity.desc"
                },
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
                }
            }
        );

        return c.json({
            success: true,
            data: response.data
        }, 200);

    } catch (e) {
        console.log(e);
        return c.json({
            success: false,
            message: "Couldn't fetch movies from TMDB"
        }, 500);
    }
};



export const WebSeries = async (c: Context) => {
    try {
        const page = Number(c.req.query("page")) || 1;

        const response = await axios.get(
            "https://api.themoviedb.org/3/discover/tv",
            {
                params: {
                    language: "en-US",
                    page,
                    sort_by: "popularity.desc"
                },
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
                }
            }
        );

        return c.json({
            success: true,
            data: response.data
        }, 200);

    } catch (e) {
        console.log(e);

        return c.json({
            success: false,
            message: "Couldn't fetch TV series from TMDB"
        }, 500);
    }
};

