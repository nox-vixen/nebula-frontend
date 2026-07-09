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

  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady || !id) return;

    (async () => {
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
    })();
  }, [router.isReady, id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white text-xl">
        Loading stream...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      <video
        src={stream?.url}
        controls
        autoPlay
        playsInline
        preload="auto"
        className="w-full h-full"
        onLoadedMetadata={() => console.log("Video loaded")}
        onCanPlay={() => console.log("Video can play")}
        onPlay={() => console.log("Playing")}
        onError={(e) => console.error("Video error", e)}
      />
    </div>
  );
}
