import { createFileRoute } from '@tanstack/react-router'
import WebSeries from "../pages/WebSeries"

export const Route = createFileRoute('/webseries')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <WebSeries />
  )
}
