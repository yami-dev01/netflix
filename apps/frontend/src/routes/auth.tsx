import { createFileRoute } from '@tanstack/react-router'
import Authpage from "../pages/Authpage"

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Authpage />
  )
}
