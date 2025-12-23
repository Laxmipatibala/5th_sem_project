import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchDestination() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const cities = [
    "Delhi",
    "Goa",
    "Mumbai",
    "Jaipur",
    "Kolkata",
    "Chennai",
    "Manali",
    "Agra",
    "Hyderabad",
    "Bangalore",
    "Pune",
    "Varanasi",
    "Udaipur",
    "Shimla",
    "Rishikesh",
    "Amritsar",
  ];

  // 🔍 Suggestion Logic
  const handleInput = (value) => {
    setQuery(value);

    if (value.trim() === "") {
      setFiltered([]);
      return;
    }

    const matches = cities.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(matches);
  };

  // When suggestion clicked
  const selectCity = (city) => {
    setQuery(city);
    setFiltered([]);
    navigate(`/map/${city}`);
  };

  // Search Button Click
  const handleSearch = () => {
    if (cities.includes(query)) {
      navigate(`/map/${query}`);
    } else {
      alert("Destination not found. Select from suggestions.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 relative w-full max-w-2xl mx-auto animate-slide-down">

      {/* Search Box */}
      <div className="flex w-full rounded-xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur">
        <input
          type="text"
          placeholder="Search your next destination..."
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          className="flex-grow px-4 py-3 bg-black/70 text-white placeholder-gray-400 outline-none text-sm md:text-base"
        />

        <button
          onClick={handleSearch}
          className="px-6 md:px-8 py-3 bg-red-600 text-white font-semibold text-sm md:text-base hover:bg-red-700 transition-all hover:scale-[1.02]"
        >
          Search
        </button>
      </div>

      {/* Suggestions Box */}
      {filtered.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-black/90 text-white shadow-2xl rounded-xl border border-white/10 z-50 max-h-64 overflow-y-auto">
          {filtered.map((city, index) => (
            <li
              key={index}
              onClick={() => selectCity(city)}
              className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm md:text-base"
            >
              {city}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
