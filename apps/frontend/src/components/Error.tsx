import { useNavigate } from "@tanstack/react-router"

export default function Error() {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#141414] text-white">
            <h1 className="text-3xl font-bold">
                An Error Occured!
            </h1>
            <button className="mt-5 rounded bg-red-600 px-5 py-2" onClick={() => navigate({
                to : "/discover"
            })}>
                Go Home
            </button>
        </div>
    )
}