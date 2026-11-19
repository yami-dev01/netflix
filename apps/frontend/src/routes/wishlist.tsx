import { createFileRoute } from '@tanstack/react-router'
import Wishlist from "../pages/Wishlist"

export const Route = createFileRoute('/wishlist')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Wishlist />
  )
}
