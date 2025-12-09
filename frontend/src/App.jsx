import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Heart, Stars, Music, BookOpen, Gift, Calendar, Clock } from 'lucide-react'

function LandingPage() {
  const [loveCount, setLoveCount] = useState(0)

  useEffect(() => {
    fetch('/api/lovecount')
      .then(res => res.json())
      .then(data => setLoveCount(data.count))
      .catch(err => console.error(err))
  }, [])

  const incrementLove = () => {
    fetch('/api/lovecount/increment', { method: 'POST' })
      .then(res => res.json())
      .then(data => setLoveCount(data.count))
      .catch(err => console.error(err))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-love-50 via-pink-50 to-rose-100 flex flex-col items-center">
      {/* Hero Section */}
      <header className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto backdrop-blur-sm bg-white/30 sticky top-0 z-50 rounded-b-3xl shadow-sm">
        <h1 className="text-3xl font-bold text-rose-600 flex items-center gap-2 drop-shadow-sm">
          <Heart className="fill-rose-500 text-rose-600 animate-pulse" /> For My Baby
        </h1>
        <nav className="hidden md:flex gap-8 text-rose-800 font-medium">
          <a href="#memories" className="hover:text-rose-600 hover:scale-105 transition">Memories</a>
          <a href="#reasons" className="hover:text-rose-600 hover:scale-105 transition">Reasons Why</a>
          <a href="#bucketlist" className="hover:text-rose-600 hover:scale-105 transition">Bucket List</a>
          <a href="/admin" className="hover:text-rose-600 hover:scale-105 transition" target="_blank">Admin</a>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 flex flex-col items-center text-center">
        
        {/* Love Counter Section */}
        <div className="mt-12 mb-16 relative group cursor-pointer" onClick={incrementLove}>
          <div className="absolute inset-0 bg-rose-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
          <div className="relative animate-float">
            <Heart className="w-48 h-48 text-rose-500 fill-rose-100 group-hover:fill-rose-200 transition-colors duration-300 drop-shadow-xl" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-sm font-bold text-rose-400 uppercase tracking-widest">Love Count</span>
              <span className="text-5xl font-black text-rose-600 tabular-nums tracking-tighter">{loveCount.toLocaleString()}</span>
            </div>
          </div>
          <p className="mt-4 text-rose-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Click to send love!</p>
        </div>
        
        <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-8 text-balance leading-tight drop-shadow-sm">
          I Love You More<br/>Than Everything
        </h2>
        
        <p className="text-2xl text-rose-800/80 max-w-3xl mb-16 text-balance leading-relaxed font-light">
          Welcome to your personal corner of the internet. A digital sanctuary where I keep all our precious memories, 
          future dreams, and the countless reasons why you are the most amazing person in my world.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4 mb-20">
          <Card 
            icon={<Stars />} 
            title="Our Memories" 
            desc="A timeline of our beautiful moments together"
            color="bg-white/80"
            link="#memories"
          />
          <Card 
            icon={<BookOpen />} 
            title="Reasons Why" 
            desc="The infinite list of reasons I adore you"
            color="bg-white/80"
            link="#reasons"
          />
          <Card 
            icon={<Gift />} 
            title="Open When" 
            desc="Letters I wrote for every mood you're in"
            color="bg-white/80"
            link="#openwhen"
          />
        </div>

        {/* Stats Section */}
        <div className="w-full bg-white/40 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-white/50 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatItem label="Days Together" value="1,204" icon={<Calendar />} />
                <StatItem label="Photos" value="843" icon={<Stars />} />
                <StatItem label="Notes" value="156" icon={<BookOpen />} />
                <StatItem label="Hours Loved" value="28.9k" icon={<Clock />} />
            </div>
        </div>

      </main>

      <footer className="w-full p-8 text-center text-rose-400 bg-white/30 backdrop-blur-sm mt-auto">
        <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 fill-current animate-bounce" /> specifically for you
        </p>
      </footer>
    </div>
  )
}

function Card({ icon, title, desc, color, link }) {
  return (
    <a href={link} className={`block ${color} backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center gap-4 cursor-pointer group border border-white/60 relative overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-200 via-pink-400 to-rose-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-50 text-rose-500 group-hover:from-rose-500 group-hover:to-pink-600 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg ring-1 ring-rose-100 group-hover:ring-rose-500">
        {React.cloneElement(icon, { size: 36, strokeWidth: 1.5 })}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-rose-600 transition-colors">{title}</h3>
      <p className="text-gray-500 font-medium group-hover:text-gray-600 transition-colors">{desc}</p>
    </a>
  )
}

function StatItem({ label, value, icon }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="text-rose-300 mb-2">{React.cloneElement(icon, { size: 24 })}</div>
            <span className="text-4xl font-black text-rose-600">{value}</span>
            <span className="text-sm font-bold text-rose-400 uppercase tracking-wider">{label}</span>
        </div>
    )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}

export default App
