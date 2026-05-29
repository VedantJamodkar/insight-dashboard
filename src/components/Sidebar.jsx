import React, { useState } from 'react'

const NAV = [
  { id:'dashboard', d:'M3 3h6v6H3zm8 0h6v6h-6zM3 11h6v6H3zm8 0h6v6h-6z' },
  { id:'map',       d:'M9 3L3 6.5v11L9 14l6 3.5 6-3.5v-11L15 6.5 9 3zM9 14V5.2l6 3.5V17L9 14z' },
  { id:'location',  d:'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
  { id:'scan',      d:'M3 5h2V3H3v2zm0 8h2v-2H3v2zm0 8h2v-2H3v2zm4-16H5v2h2V5zm0 16H5v2h2v-2zm4-16H9v2h2V5zm4 16h-2v2h2v-2zm-4 0H9v2h2v-2zm4-16h-2v2h2V5zm4 4h-2v2h2V9zm0 8h-2v2h2v-2zM3 9H1v2h2V9zm16 0h-2v2h2V9zM3 13H1v2h2v-2zm16 0h-2v2h2v-2zM1 21h2v-2H1v2zm18 0h2v-2h-2v2z' },
  { id:'analytics', d:'M3.5 18.5l4-8 4 3 4-6 4 11H3.5z' },
]

export default function Sidebar() {
  const [active, setActive] = useState('dashboard')
  return (
    <aside style={{
      width: 52, background: '#111', display: 'flex', flexDirection: 'column',
      alignItems: 'center', paddingTop: 12, gap: 4, flexShrink: 0, zIndex: 20,
      borderRight: '1px solid #222'
    }}>
      {/* Logo */}
      <div style={{
        width: 36, height: 36, display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginBottom: 12
      }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 11, letterSpacing: '0.05em' }}>ERIC</span>
      </div>

      {NAV.map(item => (
        <button key={item.id} onClick={() => setActive(item.id)} style={{
          width: 36, height: 36, borderRadius: 8, border: 'none',
          background: active === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
          color: active === item.id ? '#fff' : '#666',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s'
        }}>
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
            <path d={item.d} />
          </svg>
        </button>
      ))}

      <div style={{ flex: 1 }} />

      {/* Avatar */}
      <div style={{
        width: 30, height: 30, borderRadius: '50%', background: '#333',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#aaa', fontSize: 10, fontWeight: 600, marginBottom: 12, cursor: 'pointer'
      }}>V</div>
    </aside>
  )
}
