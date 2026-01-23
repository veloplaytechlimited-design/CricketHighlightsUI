import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // MVP hardcoded auth
    if (
      email === "admin@matchclips.com" &&
      password === "admin123"
    ) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card w-[380px] p-8 rounded-xl shadow-lg">
        {/* Logo / Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          🏏 VeloPlay
        </h1>
        <p className="text-center text-muted mb-6">
          Generate cricket highlights automatically
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-bg border border-gray-700 focus:outline-none focus:border-accent"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-bg border border-gray-700 focus:outline-none focus:border-accent"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-black font-semibold py-3 rounded hover:opacity-90 transition"
          >
            Login →
          </button>
        </form>

        {/* Hint for MVP */}
        <p className="text-xs text-muted text-center mt-4">
          MVP login: admin@matchclips.com / admin123
        </p>
      </div>
    </div>
  );
}
