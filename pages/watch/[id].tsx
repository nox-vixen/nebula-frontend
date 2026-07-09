import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Stream {
  id: string;
  provider: string;
  url: string;
  quality?: string;
  format?: string;
}

export default function WatchPage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [stream, setStream] = useState<Stream | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady || !id) return;

    (async () => {
      try {
        const res = await fetch(`/api/watch/${id}`);
        const json = await res.json();

        console.log("WATCH RESPONSE:", json);

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Unable to load stream");
        }

        setStream(json.data);
      } catch (e: any) {
        setError(e.message || "Playback failed");
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#141414] text-white text-xl">
        Loading stream...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#141414] text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-4 text-2xl font-bold">Nebula Debug</h1>

      <p><b>ID:</b> {stream?.id}</p>
      <p><b>Provider:</b> {stream?.provider}</p>
      <p><b>Quality:</b> {stream?.quality}</p>

      <div className="mt-6 break-all rounded bg-neutral-900 p-4">
        {stream?.url}
      </div>

      <a
        href={stream?.url}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block rounded bg-red-600 px-6 py-3"
      >
        Open Stream Directly
      </a>
    </div>
  );
}
