import React, { useEffect, useRef, useState } from 'react'

export default function CameraCanvas() {
  const videoRef = useRef(null)
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    let animId
    const tick = () => {
      setFrame(f => f + 1)
      animId = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#000' }}>
      {/* Real Video Feed */}
      <video
        ref={videoRef}
        src="/assets/warehouse-cam.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />

      {/* Perspective grid overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }}>
        <defs>
          <linearGradient id="fade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <g stroke="url(#fade)" strokeWidth="1">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={`${50 + (i - 5.5) * 5}%`} y1="50%" x2={`${50 + (i - 5.5) * 20}%`} y2="100%" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${50 + (i * 10)}%`} x2="100%" y2={`${50 + (i * 10)}%`} />
          ))}
        </g>
      </svg>

      {/* Vignette Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.65) 100%)'
      }} />

      {/* HUD Info */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: 16,
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        lineHeight: 1.6,
        pointerEvents: 'none',
        textShadow: '0 1px 2px rgba(0,0,0,0.8)'
      }}>
        <div>CAM-01 &nbsp;FRONT &nbsp;1920×1080</div>
        <div>FRAME {String(frame % 99999).padStart(5, '0')} &nbsp;ISO 400 &nbsp;1/60s</div>
      </div>
    </div>
  )
}
