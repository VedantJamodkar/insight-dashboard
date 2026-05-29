import React, { useEffect, useRef, useState } from 'react'

// Mini camera scene (shown when main view is map)
function drawCameraThumb(ctx, W, H) {
  ctx.fillStyle = '#2a2a2a'; ctx.fillRect(0,0,W,H)
  ctx.fillStyle = '#333'; ctx.fillRect(0, H*0.45, W, H*0.55)
  ctx.strokeStyle='#f0b820'; ctx.lineWidth=3
  for (let i=0;i<3;i++){const x=W*0.55+i*18; ctx.beginPath();ctx.moveTo(x,H*0.4);ctx.lineTo(x,H*0.75);ctx.stroke()}
  ctx.beginPath();ctx.moveTo(W*0.52,H*0.52);ctx.lineTo(W*0.99,H*0.52);ctx.stroke()
  ctx.beginPath();ctx.moveTo(W*0.52,H*0.64);ctx.lineTo(W*0.99,H*0.64);ctx.stroke()
  ctx.fillStyle='#444';ctx.fillRect(W*0.08,H*0.1,7,H*0.55)
  const vig=ctx.createRadialGradient(W/2,H/2,H*0.1,W/2,H/2,H*0.7)
  vig.addColorStop(0,'rgba(0,0,0,0)'); vig.addColorStop(1,'rgba(0,0,0,0.55)')
  ctx.fillStyle=vig; ctx.fillRect(0,0,W,H)
}

// Mini map scene (shown when main view is camera)
function drawMapThumb(ctx, W, H, frame) {
  // Light gray map background
  ctx.fillStyle = '#d4d4d4'; ctx.fillRect(0,0,W,H)
  // Map outline
  ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 2
  ctx.strokeRect(8, 6, W-16, H-12)

  // Mini rooms
  const rooms = [
    { x:12, y:10, w:50, h:30, fill:'#f5f5f5' },
    { x:68, y:10, w:40, h:22, fill:'#fce8e8' },
    { x:68, y:36, w:40, h:30, fill:'#fce8e8' },
    { x:12, y:44, w:32, h:30, fill:'#f5f5f5' },
    { x:110,y:10, w:30, h:56, fill:'#f5f5f5' },
  ]
  for (const r of rooms) {
    ctx.fillStyle = r.fill; ctx.fillRect(r.x,r.y,r.w,r.h)
    ctx.strokeStyle='#1a1a1a'; ctx.lineWidth=1; ctx.strokeRect(r.x,r.y,r.w,r.h)
  }

  // Mini robot dot (animated)
  const rx = 40 + Math.sin(frame*0.02)*15
  const ry = 35 + Math.cos(frame*0.015)*12
  ctx.fillStyle = '#00d4ff'
  ctx.beginPath(); ctx.arc(rx,ry,4,0,Math.PI*2); ctx.fill()
  ctx.strokeStyle='rgba(0,212,255,0.4)'; ctx.lineWidth=1
  ctx.beginPath(); ctx.arc(rx,ry,8,0,Math.PI*2); ctx.stroke()

  // Obstacle dots
  ctx.fillStyle='#1a1a1a'
  const obs = [[25,18],[38,22],[55,14],[80,16],[90,50],[120,30],[45,55],[20,60]]
  for (const [ox,oy] of obs) { ctx.beginPath(); ctx.arc(ox,oy,1.2,0,Math.PI*2); ctx.fill() }
}

export default function CameraThumbnail({ view, onClick }) {
  const ref = useRef(null)
  const animR = useRef(null)
  const fr = useRef(0)
  const [hover, setHover] = useState(false)
  const viewRef = useRef(view)

  useEffect(() => { viewRef.current = view }, [view])

  useEffect(() => {
    if (viewRef.current !== 'camera') return
    
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    c.width = 160; c.height = 100
    function tick() {
      animR.current = requestAnimationFrame(tick)
      fr.current++
      drawMapThumb(ctx, 160, 100, fr.current)
    }
    tick()
    return () => cancelAnimationFrame(animR.current)
  }, [view])

  const isCamera = view === 'camera'
  const label = isCamera ? 'MAP' : 'CAM-01'

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 180, height: 110,
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
        border: `2px solid ${hover ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)'}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        transition: 'border-color 0.2s, transform 0.15s',
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        backgroundColor: '#1a1a1a',
        position: 'relative'
      }}
    >
      {isCamera ? (
        <canvas ref={ref} style={{ width:'100%', height:'100%', display:'block' }} />
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <video 
            src="/assets/warehouse-cam.mp4"
            autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.5) 100%)'
          }} />
        </div>
      )}

      {hover && (
        <div style={{
          position:'absolute', inset:0,
          background: 'rgba(0,0,0,0.4)',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <div className="pill" style={{ fontSize:10, fontWeight:600, padding:'5px 12px' }}>
            Click to enter camera view
          </div>
        </div>
      )}

      <div style={{
        position:'absolute', top:6, left:8,
        fontSize:9, fontWeight:600,
        color: isCamera ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
        fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.05em'
      }}>{label}</div>
    </div>
  )
}
