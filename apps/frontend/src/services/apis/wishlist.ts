import { Axios } from "../axiosInstance";
import type { Movie , WishlistEntry } from "@share/types"

export const addToWishlist = async (movieId: string) => {
    const response = await Axios.post(`/wishlist/add/${movieId}`, {});

    return response.data;
};


export const getWishlistMovies = async () => {
    const wishlistResponse = await Axios.get<{
        wishlistMovies: WishlistEntry[];
    }>("/wishlist/");

    const wishlistEntries = wishlistResponse.data.wishlistMovies;
    const wishlistDetails: Movie[] = [];

    for (const entry of wishlistEntries) {
        const response = await Axios.get<{ data: Movie }>(
            `/movie/details/${entry.movieId}`
        );

        wishlistDetails.push(response.data.data);
    }

    return wishlistDetails;
};