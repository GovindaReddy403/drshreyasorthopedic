export type ClinicVideo = {
  title: string;
  description: string;
  category: string;
  youtubeId?: string | null;
  /** Display duration, e.g. "4:12". */
  duration?: string;
  /** Optional thumbnail; falls back to a themed placeholder. */
  thumbnail?: string;
};

/** Extract a YouTube video id from any common YouTube URL form. */
export function youtubeVideoId(url?: string | null): string | null {
  if (!url) return null;
  const m =
    url.match(/[?&]v=([A-Za-z0-9_-]{11})/) ??
    url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ??
    url.match(/embed\/([A-Za-z0-9_-]{11})/) ??
    url.match(/shorts\/([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function youtubeEmbedSrc(id: string, opts?: { autoplay?: boolean }) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (opts?.autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1");
    params.set("loop", "1");
    params.set("playlist", id);
  }
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/** Patient education / testimonial library. Add a youtubeId to publish a video. */
export const CLINIC_VIDEOS: ClinicVideo[] = [
  {
    title: "ACL reconstruction — a patient's recovery journey",
    description: "Key-hole ligament surgery and the return to weekend sport, explained step by step.",
    category: "Patient story",
    duration: "3:48",
  },
  {
    title: "Rotator cuff repair — sleeping pain-free again",
    description: "What arthroscopic shoulder repair involves and how rehabilitation progresses.",
    category: "Patient story",
    duration: "4:12",
  },
  {
    title: "Ankle instability — no more twisting on uneven ground",
    description: "Ligament reconstruction and balance retraining for a stable ankle.",
    category: "Patient story",
    duration: "3:05",
  },
  {
    title: "Knee replacement: what to expect on the day of surgery",
    description: "Admission, anaesthesia, walking the same day and going home.",
    category: "Patient education",
    duration: "5:20",
  },
  {
    title: "Exercises after knee arthroscopy — weeks 1 to 6",
    description: "A simple home programme to restore movement and quadriceps strength.",
    category: "Patient education",
    duration: "6:02",
  },
  {
    title: "PRP and ortho biologics — who actually benefits?",
    description: "How platelet-rich plasma works and which conditions respond to it.",
    category: "Patient education",
    duration: "4:35",
  },
];
