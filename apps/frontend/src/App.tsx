import { BrowserRouter , Routes , Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Authpage from "./pages/Authpage"
import Discover from "./pages/Discover"
import MovieDetails from "./pages/MovieDetails"
import Wishlist from "./pages/Wishlist"
import Movies from "./pages/Movies"
import WebSeries from "./pages/WebSeries"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Homepage/>}></Route>
        <Route path="/auth" element = {<Authpage/>}></Route>
        <Route path="/discover" element = {<Discover/>}></Route>
        <Route path="/movie/:movieId" element={<MovieDetails />}/>
        <Route path="/wishlist" element = {<Wishlist />} />
        <Route path="/movies" element = {<Movies />} />
        <Route path="/webseries" element = {<WebSeries />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
