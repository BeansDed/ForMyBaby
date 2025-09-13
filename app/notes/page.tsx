"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function NotesPage() {
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
        <h1>Little Notes 📝</h1>
        <p>Remember to eat, hydrate, and rest. I'm always proud of you. You're doing great, okay? 🌷</p>
        <ul className="notes">
          <li>Drink water 💧</li>
          <li>Don't skip meals 🍚</li>
          <li>Rest your eyes 😴</li>
          <li>Message me if you need anything 💬</li>
          <li>You're amazing just as you are ✨</li>
          <li>Take breaks when you need them 🌸</li>
        </ul>
      </div>
    </div>
  )
}
