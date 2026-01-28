import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 py-6 space-y-10">
        {/* Section 1: Upload */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Upload Match Video
          </h2>

          <div className="bg-card rounded-xl p-6">
            <p className="text-muted">
              Upload a recorded match or provide a live stream URL.
            </p>
          </div>
        </section>

        {/* Section 2: Preview / Processing */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Processing Status
          </h2>

          <div className="bg-card rounded-xl p-6 text-muted">
            No video uploaded yet.
          </div>
        </section>

        {/* Section 3: Highlights */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Generated Highlights
          </h2>

          <div className="bg-card rounded-xl p-6 text-muted">
            Highlights will appear here after processing.
          </div>
        </section>
      </main>
    </>
  );
}
