"use client"

import type React from "react"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function FuturePage() {
  const [ideas, setIdeas] = useState<string[]>([])
  const [newIdea, setNewIdea] = useState("")

  useEffect(() => {
    // Load ideas from localStorage
    const saved = localStorage.getItem("dateIdeas")
    if (saved) {
      try {
        setIdeas(JSON.parse(saved))
      } catch {
        setIdeas([])
      }
    }

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

  const saveIdeas = (newIdeas: string[]) => {
    localStorage.setItem("dateIdeas", JSON.stringify(newIdeas))
    setIdeas(newIdeas)
  }

  const addIdea = (e: React.FormEvent) => {
    e.preventDefault()
    if (newIdea.trim()) {
      const updated = [...ideas, newIdea.trim()]
      saveIdeas(updated)
      setNewIdea("")
    }
  }

  const deleteIdea = (index: number) => {
    const updated = ideas.filter((_, i) => i !== index)
    saveIdeas(updated)
  }

  const editIdea = (index: number) => {
    const updated = prompt("Edit this idea:", ideas[index])
    if (updated !== null) {
      const newIdeas = [...ideas]
      newIdeas[index] = updated.trim() || ideas[index]
      saveIdeas(newIdeas)
    }
  }

  const clearAll = () => {
    if (ideas.length && confirm("Clear all ideas?")) {
      saveIdeas([])
    }
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back
      </Link>
      <div className="page">
        <h1>Our Future Plans 💍</h1>
        <p>Add ideas for things we'll do together. Everything saves on this device.</p>

        <div style={{ marginTop: "2rem" }}>
          <form onSubmit={addIdea} style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            <input
              type="text"
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              placeholder="Plan an adventure (e.g., 'Stargazing road trip')"
              required
              style={{
                flex: 1,
                padding: "1rem",
                borderRadius: "var(--radius-lg)",
                border: "2px solid rgba(236, 72, 153, 0.2)",
                outline: "none",
                fontSize: "1rem",
                background: "var(--input)",
              }}
            />
            <button type="submit" className="love-button small">
              Add
            </button>
          </form>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1rem" }}>
            {ideas.map((idea, index) => (
              <li
                key={index}
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)",
                  border: "2px solid rgba(236, 72, 153, 0.15)",
                  padding: "1.5rem",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  boxShadow: "0 8px 20px rgba(236, 72, 153, 0.08)",
                }}
              >
                <span style={{ flex: 1 }}>{idea}</span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => editIdea(index)} className="love-button small">
                    Edit
                  </button>
                  <button onClick={() => deleteIdea(index)} className="love-button small ghost">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {ideas.length > 0 && (
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={clearAll} className="love-button ghost small">
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
