import { useEffect, useState } from "react";
import { getMatchStatus } from "../api/matches";

export default function ProcessingStatus({
  matchId,
  onCompleted,
  onFailed,
}) {
  const [status, setStatus] = useState("PROCESSING");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!matchId) return;

    // Polling every 5 seconds
    const interval = setInterval(async () => {
      try {
        const data = await getMatchStatus(matchId);

        setStatus(data.status);

        if (data.progress !== undefined) {
          setProgress(data.progress);
        }

        if (data.currentStep) {
          setCurrentStep(data.currentStep);
        }

        if (data.status === "COMPLETED") {
          clearInterval(interval);
          onCompleted();
        }

        if (data.status === "FAILED") {
          clearInterval(interval);
          setError(data.error || "Processing failed");
          onFailed(data.error);
        }
      } catch (err) {
        clearInterval(interval);
        setError("Unable to fetch processing status");
        onFailed("API_ERROR");
      }
    }, 5000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [matchId, onCompleted, onFailed]);

  return (
    <div className="bg-card rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-semibold">
        Processing Match
      </h3>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      {!error && (
        <>
          <p className="text-muted">
            {currentStep || "Initializing processing..."}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-bg rounded-full h-3 overflow-hidden">
            <div
              className="bg-accent h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-muted">
            <span>{progress}% completed</span>
            <span>Status: {status}</span>
          </div>

          <p className="text-xs text-muted">
            This may take up to 30 minutes. You can stay on this page.
          </p>
        </>
      )}
    </div>
  );
}
