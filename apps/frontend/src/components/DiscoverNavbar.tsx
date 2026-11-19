import { Link } from "@tanstack/react-router"
import { Search, ChevronDown } from "lucide-react";

export default function DiscoverNavbar() {
    return (
        <nav className="absolute top-0 z-50 flex h-20 w-full items-center justify-between bg-linear-to-b from-black/90 to-transparent px-6 md:px-12">

            {/* Left Section */}
            <div className="flex items-center gap-8">

                {/* Netflix Logo */}
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    alt="Netflix"
                    className="w-24 cursor-pointer"
                />

                {/* Navigation Links */}
                <div className="hidden items-center gap-6 text-sm md:flex">
                    <Link to="/discover" className="font-bold text-white">Home </Link>
                    <Link to="/movies" className="text-gray-300 transition hover:text-white">Movies </Link>
                    <Link to="/webseries" className="text-gray-300 transition hover:text-white">TV Shows </Link>
                    <Link to="/wishlist" className="text-gray-300 transition hover:text-white">wishlist </Link>

                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">

                {/* Search */}
                <button className="text-white transition hover:text-gray-300">
                    <Search size={23} />
                </button>

                {/* Avatar */}
                <button className="flex cursor-pointer items-center gap-2">
                    <img
                        src="public/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                        alt="Profile"
                        className="h-8 w-8 rounded object-cover"
                    />

                    <ChevronDown
                        size={16}
                        className="text-white"
                    />
                </button>

            </div>

        </nav>
    );
}
