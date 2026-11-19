import { Link } from "@tanstack/react-router";

export default function Navbar() {

  return (
    <nav className="absolute top-0 left-0 z-50 w-full px-6 py-5 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <img
          src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAT4DsJqpLaLn4NdWj0hMqiS44NBBHsef6fJbMCXfInwFPyWRZWORRKIX6OoMypwFbV-skx1kkO0bw5qyPw4TGYECuHYwI_zw-n7CzjzEILCnaUNLQfmgkh-p1HzjExVEw9zDBrZd_di2.svg"
          alt="Netflix"
          className="w-28 md:w-40"
        />

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link to = "/auth" className="rounded bg-[#e50914] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c11119]">
            Sign In
          </Link>

        </div>
      </div>
    </nav>
  );
};


