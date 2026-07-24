"use client";

import { useState } from "react";

type Props = {
  id: string;
  title: string;
};

export default function YouTubeEmbed({ id, title }: Props) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

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
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-[#0D0D0D]/60 group-hover:bg-[#0D0D0D]/40 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 border border-[#F2F0EB] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#F2F0EB]/10 group-hover:scale-105">
              <div
                className="w-0 h-0 border-y-transparent translate-x-[2px]"
                style={{
                  borderLeftWidth: "14px",
                  borderLeftColor: "#F2F0EB",
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
