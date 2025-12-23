import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Thank you!</h1>
      <p className="text-lg md:text-xl mb-6 text-center text-gray-200 max-w-xl">
        Your itinerary has been saved successfully. Get ready for a cinematic journey.
      </p>

      <Link
        to="/dashboard"
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.05] transition-all"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
