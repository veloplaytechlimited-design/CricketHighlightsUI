import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  {
    title: "End to end AI Powered highlight generation",
    image:
      "https://images.unsplash.com/photo-1581091870627-3c1f5a90d1b4",
  },
  {
    title:
      "Creation and publishing Content based on pre-set rules & parameters",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  {
    title:
      "Drive Engagement via Social media Publishing",
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
  },
];

export default function Login() {
  const navigate = useNavigate();

  // ===== LOGIN STATE =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ===== UI STATE =====
  const [activeFeature, setActiveFeature] = useState(0);

  function handleLogin(e) {
    e.preventDefault();

    //  hardcoded authentication
    if (
      email === "admin@matchclips.com" &&
      password === "admin123"
    ) {
      setError("");
      navigate("/dashboard"); //  redirect
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT SECTION – 70% */}
      <div className="w-[70%] p-16 flex flex-col justify-center gap-10">
        {/* Brand */}
        <div>
          <h1 className="text-5xl font-bold mb-4">VeloPlay</h1>
          <p className="text-muted max-w-xl leading-relaxed">
            VeloPlay's cloud solution helps Video Content Creators and
            Sports Enthusiasts create byte sized video highlights using AI.
            Also, enable the users drive greater engagement on social media
            platforms.
          </p>
        </div>

        {/* Features + Image */}
        <div className="flex gap-10 items-start">
          {/* Feature List */}
          <ul className="space-y-6 w-[55%]">
            {FEATURES.map((feature, index) => (
              <li
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                className={`cursor-pointer transition-colors duration-200 ${
                  activeFeature === index
                    ? "text-accent"
                    : "text-gray-300"
                }`}
              >
                <span className="text-lg font-medium">
                  {feature.title}
                </span>
              </li>
            ))}
          </ul>

          {/* Image Panel */}
          <div className="w-[45%] h-[260px] rounded-xl overflow-hidden bg-card">
            <img
              src={FEATURES[activeFeature].image}
              alt="Feature visual"
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION – 30% */}
      <div className="w-[30%] flex items-center justify-center bg-card">
        <div className="w-[360px] p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login
          </h2>

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

          {/*  hint */}
          <p className="text-xs text-muted text-center mt-4">
            admin@matchclips.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
