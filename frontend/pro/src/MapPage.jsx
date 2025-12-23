import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";

// Haversine Formula
function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;

  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapPage() {
  const { destination } = useParams();
  const navigate = useNavigate();

  const [origin, setOrigin] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);

  const cityCoords = {
    Delhi: [28.6139, 77.209],
    Goa: [15.2993, 74.124],
    Mumbai: [19.076, 72.8777],
    Jaipur: [26.9124, 75.7873],
    Kolkata: [22.5726, 88.3639],
    Chennai: [13.0827, 80.2707],
    Manali: [32.2396, 77.1887],
    Agra: [27.1767, 78.0081],
    Hyderabad: [17.385, 78.4867],
    Bangalore: [12.9716, 77.5946],
    Pune: [18.5204, 73.8567],
    Ahmedabad: [23.0225, 72.5714],
    Varanasi: [25.3176, 82.9739],
    Chandigarh: [30.7333, 76.7794],
    Lucknow: [26.8467, 80.9462],
    Shimla: [31.1048, 77.1734],
    Udaipur: [24.5854, 73.7125],
    Rishikesh: [30.0869, 78.2676],
    Amritsar: [31.634, 74.8723],
  };

  const dest = cityCoords[destination];

  // STEP 1: Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      () => {
        setOrigin([28.6139, 77.2090]); // fallback
        setLoading(false);
      }
    );
  }, []);

  // STEP 2: Fetch route + calculate distance/duration
  useEffect(() => {
    if (!origin || !dest) return;

    async function getRoute() {
      const url = `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${dest[1]},${dest[0]}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.routes) return;

      const coords = data.routes[0].geometry.coordinates.map((p) => [
        p[1],
        p[0],
      ]);
      setRoute(coords);

      // Calculate accurate distance
      const km = haversineDistance(origin[0], origin[1], dest[0], dest[1]);
      setDistance(km.toFixed(2));

      // Travel mode durations
      setDuration({
        car: (km / 70).toFixed(1),
        bus: (km / 60).toFixed(1),
        train: (km / 100).toFixed(1),
        plane: (km / 800).toFixed(2),
      });
    }

    getRoute();
  }, [origin, destination]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <p className="text-lg">📍 Getting your location...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-1">
              Route to {destination}
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Live route preview with approximate travel time by different modes.
            </p>
          </div>
          {distance && duration && (
            <div className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-sm md:text-base flex flex-wrap gap-x-6 gap-y-1">
              <p>
                <span className="font-semibold text-gray-100">Distance:</span>{" "}
                {distance} km
              </p>
              <p>
                <span className="font-semibold text-gray-100">Car:</span>{" "}
                {duration.car} h
              </p>
              <p>
                <span className="font-semibold text-gray-100">Train:</span>{" "}
                {duration.train} h
              </p>
              <p>
                <span className="font-semibold text-gray-100">Flight:</span>{" "}
                {duration.plane} h
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/60">
            <MapContainer
              center={origin}
              zoom={6}
              style={{ height: "480px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={origin}>
                <Popup>You are here</Popup>
              </Marker>

              {dest && (
                <Marker position={dest}>
                  <Popup>{destination}</Popup>
                </Marker>
              )}

              {route.length > 0 && <Polyline positions={route} color="red" />}
            </MapContainer>
          </div>

          <div className="space-y-4 bg-white/5 border border-white/10 rounded-3xl p-4 md:p-5">
            <h2 className="text-xl font-semibold">Travel modes</h2>
            {distance && duration ? (
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex justify-between">
                  <span>🚗 Car</span>
                  <span className="font-semibold">{duration.car} hours</span>
                </li>
                <li className="flex justify-between">
                  <span>🚌 Bus</span>
                  <span className="font-semibold">{duration.bus} hours</span>
                </li>
                <li className="flex justify-between">
                  <span>🚆 Train</span>
                  <span className="font-semibold">{duration.train} hours</span>
                </li>
                <li className="flex justify-between">
                  <span>✈️ Plane</span>
                  <span className="font-semibold">{duration.plane} hours</span>
                </li>
              </ul>
            ) : (
              <p className="text-gray-300 text-sm">
                Calculating distance and travel times...
              </p>
            )}

            <button
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-all"
              onClick={() => navigate(`/destination/${destination}`)}
            >
              Continue to stays & activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
