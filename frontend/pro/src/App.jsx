import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import DestinationPage from "./DestinationPage";
import ReviewSelection from "./ReviewSelection";
import TripSummary from "./TripSummary";
import ThankYou from "./ThankYou";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import MapPage from "./MapPage";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Travel Flow */}
        <Route path="/destination/:destination" element={<DestinationPage />} />
        <Route path="/reviewselection" element={<ReviewSelection />} />
        <Route path="/tripsummary" element={<TripSummary />} />

        <Route path="/thankyou" element={<ThankYou />} />

        {/* About & Contact */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/map/:destination" element={<MapPage />} />

      </Routes>
    </BrowserRouter>
  );
}
