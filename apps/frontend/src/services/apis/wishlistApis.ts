import { api } from "../axiosInstance";
import type { Movie , WishlistEntry } from "@share/types"

export const addToWishlist = async (movieId: string) => {
    const response = await api.post(`/wishlist/add/${movieId}`, {});

    return response.data;
};


export const getWishlistMovies = async () => {
    const wishlistResponse = await api.get<{
        wishlistMovies: WishlistEntry[];
    }>("/wishlist/");

    const wishlistEntries = wishlistResponse.data.wishlistMovies;
    const wishlistDetails: Movie[] = [];

    for (const entry of wishlistEntries) {
        const response = await api.get<{ data: Movie }>(
            `/movie/details/${entry.movieId}`
        );

        wishlistDetails.push(response.data.data);
    }

    return wishlistDetails;
};