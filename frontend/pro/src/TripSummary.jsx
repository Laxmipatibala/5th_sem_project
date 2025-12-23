import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function TripSummary() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    setTrips(storedTrips);
  }, []);

  const handleEdit = (index) => {
    const trip = trips[index];
    navigate(`/destination/${trip.destination}`, { state: trip });
  };

  const handleConfirm = () => {
    // Clear localStorage after confirmation
    localStorage.removeItem("trips");
    navigate("/thankyou");
  };

  const handleMarkVisited = (index) => {
    const updatedTrips = trips.map((trip, i) =>
      i === index ? { ...trip, visited: true } : trip
    );
    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  const handleDeleteTrip = (index) => {
    const trip = trips[index];
    const ok = window.confirm(
      `Are you sure you want to delete your trip to ${trip.destination}?`
    );
    if (!ok) return;

    const remaining = trips.filter((_, i) => i !== index);
    setTrips(remaining);
    localStorage.setItem("trips", JSON.stringify(remaining));
  };

  const handleClearAll = () => {
    localStorage.removeItem("trips");
    setTrips([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-6 text-white">
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl w-full max-w-6xl space-y-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2">
          Your Trip Summary
        </h1>

        {trips.length === 0 ? (
          <p className="text-gray-300 text-center text-lg">
            No trips selected yet. Go back and add a destination.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
            {trips.map((trip, index) => (
              <div
                key={index}
                className={`relative bg-black/70 border border-white/10 p-6 rounded-2xl shadow-lg transform transition-all hover:scale-[1.03] ${
                  trip.visited ? "ring-2 ring-green-400" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteTrip(index)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-400 hover:scale-110 transition-transform text-lg leading-none"
                  aria-label="Delete trip"
                >
                  ×
                </button>
                <h2 className="text-2xl font-bold mb-2">
                  {trip.destination}
                </h2>
                <p className="text-gray-200 mb-1 text-sm md:text-base">
                  <strong>Hotel:</strong> {trip.hotel.name} - ₹{trip.hotel.price}/night
                </p>
                <p className="text-gray-200 mb-1 text-sm md:text-base">
                  <strong>Dates:</strong> {trip.dates.checkIn} to {trip.dates.checkOut}
                </p>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                  <strong>Activities:</strong>{" "}
                  {trip.activities.length ? trip.activities.join(", ") : "None selected"}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs md:text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleMarkVisited(index)}
                    className={`px-4 py-2 rounded-lg text-xs md:text-sm ${
                      trip.visited
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-600 hover:bg-gray-500"
                    } text-white`}
                  >
                    {trip.visited ? "Visited" : "Mark visited"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4 border-t border-white/10 mt-4">
          <button
            onClick={handleConfirm}
            disabled={trips.length === 0}
            className={`px-8 md:px-10 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.05] transition-all ${
              trips.length === 0
                ? "bg-red-400/40 text-white/60 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Confirm all bookings →
          </button>
          <button
            onClick={handleClearAll}
            disabled={trips.length === 0}
            className={`px-8 md:px-10 py-3 rounded-xl font-semibold border text-sm md:text-base transition-all ${
              trips.length === 0
                ? "border-white/20 text-white/40 cursor-not-allowed"
                : "border-white/40 text-white hover:bg-white/10"
            }`}
          >
            Clear all trips
          </button>
        </div>
      </div>
    </div>
  );
}
