"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* helpers */
function fullMonthsBetween(from: Date, to: Date) {
  let m =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  if (to.getDate() < from.getDate()) m -= 1;
  return Math.max(0, m);
}
function addMonthsKeepDOM(d: Date, add: number) {
  return new Date(d.getFullYear(), d.getMonth() + add, d.getDate());
}
function isSameYMD(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function formatMDY(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = d.getFullYear();
  return `${mm}/${dd}/${yy}`;
}

export default function MonthsaryPage() {
  const [now, setNow] = useState(new Date());
  const [message, setMessage] = useState("");

  // Together since 8/3/2025 (Aug is 7)
  const relationshipStart = useMemo(() => new Date(2025, 7, 3), []);
  const partner = "My Baby";

  const fullMessage = useMemo(
    () =>
      [
        `Hi, ${partner} ♡`,
        "",
        "Thank you for being my favorite person.",
        "For every gentle good morning, every laugh we share,",
        "and every little moment that feels like home.",
        "",
        "Happy monthsary to us — and to many more.",
        "I love you, always.",
      ].join("\n"),
    [partner]
  );

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);

    setMessage("");
    let i = 0;
    const typer = setInterval(() => {
      i += 1;
      setMessage(fullMessage.slice(0, i));
      if (i >= fullMessage.length) clearInterval(typer);
    }, 50);

    const heartEmojis = ["❤", "💖", "💓", "💞", "💕"];
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const ts = Date.now();
      if (ts - last < 100) return;
      last = ts;
      const el = document.createElement("div");
      el.className = "cursor-heart";
      el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      el.style.left = e.pageX + "px";
      el.style.top = e.pageY + "px";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1500);
    };
    document.addEventListener("mousemove", onMove);

    return () => {
      clearInterval(t);
      clearInterval(typer);
      document.removeEventListener("mousemove", onMove);
    };
  }, [fullMessage]);

  /* monthsary math */
  const monthsCompleted = useMemo(
    () => fullMonthsBetween(relationshipStart, now),
    [relationshipStart, now]
  );
  const thisMonthsary = useMemo(
    () => addMonthsKeepDOM(relationshipStart, monthsCompleted),
    [relationshipStart, monthsCompleted]
  );
  const nextMonthsary = useMemo(() => {
    if (isSameYMD(thisMonthsary, now)) return thisMonthsary;
    if (thisMonthsary > now) return thisMonthsary;
    return addMonthsKeepDOM(relationshipStart, monthsCompleted + 1);
  }, [thisMonthsary, relationshipStart, monthsCompleted, now]);

  const upcomingNumber = useMemo(
    () => (isSameYMD(thisMonthsary, now) ? monthsCompleted : monthsCompleted + 1),
    [thisMonthsary, monthsCompleted, now]
  );

  const msInDay = 86_400_000;
  const daysTogether = Math.floor(
    (now.getTime() - relationshipStart.getTime()) / msInDay
  );

  const diffMs = Math.max(0, nextMonthsary.getTime() - now.getTime());
  const daysUntil = Math.floor(diffMs / msInDay);
  const hoursUntil = Math.floor((diffMs % msInDay) / 3_600_000);
  const minutesUntil = Math.floor((diffMs % 3_600_000) / 60_000);
  const secondsUntil = Math.floor((diffMs % 60_000) / 1000);

  const replayMessage = () => {
    setMessage("");
    let i = 0;
    const typer = setInterval(() => {
      i += 1;
      setMessage(fullMessage.slice(0, i));
      if (i >= fullMessage.length) clearInterval(typer);
    }, 30);
  };

  const heartRain = () => {
    const emojis = ["💗", "💖", "💞", "💘", "💕", "🎀"];
    for (let i = 0; i < 30; i++) {
      const conf = document.createElement("span");
      conf.className = "confetti-heart";
      conf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      conf.style.left = Math.random() * window.innerWidth + "px";
      conf.style.top = "-20px";
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 2000);
    }
  };

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back
      </Link>

      <div className="page">
        <h1>
          Happy Monthsary, <span style={{ fontFamily: "var(--font-dancing)" }}>{partner}</span>! 💖
        </h1>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #ffeef6, #ffd8e9)",
              border: "2px dashed #ffb7d4",
              padding: "0.75rem 1.25rem",
              borderRadius: "var(--radius-lg)",
              fontWeight: 800,
              letterSpacing: "0.025em",
              boxShadow: "0 8px 18px rgba(255,126,177,0.18)",
            }}
          >
            Month {upcomingNumber} since {formatMDY(relationshipStart)}
          </div>
          <p
            style={{
              marginTop: "0.5rem",
              fontWeight: 900,
              color: "var(--primary)",
              letterSpacing: "0.05em",
            }}
          >
            {now.toLocaleTimeString()}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {/* Together Since with year */}
          <StatCard title="Together Since" value={formatMDY(relationshipStart)} />
          <StatCard title="Months Together" value={String(monthsCompleted)} />
          <StatCard title="Days Together" value={String(daysTogether)} />
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)",
              border: "2px solid rgba(236, 72, 153, 0.15)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(236, 72, 153, 0.08)",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem", color: "var(--primary)" }}>
              Next Monthsary
            </h3>
            <div style={{ fontSize: "1.25rem", fontWeight: 900 }}>
              {formatMDY(nextMonthsary)}
            </div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, marginTop: "0.5rem" }}>
              {diffMs === 0
                ? "It's today! ✨"
                : `${daysUntil}d ${hoursUntil}h ${minutesUntil}m ${secondsUntil}s`}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)",
            border: "2px solid rgba(236, 72, 153, 0.15)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem",
            boxShadow: "0 10px 25px rgba(236, 72, 153, 0.08)",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              height: "6px",
              borderRadius: "6px",
              background: "linear-gradient(90deg, #ffcfe1, #ffdce9, #ffeef6)",
              marginBottom: "1rem",
            }}
          />
          <pre
            style={{
              whiteSpace: "pre-wrap",
              margin: 0,
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "1.125rem",
              color: "var(--foreground)",
              lineHeight: 1.6,
            }}
          >
            {message}
          </pre>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
            <button onClick={replayMessage} className="love-button small">
              Replay message
            </button>
            <button onClick={heartRain} className="love-button small">
              Shower with hearts
            </button>
            <a
              href="https://open.spotify.com/playlist/1qXCs2ifAVOtZAMDdwoD60?si=707ddf34ab2d442d"
              target="_blank"
              rel="noreferrer noopener"
              className="love-button"
            >
              Play our song ♫
            </a>
          </div>
        </div>

        <div>
          <strong className="section-title">Small promise:</strong>
          <p>I'll keep choosing you in all the little ways — today, next month, and every month after. ♡</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)",
        border: "2px solid rgba(236, 72, 153, 0.15)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(236, 72, 153, 0.08)",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem", color: "var(--primary)" }}>{title}</h3>
      <div style={{ fontSize: "1.25rem", fontWeight: 900 }}>{value}</div>
    </div>
  );
}
