import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed. Please try again.");
        return;
      }

      navigate("/");
    } catch {
      setError("Could not connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/10">
        <h1 className="text-3xl font-extrabold text-white text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-white/80 mb-6">
          Join TravelFlix and start building cinematic journeys.
        </p>

        {error && (
          <div className="mb-4 bg-red-500/80 text-white text-sm px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <label className="block mb-3 text-white text-sm font-semibold">
          Name
          <input
            type="text"
            placeholder="Your name"
            className="mt-1 w-full p-2 rounded-lg border border-white/40 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block mb-3 text-white text-sm font-semibold">
          Email
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full p-2 rounded-lg border border-white/40 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block mb-3 text-white text-sm font-semibold">
          Password
          <input
            type="password"
            placeholder="Minimum 6 characters"
            className="mt-1 w-full p-2 rounded-lg border border-white/40 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="block mb-4 text-white text-sm font-semibold">
          Confirm Password
          <input
            type="password"
            placeholder="Re-enter password"
            className="mt-1 w-full p-2 rounded-lg border border-white/40 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <button
          onClick={submit}
          disabled={loading}
          className={`mt-2 w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all ${
            loading
              ? "bg-red-400/60 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 hover:scale-[1.02]"
          }`}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <p className="text-sm mt-4 text-center text-white/90">
          Already have an account?{" "}
          <Link to="/" className="font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
