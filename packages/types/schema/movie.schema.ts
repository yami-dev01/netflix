
import { z } from "zod";

// Movie
export const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    vote_average: z.number(),
    release_date: z.string(),
    genre_ids: z.array(z.number()),
});

// Movie Response
export const MovieResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number(),
});

// Wishlist
export type WishlistEntry = {
    id: number;
    movieId: number;
    userId: number;
};

// Movie Details - Nested Schemas
export const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const VideoSchema = z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    site: z.string(),
    type: z.string(),
    official: z.boolean(),
});

export const VideosSchema = z.object({
    results: z.array(VideoSchema),
});

export const CastMemberSchema = z.object({
    id: z.number(),
    name: z.string(),
    character: z.string(),
    profile_path: z.string().nullable(),
});

export const CreditsSchema = z.object({
    cast: z.array(CastMemberSchema),
});

// Movie Details
export const MovieDetailsSchema = z.object({
    id: z.number(),
    title: z.string(),
    overview: z.string(),
    backdrop_path: z.string().nullable(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    vote_average: z.number(),
    runtime: z.number(),
    genres: z.array(GenreSchema),
    videos: VideosSchema.optional(),
    credits: CreditsSchema.optional(),
});

// TV Series
export const TVSeriesSchema = z.object({
    id: z.number(),
    name: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    vote_average: z.number(),
    first_air_date: z.string(),
});

// Inferred Types
export type Movie = z.infer<typeof MovieSchema>;
export type MovieResponse = z.infer<typeof MovieResponseSchema>;
export type MovieDetailsData = z.infer<typeof MovieDetailsSchema>;
export type TVSeries = z.infer<typeof TVSeriesSchema>;
export type Genre = z.infer<typeof GenreSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type CastMember = z.infer<typeof CastMemberSchema>;
export type Credits = z.infer<typeof CreditsSchema>;
