import { createFileRoute } from '@tanstack/react-router'
import MovieDetails from "../pages/MovieDetails"

export const Route = createFileRoute('/movie/$movieId')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MovieDetails />
  )
}
