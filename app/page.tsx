"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function HomePage() {
  useEffect(() => {
    // Add sparkles animation
    const hero = document.querySelector(".hero")
    if (hero && !hero.querySelector(".sparkles")) {
      const sparkles = document.createElement("div")
      sparkles.className = "sparkles"
      sparkles.setAttribute("aria-hidden", "true")
      sparkles.innerHTML = '<span class="sparkle">✧</span><span class="sparkle">✦</span><span class="sparkle">✧</span>'
      hero.appendChild(sparkles)
    }

    // Cursor hearts effect
    const heartEmojis = ["❤", "💖", "💓", "💞", "💕"]
    let lastHeartTime = 0

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastHeartTime < 100) return // Throttle
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

    // Heart confetti on hover
    const hearts = document.querySelectorAll(".heart")
    hearts.forEach((heart) => {
      heart.addEventListener("mouseenter", () => {
        const rect = heart.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const emojis = ["💗", "💖", "💞", "💘", "💕", "🎀"]

        for (let i = 0; i < 8; i++) {
          const confetti = document.createElement("span")
          confetti.className = "confetti-heart"
          confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)]
          confetti.style.left = cx + "px"
          confetti.style.top = cy + "px"
          confetti.style.setProperty("--dx", Math.random() * 160 - 80 + "px")
          confetti.style.setProperty("--dy", -60 - Math.random() * 140 + "px")
          document.body.appendChild(confetti)

          setTimeout(() => confetti.remove(), 2000)
        }
      })
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="container">
      <div className="hero">
        <h1>
          Hi, My Baby! <span aria-hidden="true">❤️</span>
        </h1>
        <p className="intro">
          I made this special surprise just for you. Tap the charms to explore our little world ✨
        </p>

        <div className="hearts" role="navigation" aria-label="Romantic navigation">
          <Link href="/reasons" className="heart">
            <span className="emoji">❤️</span>
            <span className="label">Reasons</span>
          </Link>
          <Link href="/letter" className="heart">
            <span className="emoji">💌</span>
            <span className="label">Letter</span>
          </Link>
          <Link href="/memories" className="heart">
            <span className="emoji">📸</span>
            <span className="label">Memories</span>
          </Link>
          <Link href="/notes" className="heart">
            <span className="emoji">📝</span>
            <span className="label">Notes</span>
          </Link>
          <Link href="/future" className="heart">
            <span className="emoji">💍</span>
            <span className="label">Future</span>
          </Link>
          <Link href="/gift" className="heart">
            <span className="emoji">🎁</span>
            <span className="label">Gift</span>
          </Link>
          <Link href="/monthsary" className="heart">
            <span className="emoji">🗓️</span>
            <span className="label">Monthsary</span>
          </Link>
        </div>

        <div className="love-message">
          <strong className="section-title">Little Note:</strong>
          <p>Everything here is made with bows, blush, and lots of love. Enjoy! ♡</p>
        </div>
      </div>
    </div>
  )
}
