export default function Hero() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center text-white">

            <h1 className="max-w-3xl text-5xl font-extrabold">
                Unlimited movies, shows, and more
            </h1>

            <p className="mt-5 text-xl font-semibold">
                Starts at ₹149. Cancel at any time.
            </p>

            <p className="mt-8 text-base">
                Ready to watch? Enter your email to create or restart your membership.
            </p>

            <button className="mt-5 rounded bg-red-600 px-8 py-3 text-xl font-bold hover:bg-red-700">
                Get Started
            </button>

        </div>
    );
}