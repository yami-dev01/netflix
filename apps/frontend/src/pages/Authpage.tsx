import { useState } from "react";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

export default function Authpage() {

    const navigate = useNavigate();

    const [hasAccount, setHasAccount] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const endpoint = hasAccount ? "http://localhost:8080/api/v1/user/signin" : "http://localhost:8080/api/v1/user/signup";

            const response = await axios.post(
                endpoint,
                {
                    userName,
                    password
                },
                { withCredentials: true }
            );

            navigate({
                to : "/discover"
            });

        }catch(error) {
            error
        }
    };

    return (
        <div
            className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url("/the_netflix_login_background_canada_2024__by_logofeveryt_dh0w8qv-fullview.jpg")`
            }}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Auth Card */}
            <div className="relative z-10 w-full max-w-md rounded-lg bg-black/80 p-10 text-white">

                <h1 className="mb-8 text-3xl font-bold">
                    {hasAccount ? "Sign In" : "Sign Up"}
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >
                    {/* Username */}
                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="rounded border border-gray-500 bg-[#333] px-4 py-4 outline-none focus:border-white"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="rounded border border-gray-500 bg-[#333] px-4 py-4 outline-none focus:border-white"
                    />

                    {/* Submit */}
                    <button
                        type="submit"
                        className="mt-3 rounded bg-[#e50914] py-3 font-bold transition hover:bg-[#c11119]"
                    >
                        {hasAccount ? "Sign In" : "Sign Up"}
                    </button>
                </form>

                {/* Toggle Login / Signup */}
                <p className="mt-8 text-gray-400">
                    {hasAccount
                        ? "New to Netflix?"
                        : "Already have an account?"
                    }

                    <button
                        type="button"
                        onClick={() => setHasAccount(!hasAccount)}
                        className="ml-2 font-semibold text-white hover:underline"
                    >
                        {hasAccount ? "Sign up now." : "Sign in now."}
                    </button>
                </p>

            </div>
        </div>
    );
}
