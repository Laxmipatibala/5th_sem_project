import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Banner from "./components/Banner";
import SearchDestination from "./components/SearchDestination";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-black text-white">

      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-4 bg-gradient-to-b from-black/90 to-black shadow-lg border-b border-white/10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-red-600 tracking-tight">
          TravelFlix
        </h1>

        <div className="flex space-x-6 text-sm md:text-base text-gray-300">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/about")}
            className="hover:text-white transition-colors"
          >
            About
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="hover:text-white transition-colors"
          >
            Contact
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm md:text-base font-semibold transition-all hover:scale-105"
        >
          Logout
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow px-4 md:px-10 py-6 space-y-6 animate-fade-in">

        <Banner />

        <section className="max-w-3xl text-left space-y-2 px-1 md:px-0">
          <h2 className="text-2xl md:text-3xl font-bold">
            Unlimited trips, one smart planner.
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-xl">
            Search destinations, compare stays, pick activities and build your perfect itinerary in minutes.
          </p>
        </section>

        <SearchDestination />

        {/* TEAM SECTION */}
        <h3 className="mt-10 mb-3 text-xl md:text-2xl font-semibold">
          Meet the team behind the magic
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Founder */}
          <div
            onClick={() => setActiveCard(activeCard === 1 ? null : 1)}
            className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 cursor-pointer
              transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
              ${activeCard === 1 ? "ring-2 ring-red-500 scale-105" : ""}`}
          >
            <h2 className="text-2xl font-bold mb-2">Founder</h2>
            <p className="text-xl font-semibold">Laxmi Pati Bala</p>
            <p className="mt-2 text-sm text-gray-300">
              Visionary behind the Travel Planner platform.
            </p>
          </div>

          {/* Co-Founder */}
          <div
            onClick={() => setActiveCard(activeCard === 2 ? null : 2)}
            className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 cursor-pointer
              transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
              ${activeCard === 2 ? "ring-2 ring-red-500 scale-105" : ""}`}
          >
            <h2 className="text-2xl font-bold mb-2">Co-Founder</h2>
            <p className="text-xl font-semibold">Chandra Prakash</p>
            <p className="mt-2 text-sm text-gray-300">
              Manages operations and user experience.
            </p>
          </div>

          {/* CEO */}
          <div
            onClick={() => setActiveCard(activeCard === 3 ? null : 3)}
            className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 cursor-pointer
              transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
              ${activeCard === 3 ? "ring-2 ring-red-500 scale-105" : ""}`}
          >
            <h2 className="text-2xl font-bold mb-2">CEO</h2>
            <p className="text-xl font-semibold">Riya Kapoor</p>
            <p className="mt-2 text-sm text-gray-300">
              Leads with innovation & excellence.
            </p>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-gray-500 py-4 text-center text-xs md:text-sm border-t border-white/10">
        © {new Date().getFullYear()} TravelFlix. All rights reserved.
      </footer>
    </div>
  );
}
