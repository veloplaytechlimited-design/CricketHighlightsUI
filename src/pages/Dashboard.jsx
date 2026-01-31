import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";

export default function Dashboard() {
  const [matchId, setMatchId] = useState(null);
  const [status, setStatus] = useState("IDLE");

  function handleJobCreated(data) {
    setMatchId(data.matchId);
    setStatus(data.status);
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 py-6 space-y-10">
        {/* Upload Section */}
        {!matchId && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Upload Match
            </h2>
            <UploadBox onJobCreated={handleJobCreated} />
          </section>
        )}

        {/* Processing Placeholder */}
        {matchId && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Processing Status
            </h2>

            <div className="bg-card rounded-xl p-6 text-muted">
              Match ID: <span className="text-white">{matchId}</span>
              <br />
              Status: <span className="text-white">{status}</span>
              <br />
              Processing has started. This may take ~30 minutes.
            </div>
          </section>
        )}
      </main>
    </>
  );
}
