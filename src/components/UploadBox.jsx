import { useState } from "react";
import { createMatch } from "../api/matches";

export default function UploadBox({ onJobCreated }) {
  const [mode, setMode] = useState("upload");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleProceed() {
    setError("");

    if (mode === "upload" && !file) {
      setError("Please select a video file");
      return;
    }

    if (mode === "live" && !url.trim()) {
      setError("Please enter a live stream URL");
      return;
    }

    setLoading(true);

    try {
      const payload =
        mode === "upload"
          ? { type: "upload", fileName: file.name }
          : { type: "live", url };

      const response = await createMatch(payload);

      // Inform Dashboard that job is created
      onJobCreated(response);
    } catch (err) {
      setError("Failed to start processing. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-card rounded-xl p-6 space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-4">
        <button
          onClick={() => setMode("upload")}
          className={`px-4 py-2 rounded ${
            mode === "upload"
              ? "bg-accent text-black"
              : "bg-bg text-muted"
          }`}
        >
          Upload Video
        </button>

        <button
          onClick={() => setMode("live")}
          className={`px-4 py-2 rounded ${
            mode === "live"
              ? "bg-accent text-black"
              : "bg-bg text-muted"
          }`}
        >
          Live URL
        </button>
      </div>

      {/* Upload Mode */}
      {mode === "upload" && (
        <div className="border border-dashed border-gray-600 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="video/*"
            id="video-upload"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <label
            htmlFor="video-upload"
            className="cursor-pointer block"
          >
            <p className="text-lg">
              {file ? file.name : "Click to upload a video"}
            </p>
            <p className="text-sm text-muted mt-2">
              MP4, MOV supported
            </p>
          </label>
        </div>
      )}

      {/* Live URL Mode */}
      {mode === "live" && (
        <input
          type="text"
          placeholder="Paste live match URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded bg-bg border border-gray-700 focus:outline-none focus:border-accent"
        />
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Proceed */}
      <div className="flex justify-end">
        <button
          onClick={handleProceed}
          disabled={loading}
          className="bg-accent text-black px-6 py-2 rounded font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Starting..." : "Proceed →"}
        </button>
      </div>
    </div>
  );
}
