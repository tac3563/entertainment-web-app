import useStore from "../stores/store.ts";

export default function TrailerModal() {
  const { selectedTrailerUrl, setSelectedTrailerUrl } = useStore();

  if (!selectedTrailerUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="w-[90vw] max-w-3xl aspect-video bg-black relative">
        <button
          className="absolute top-2 right-2 text-white text-xl"
          onClick={() => setSelectedTrailerUrl(null)}
        >
          ✖
        </button>
        <iframe
          className="w-full h-full"
          src={selectedTrailerUrl}
          allowFullScreen
          title="Trailer"
        ></iframe>
      </div>
    </div>
  );
}
