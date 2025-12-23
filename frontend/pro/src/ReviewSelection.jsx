import { useLocation, useNavigate } from "react-router-dom";

export default function ReviewSelection() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-6 text-white">
        <div className="bg-white/5 border border-white/10 rounded-3xl px-8 py-10 text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">No selection found</h1>
          <p className="text-gray-300 text-sm md:text-base">
            Start again from the dashboard and build your perfect trip.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-all"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }

  const { destination, hotel, dates, activities } = state;

  const handleSaveAndAddAnother = () => {
    const existingTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    const newTrip = { destination, hotel, dates, activities };
    localStorage.setItem("trips", JSON.stringify([...existingTrips, newTrip]));
    navigate("/dashboard");
  };

  const handleProceedToSummary = () => {
    const existingTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    const newTrip = { destination, hotel, dates, activities };
    localStorage.setItem("trips", JSON.stringify([...existingTrips, newTrip]));
    navigate("/tripsummary");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-6 text-white">
      <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-10 rounded-3xl w-full max-w-4xl space-y-6 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
          Review your selection for {destination}
        </h1>

        <div className="bg-black/60 border border-white/10 p-6 rounded-2xl shadow-lg space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Hotel</h2>
            <p className="text-lg">{hotel.name}</p>
            <p className="text-gray-300 text-sm">₹ {hotel.price} / night</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-3 mb-1">Dates</h2>
            <p className="text-gray-200 text-sm md:text-base">
              Check-in: {dates.checkIn}
            </p>
            <p className="text-gray-200 text-sm md:text-base">
              Check-out: {dates.checkOut}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-3 mb-1">Activities</h2>
            {activities.length === 0 ? (
              <p className="text-gray-300 text-sm">
                No activities selected. You can still enjoy a relaxed trip.
              </p>
            ) : (
              <ul className="list-disc list-inside text-sm md:text-base">
                {activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={handleSaveAndAddAnother}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.03] transition-all"
          >
            Add another city
          </button>
          <button
            onClick={handleProceedToSummary}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.03] transition-all"
          >
            Proceed to summary →
          </button>
        </div>
      </div>
    </div>
  );
}
