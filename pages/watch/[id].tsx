import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Stream {
  id: string;
  provider: string;
  url: string;
  quality?: string;
}

export default function WatchPage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [stream, setStream] = useState<Stream | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady || !id) return;

    async function load() {
      try {
        const res = await fetch(`/api/watch/${id}`);
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Unable to load stream");
        }

        setStream(json.data);
      } catch (e: any) {
        setError(e.message || "Playback failed");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router.isReady, id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#141414] text-white">
        Loading stream...
      </div>
    );
  }

  if (error || !stream) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#141414] text-red-400">
        {error || "No stream available"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <video
        src={stream.url}
        controls
        autoPlay
        playsInline
        className="h-screen w-screen"
      />
    </div>
  );
}
