import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CalendarPicker from "./components/CalendarPicker";


const toInputDate = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function DestinationPage() {
  const { destination } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [hotels, setHotels] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const cityCoords = {
    Delhi: { lat: 28.6139, lon: 77.209 },
    Goa: { lat: 15.2993, lon: 74.124 },
    Mumbai: { lat: 19.076, lon: 72.8777 },
    Jaipur: { lat: 26.9124, lon: 75.7873 },
    Kolkata: { lat: 22.5726, lon: 88.3639 },
    Chennai: { lat: 13.0827, lon: 80.2707 },
    Manali: { lat: 32.2396, lon: 77.1887 },
    Agra: { lat: 27.1767, lon: 78.0081 },
    Hyderabad: { lat: 17.385, lon: 78.4867 },
    Bangalore: { lat: 12.9716, lon: 77.5946 },
    Pune: { lat: 18.5204, lon: 73.8567 },
    Ahmedabad: { lat: 23.0225, lon: 72.5714 },
    Varanasi: { lat: 25.3176, lon: 82.9739 },
    Chandigarh: { lat: 30.7333, lon: 76.7794 },
    Lucknow: { lat: 26.8467, lon: 80.9462 },
    Shimla: { lat: 31.1048, lon: 77.1734 },
    Udaipur: { lat: 24.5854, lon: 73.7125 },
    Rishikesh: { lat: 30.0869, lon: 78.2676 },
    Amritsar: { lat: 31.634, lon: 74.8723 }
  };

  const fallbackHotels = {
  Delhi: [
    { id: 1, name: "Taj Palace", price: 15000 },
    { id: 2, name: "ITC Maurya", price: 12000 },
    { id: 3, name: "The Leela Palace", price: 18000 },
    { id: 4, name: "The Claridges", price: 9000 }
  ],
  Goa: [
    { id: 5, name: "Taj Exotica", price: 25000 },
    { id: 6, name: "Novotel Goa", price: 10000 },
    { id: 7, name: "W Goa", price: 22000 },
    { id: 8, name: "Alila Diwa", price: 18000 }
  ],
  Mumbai: [
    { id: 9, name: "The Oberoi", price: 25000 },
    { id: 10, name: "Trident", price: 15000 },
    { id: 11, name: "Taj Lands End", price: 20000 },
    { id: 12, name: "JW Marriott Juhu", price: 17000 }
  ],
  Jaipur: [
    { id: 13, name: "Rambagh Palace", price: 35000 },
    { id: 14, name: "ITC Rajputana", price: 15000 },
    { id: 15, name: "Fairmont Jaipur", price: 20000 },
    { id: 16, name: "Le Meridien Jaipur", price: 13000 }
  ],
  Kolkata: [
    { id: 29, name: "The Oberoi Grand", price: 14000 },
    { id: 30, name: "ITC Royal Bengal", price: 16000 },
    { id: 31, name: "JW Marriott Kolkata", price: 13000 },
    { id: 32, name: "Taj Bengal", price: 12000 }
  ],
  Chennai: [
    { id: 33, name: "ITC Grand Chola", price: 17000 },
    { id: 34, name: "Taj Fisherman's Cove", price: 19000 },
    { id: 35, name: "Park Hyatt Chennai", price: 12000 },
    { id: 36, name: "The Leela Palace Chennai", price: 15000 }
  ],
  Manali: [
    { id: 37, name: "Span Resort & Spa", price: 18000 },
    { id: 38, name: "The Himalayan", price: 14000 },
    { id: 39, name: "Manu Allaya", price: 11000 },
    { id: 40, name: "Shivadya Resort", price: 9000 }
  ],
  Agra: [
    { id: 41, name: "The Oberoi Amarvilas", price: 40000 },
    { id: 42, name: "ITC Mughal", price: 11000 },
    { id: 43, name: "Courtyard by Marriott", price: 8500 },
    { id: 44, name: "Tajview Agra", price: 9500 }
  ],
  Hyderabad: [
    { id: 45, name: "Taj Falaknuma Palace", price: 45000 },
    { id: 46, name: "Park Hyatt Hyderabad", price: 14000 },
    { id: 47, name: "ITC Kohenur", price: 16000 },
    { id: 48, name: "The Westin Mindspace", price: 12000 }
  ],
  Bangalore: [
    { id: 49, name: "The Ritz-Carlton", price: 18000 },
    { id: 50, name: "The Leela Palace Bangalore", price: 20000 },
    { id: 51, name: "ITC Gardenia", price: 17000 },
    { id: 52, name: "Taj West End", price: 19000 }
  ],
  Pune: [
    { id: 53, name: "Conrad Pune", price: 13000 },
    { id: 54, name: "JW Marriott Pune", price: 14000 },
    { id: 55, name: "The Ritz-Carlton Pune", price: 16000 },
    { id: 56, name: "Blue Diamond-IHCL", price: 9500 }
  ],
  Ahmedabad: [
    { id: 57, name: "Hyatt Regency Ahmedabad", price: 9000 },
    { id: 58, name: "ITC Narmada", price: 13000 },
    { id: 59, name: "Courtyard by Marriott", price: 8000 },
    { id: 60, name: "Renaissance Ahmedabad", price: 8500 }
  ],
  Varanasi: [
    { id: 61, name: "BrijRama Palace", price: 28000 },
    { id: 62, name: "Taj Ganges Varanasi", price: 14000 },
    { id: 63, name: "Radisson Hotel Varanasi", price: 10000 },
    { id: 64, name: "Ramada Plaza", price: 8500 }
  ],
  Chandigarh: [
    { id: 65, name: "JW Marriott Chandigarh", price: 14000 },
    { id: 66, name: "Hyatt Regency Chandigarh", price: 12000 },
    { id: 67, name: "Taj Chandigarh", price: 11000 },
    { id: 68, name: "The Lalit Chandigarh", price: 10500 }
  ],
  Lucknow: [
    { id: 69, name: "Taj Mahal Lucknow", price: 13000 },
    { id: 70, name: "Renaissance Lucknow", price: 9000 },
    { id: 71, name: "Hyatt Regency Lucknow", price: 8500 },
    { id: 72, name: "Centurion Hotel", price: 7000 }
  ],
  Shimla: [
    { id: 73, name: "Wildflower Hall", price: 35000 },
    { id: 74, name: "The Oberoi Cecil", price: 22000 },
    { id: 75, name: "Radisson Jass Shimla", price: 12000 },
    { id: 76, name: "Clarkes Hotel", price: 10000 }
  ],
  Udaipur: [
    { id: 17, name: "Taj Lake Palace", price: 45000 },
    { id: 18, name: "The Oberoi Udaivilas", price: 50000 },
    { id: 19, name: "Trident Udaipur", price: 18000 },
    { id: 20, name: "Leela Palace Udaipur", price: 42000 }
  ],
  Rishikesh: [
    { id: 21, name: "Aloha on the Ganges", price: 12000 },
    { id: 22, name: "Taj Rishikesh Resort", price: 22000 },
    { id: 23, name: "Divine Resorts", price: 9000 },
    { id: 24, name: "Ganga Kinare", price: 11000 }
  ],
  Amritsar: [
    { id: 25, name: "Hyatt Regency Amritsar", price: 11000 },
    { id: 26, name: "Taj Swarna", price: 14000 },
    { id: 27, name: "Ramada Amritsar", price: 9000 },
    { id: 28, name: "Fairfield by Marriott", price: 8000 }
  ]
};

  const cityActivities = {
    Delhi: ["Red Fort", "India Gate", "Qutub Minar", "Lotus Temple", "Akshardham"],
    Goa: ["Beaches", "Water Sports", "Sunset Cruise", "Nightlife in Baga"],
    Mumbai: ["Marine Drive", "Gateway of India", "Colaba Causeway", "Film City Tour"],
    Jaipur: ["Amber Fort", "Hawa Mahal", "City Palace", "Jal Mahal"],
    Udaipur: ["Lake Pichola Boat Ride", "City Palace", "Bagore Ki Haveli Show"],
    Rishikesh: ["Ganga Aarti", "River Rafting", "Yoga Retreat"],
    Amritsar: ["Golden Temple", "Wagah Border", "Old City Food Walk"]
  };

  // Prefill dates (and when coming back from edit)
  useEffect(() => {
    const state = location.state;

    if (state?.dates) {
      setCheckIn(state.dates.checkIn || "");
      setCheckOut(state.dates.checkOut || "");
      return;
    }

    // Default to today and tomorrow so user always has a starting value
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setCheckIn(toInputDate(today));
    setCheckOut(toInputDate(tomorrow));
  }, [location.state]);

  useEffect(() => {
    async function fetchHotels() {
      setLoading(true);

      const coords = cityCoords[destination];
      if (!coords) {
        setHotels(fallbackHotels[destination] || []);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=7000&lon=${coords.lon}&lat=${coords.lat}&kinds=accommodations&format=json&apikey=${
            import.meta.env.VITE_OPENTRIP_API_KEY
          }`
        );

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          setHotels(fallbackHotels[destination] || []);
        } else {
          const list = data.slice(0, 6).map((h, i) => ({
            id: i,
            name: h.name || "Hotel",
            price: 2000 + i * 500
          }));
          setHotels(list);
        }
      } catch {
        setHotels(fallbackHotels[destination] || []);
      }

      setLoading(false);
    }

    fetchHotels();
  }, [destination]);

  const handleContinue = () => {
    if (!selectedHotel) return alert("Select a hotel");
    if (!checkIn || !checkOut) return alert("Select dates");
    if (checkOut <= checkIn)
      return alert("Check-out must be after check-in");

    navigate("/reviewselection", {
      state: {
        destination,
        hotel: selectedHotel,
        dates: { checkIn, checkOut },
        activities: selectedActivities
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex justify-center items-center px-4 py-8 text-white">
      <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-3xl w-full max-w-5xl space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-1">{destination}</h1>
            <p className="text-gray-300 text-sm md:text-base max-w-xl">
              Choose your stay, pick experiences and lock in your perfect trip.
            </p>
          </div>
        </div>

        {/* Hotels */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Top stays</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {loading && <p className="text-gray-300">Loading hotels...</p>}

            {!loading && hotels.length === 0 && (
              <p className="text-gray-300">No hotels found for this destination.</p>
            )}

            {!loading &&
              hotels.length > 0 &&
              hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() => setSelectedHotel(hotel)}
                  className={`p-4 rounded-2xl cursor-pointer bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-[1.02] ${
                    selectedHotel?.id === hotel.id ? "ring-2 ring-red-500" : ""
                  }`}
                >
                  <h3 className="font-semibold text-lg">{hotel.name}</h3>
                  <p className="text-gray-200 text-sm">₹{hotel.price}/night</p>
                </div>
              ))}
          </div>
        </div>

        {/* Activities */}
        <div>
          <h2 className="text-xl font-semibold mt-4 mb-3">Recommended experiences</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {cityActivities[destination]?.map((act) => (
              <label
                key={act}
                className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center text-sm md:text-base cursor-pointer hover:bg-white/10 transition-all"
              >
                <input
                  type="checkbox"
                  className="mr-2 accent-red-600"
                  checked={selectedActivities.includes(act)}
                  onChange={() =>
                    setSelectedActivities((prev) =>
                      prev.includes(act)
                        ? prev.filter((a) => a !== act)
                        : [...prev, act]
                    )
                  }
                />
                {act}
              </label>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalendarPicker
            label="Check-in"
            value={checkIn}
            minDate={new Date()}
            onChange={(date) => setCheckIn(toInputDate(date))}
          />
          <CalendarPicker
            label="Check-out"
            value={checkOut}
            minDate={checkIn ? new Date(checkIn) : new Date()}
            onChange={(date) => setCheckOut(toInputDate(date))}
          />
      </div>

        <button
          onClick={handleContinue}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-all"
        >
          Continue to review →
        </button>
      </div>
    </div>
  );
}
