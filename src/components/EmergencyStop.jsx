import React, { useState } from 'react'

export default function EmergencyStop({ active, onToggle }) {
  const [pressing, setPressing] = useState(false)

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
      {/* Outer yellow ring */}
      <div style={{
        width: 76, height: 76, borderRadius:'50%',
        background: active
          ? 'radial-gradient(circle, #ff2222 0%, #cc0000 60%, #990000 100%)'
          : 'radial-gradient(circle, #f0b820 0%, #e09010 60%, #c07800 100%)',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow: active
          ? '0 0 0 4px #cc0000, 0 6px 24px rgba(200,0,0,0.6)'
          : '0 0 0 4px #c07800, 0 6px 24px rgba(0,0,0,0.5)',
        cursor: 'pointer',
        transform: pressing ? 'scale(0.93)' : 'scale(1)',
        transition: 'transform 0.1s, box-shadow 0.2s',
        userSelect: 'none',
      }}
        onClick={onToggle}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
        onMouseLeave={() => setPressing(false)}
      >
        {/* Inner red button */}
        <div style={{
          width: 54, height: 54, borderRadius:'50%',
          background: active
            ? 'radial-gradient(circle, #ff6666 0%, #dd0000 100%)'
            : 'radial-gradient(circle, #ff3333 0%, #cc0000 70%, #aa0000 100%)',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'inset 0 -3px 8px rgba(0,0,0,0.4)',
        }}>
          {/* Rotating arrows icon */}
          <svg viewBox="0 0 32 32" fill="white" style={{
            width:28, height:28,
            animation: active ? 'spin 1.2s linear infinite' : 'none'
          }}>
            <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
            <path d="M16 4a12 12 0 0 1 9.9 5.2l-2.8 1.6A8.5 8.5 0 0 0 7.5 16H4A12 12 0 0 1 16 4z" opacity="0.9"/>
            <path d="M16 28a12 12 0 0 1-9.9-5.2l2.8-1.6A8.5 8.5 0 0 0 24.5 16H28A12 12 0 0 1 16 28z" opacity="0.9"/>
            <polygon points="24,7 27,13 21,13"/>
            <polygon points="8,25 5,19 11,19"/>
          </svg>
        </div>
      </div>

      {/* Label */}
      <div style={{
        textAlign:'center', lineHeight:1.2,
        background:'rgba(0,0,0,0.75)', borderRadius:4, padding:'3px 8px',
        border:'1px solid rgba(255,68,68,0.3)'
      }}>
        <div style={{ fontSize:8, fontWeight:700, color:'#ff4444', letterSpacing:'0.1em',
          fontFamily:'JetBrains Mono, monospace' }}>EMERGENCY</div>
        <div style={{ fontSize:8, fontWeight:700, color:'#ff4444', letterSpacing:'0.1em',
          fontFamily:'JetBrains Mono, monospace' }}>STOP</div>
      </div>
    </div>
  )
}
