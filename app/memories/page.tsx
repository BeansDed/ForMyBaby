"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function MemoriesPage() {
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
        <h1>Our Memories 📸</h1>
        <p>Here are some moments I never want to forget:</p>
        <div className="gallery">
          <img src="/romantic-couple-memory-photo.jpg" alt="Beautiful memory together" />
          <img src="/sweet-romantic-moment-photo.jpg" alt="Sweet moment we shared" />
          <img src="/happy-couple-photo-vintage-style.jpg" alt="Happy times together" />
          <img src="/romantic-date-night-photo.jpg" alt="Perfect date night" />
          <img src="/couple-laughing-together-photo.jpg" alt="Laughing together" />
          <img src="/romantic-sunset-couple-photo.jpg" alt="Sunset together" />
        </div>
      </div>
    </div>
  )
}
