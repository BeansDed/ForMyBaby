"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function LetterPage() {
  useEffect(() => {
    // Add cursor hearts effect
    const heartEmojis = ["❤", "💖", "💓", "💞", "💕"]
    let lastHeartTime = 0

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastHeartTime < 100) return
      lastHeartTime = now

      const heart = document.createElement("div")
      heart.className = "cursor-heart"
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
      heart.style.left = e.pageX + "px"
      heart.style.top = e.pageY + "px"
      document.body.appendChild(heart)

      setTimeout(() => heart.remove(), 1500)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back
      </Link>
      <div className="page">
        <h1>My Letter to You 💌</h1>
        <div style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "var(--foreground)" }}>
          <p>Hi baby,</p>
          <p>
            I just want to remind you how grateful I am to have you. You're the kindest heart I've ever known, and each
            day with you feels like a beautiful chapter in a story I never want to end.
          </p>
          <p>Thank you for loving me—on my best days and even on the hardest ones. I'll always choose you, forever.</p>
          <p>Always yours,</p>
          <p style={{ fontFamily: "var(--font-dancing)", fontSize: "1.5rem", color: "var(--primary)" }}>— Me 💖</p>
        </div>
      </div>
    </div>
  )
}
