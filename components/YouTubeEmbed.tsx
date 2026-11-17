"use client";

import { useState } from "react";

type Props = {
  id: string;
  title: string;
};

export default function YouTubeEmbed({ id, title }: Props) {
  const [active, setActive] = useState(false);
  // maxresdefault exists only for HD uploads; for the rest YouTube answers with a
  // 120 x 90 grey placeholder (or a 404). Fall back to hqdefault, which every video has.
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  const fallback = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className="relative w-full overflow-hidden bg-[#111]" style={{ aspectRatio: "16 / 9" }}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 w-full h-full"
        >
          {/* Thumbnail uses plain img; YouTube CDN, no Next/Image config needed */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            onError={() => setThumb(fallback)}
            onLoad={(e) => { if (e.currentTarget.naturalWidth <= 120 && thumb !== fallback) setThumb(fallback); }}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Light ink veil and a paper play mark: the thumbnail reads like the stills around it */}
          <div className="absolute inset-0 bg-[#111]/24 group-hover:bg-[#111]/8 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 border border-[#FBFBFB] rounded-full flex items-center justify-center transition-[transform,background-color] duration-200 ease-out group-hover:bg-[#FBFBFB]/10 group-hover:scale-105">
              <div
                className="w-0 h-0 border-y-transparent translate-x-[2px]"
                style={{
                  borderLeftWidth: "14px",
                  borderLeftColor: "#FBFBFB",
                  borderTopWidth: "9px",
                  borderBottomWidth: "9px",
                }}
              />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
