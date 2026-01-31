import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import ProcessingStatus from "../components/ProcessingStatus";

export default function Dashboard() {
  const [matchId, setMatchId] = useState(null);
  const [stage, setStage] = useState("UPLOAD"); 
  // UPLOAD → PROCESSING → COMPLETED → FAILED

  function handleJobCreated(data) {
    setMatchId(data.matchId);
    setStage("PROCESSING");
  }

  function handleProcessingCompleted() {
    setStage("COMPLETED");
  }

  function handleProcessingFailed() {
    setStage("FAILED");
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 py-6 space-y-10">
        {/* Upload */}
        {stage === "UPLOAD" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Upload Match
            </h2>
            <UploadBox onJobCreated={handleJobCreated} />
          </section>
        )}

        {/* Processing */}
        {stage === "PROCESSING" && matchId && (
          <section>
            <ProcessingStatus
              matchId={matchId}
              onCompleted={handleProcessingCompleted}
              onFailed={handleProcessingFailed}
            />
          </section>
        )}

        {/* Completed */}
        {stage === "COMPLETED" && (
          <section className="bg-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-2">
              Processing Completed
            </h2>
            <p className="text-muted">
              Highlights are ready. Fetching clips next.
            </p>
          </section>
        )}

        {/* Failed */}
        {stage === "FAILED" && (
          <section className="bg-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-red-500 mb-2">
              Processing Failed
            </h2>
            <p className="text-muted">
              Something went wrong. Please try again.
            </p>
          </section>
        )}
      </main>
    </>
  );
}
