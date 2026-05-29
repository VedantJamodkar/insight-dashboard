import React, { useState, useEffect } from 'react'

function SignalBar({ level }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 12 }}>
      {[3,5,7,9,11].map((h,i) => (
        <div key={i} style={{
          width: 2.5, height: h, borderRadius: 1,
          background: i < level ? '#22c55e' : 'rgba(0,0,0,0.2)'
        }} />
      ))}
    </div>
  )
}

export default function TopBar({ view, mode, paused, onToggleView, onToggleMode, onTogglePause }) {
  const [signal, setSignal] = useState(5)
  useEffect(() => {
    const t = setInterval(() => setSignal(4 + Math.round(Math.random())), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      position: 'absolute', top: 16, left: 16, right: 16,
      display: 'flex', alignItems: 'center', gap: 10, zIndex: 20
    }}>
      {/* ── LEFT: Quick Goal ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button className="pill" style={{ fontWeight: 600, fontSize: 11 }}>
          QUICK GOAL
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{width:12,height:12}}>
            <circle cx="8" cy="8" r="6"/>
            <path d="M8 5v6M5 8h6"/>
          </svg>
        </button>
      </div>

      {/* ── CENTER: Status indicators ── */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
        {/* HAAS indicator */}
        <div className="pill" style={{ gap: 6, fontSize: 11 }}>
          <span className="dot green" />
          <span style={{ fontWeight: 600 }}>HAAS</span>
        </div>

        {/* Stormy indicator */}
        <div className="pill" style={{ gap: 6, fontSize: 11 }}>
          <SignalBar level={signal} />
          <span style={{ fontWeight: 600 }}>Stormy</span>
        </div>

        {/* Failsafe */}
        <div className="pill" style={{ gap: 6, fontSize: 11 }}>
          <span style={{ color: '#666' }}>Failsafe:</span>
          <span style={{ fontWeight: 600, color: '#22c55e' }}>Clear ●</span>
        </div>

        {/* System */}
        <div className="pill" style={{ gap: 6, fontSize: 11 }}>
          <span style={{ color: '#666' }}>System:</span>
          <span style={{ fontWeight: 600, color: '#22c55e' }}>Clear ●</span>
        </div>
      </div>

      {/* ── RIGHT: Main View + Mode ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Main View button */}
        <button className="pill" onClick={onToggleView} style={{ fontWeight: 600, fontSize: 11 }}>
          {view === 'map' ? 'Main View' : 'Camera View'}
        </button>

        {/* Mode toggle */}
        <div className="pill" style={{ padding: '4px 5px', gap: 4 }}>
          <span style={{ fontSize: 10, color: '#888', marginRight: 2, fontWeight: 400 }}>MODE</span>
          <button onClick={() => mode !== 'auto' && onToggleMode()} style={{
            padding: '3px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: 11,
            background: mode === 'auto' ? '#111' : 'transparent',
            color: mode === 'auto' ? '#fff' : '#888',
            transition: 'all 0.2s'
          }}>AUTO</button>
          <button onClick={() => mode !== 'manual' && onToggleMode()} style={{
            padding: '3px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: 11,
            background: mode === 'manual' ? '#111' : 'transparent',
            color: mode === 'manual' ? '#fff' : '#888',
            transition: 'all 0.2s'
          }}>MANUAL</button>
        </div>

        {/* MANUAL indicator */}
        <div className="pill" style={{ fontWeight: 600, fontSize: 11, background: '#111', color: '#fff', border: '1px solid #333' }}>
          MANUAL
        </div>
      </div>
    </div>
  )
}
