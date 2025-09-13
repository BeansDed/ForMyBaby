"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function ReasonsPage() {
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
        <h1>Reasons I Love You ❤️</h1>
        <p>There are a million little things that make my heart choose you every single day:</p>
        <ul className="reasons-list">
          <li>Your smile lights up even the dullest days.</li>
          <li>You always know how to make me feel safe and loved.</li>
          <li>Your kindness and patience inspire me.</li>
          <li>The way you laugh at my jokes—even the corny ones 😂</li>
          <li>You trust me and believe in me.</li>
          <li>You're my peace, my home, my favorite person. 🥹</li>
        </ul>
      </div>
    </div>
  )
}
