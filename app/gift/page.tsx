"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function GiftPage() {
  const [showSurprise, setShowSurprise] = useState(false)

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

  const handleSurprise = () => {
    setShowSurprise(!showSurprise)

    // Create heart confetti
    const emojis = ["💗", "💖", "💞", "💘", "💕", "🎀"]
    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement("span")
      confetti.className = "confetti-heart"
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      confetti.style.left = Math.random() * window.innerWidth + "px"
      confetti.style.top = "-20px"
      document.body.appendChild(confetti)

      setTimeout(() => confetti.remove(), 2000)
    }
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back
      </Link>
      <div className="page">
        <h1>Your Gift 🎁</h1>
        <p>Click the button for a little surprise:</p>
        <button className="love-button" onClick={handleSurprise}>
          Open Surprise ✨
        </button>

        {showSurprise && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p className="love-message" style={{ fontSize: "1.25rem", fontWeight: "600", color: "var(--primary)" }}>
              You are my favorite person in the whole world. I love you more than you know. 💖
            </p>
            <div className="flower">
              <div className="petal p1"></div>
              <div className="petal p2"></div>
              <div className="petal p3"></div>
              <div className="petal p4"></div>
              <div className="center"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
