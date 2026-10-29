"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Bangkok",
});

// Bangkok time, "HH:MM GMT+07:00". Empty on the server so the first render matches.
export default function Clock({ className }: { className?: string }) {
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className={className} aria-label="Time in Bangkok">
      {now ? `${now} GMT+07:00` : " "}
    </time>
  );
}
