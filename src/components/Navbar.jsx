import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
  }

  return (
    <header className="bg-card border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          🏏 VeloPlay
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm text-muted hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
