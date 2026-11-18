import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function Homepage(){
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("/the_netflix_login_background_canada_2024__by_logofeveryt_dh0w8qv-fullview.jpg")`}}>
            <div className="absolute inset-0 bg-black/60">
                <div className="flex flex-col p-8">
                    <Navbar />
                    <Hero />
                </div>
            </div>
        </div>
    )
}