import React, { useState, useCallback, useEffect } from 'react'

const DIRS = [
  { id:'up',    label:'W', x:1, y:0, icon:'▲', keys:['w','W','ArrowUp'] },
  { id:'left',  label:'A', x:0, y:1, icon:'◀', keys:['a','A','ArrowLeft'] },
  { id:'center',label:'',  x:1, y:1, icon:'·', center:true, keys:[] },
  { id:'right', label:'D', x:2, y:1, icon:'▶', keys:['d','D','ArrowRight'] },
  { id:'down',  label:'S', x:1, y:2, icon:'▼', keys:['s','S','ArrowDown'] },
]

export default function DPad({ disabled }) {
  const [pressed, setPressed] = useState(null)

  const press = useCallback((id) => {
    if (disabled) return
    setPressed(id)
  }, [disabled])

  const release = useCallback(() => setPressed(null), [])

  // Keyboard support for WASD and arrow keys
  useEffect(() => {
    if (disabled) return

    function handleKeyDown(e) {
      for (const d of DIRS) {
        if (d.keys && d.keys.includes(e.key)) {
          e.preventDefault()
          setPressed(d.id)
          return
        }
      }
    }
    function handleKeyUp(e) {
      for (const d of DIRS) {
        if (d.keys && d.keys.includes(e.key)) {
          setPressed(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [disabled])

  return (
    <div style={{
      display:'grid', gridTemplateColumns:'repeat(3, 38px)',
      gridTemplateRows:'repeat(3, 38px)', gap:3,
      opacity: disabled ? 0.4 : 1,
      transition:'opacity 0.2s',
    }}>
      {DIRS.map(d => (
        <div
          key={d.id}
          onMouseDown={() => press(d.id)}
          onMouseUp={release}
          onMouseLeave={release}
          onTouchStart={() => press(d.id)}
          onTouchEnd={release}
          style={{
            gridColumn: d.x + 1,
            gridRow:    d.y + 1,
            width:38, height:38, borderRadius: d.center ? '50%' : 8,
            background: d.center
              ? 'rgba(30,30,30,0.8)'
              : pressed === d.id
                ? 'rgba(60,60,60,0.95)'
                : 'rgba(20,20,20,0.85)',
            border: `1px solid ${pressed === d.id ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)'}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect:'none',
            transform: pressed === d.id ? 'scale(0.9)' : 'scale(1)',
            transition:'transform 0.08s, background 0.08s',
            boxShadow: pressed === d.id ? 'inset 0 2px 4px rgba(0,0,0,0.5)' : 'none',
            flexDirection:'column', gap:1,
          }}
        >
          {!d.center && (
            <>
              <span style={{ fontSize:10, color:'rgba(255,255,255,0.7)', lineHeight:1 }}>{d.icon}</span>
              <span style={{ fontSize:8, color:'rgba(255,255,255,0.4)',
                fontFamily:'JetBrains Mono, monospace', lineHeight:1 }}>{d.label}</span>
            </>
          )}
          {d.center && (
            <div style={{ width:10, height:10, borderRadius:'50%', background:'rgba(255,255,255,0.12)' }}/>
          )}
        </div>
      ))}
    </div>
  )
}
