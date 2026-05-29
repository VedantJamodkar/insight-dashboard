import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import MapCanvas from './components/MapCanvas.jsx'
import CameraCanvas from './components/CameraCanvas.jsx'
import CameraThumbnail from './components/CameraThumbnail.jsx'
import EmergencyStop from './components/EmergencyStop.jsx'
import DPad from './components/DPad.jsx'
import './App.css'

export default function App() {
  const [view, setView] = useState('map')   // 'map' | 'camera'
  const [mode, setMode] = useState('auto')  // 'auto' | 'manual'
  const [paused, setPaused] = useState(false)
  const [estopActive, setEstopActive] = useState(false)

  const toggleView = () => setView(v => v === 'map' ? 'camera' : 'map')

  return (
    <div className="app">
      <Sidebar />

      <div className={`viewport ${view === 'camera' ? 'cam-mode' : ''}`}>
        {/* Full-screen backgrounds */}
        {view === 'map'    && <MapCanvas paused={paused} estopActive={estopActive} />}
        {view === 'camera' && <CameraCanvas />}

        {/* Floating UI overlay */}
        <div className="overlay">
          <TopBar
            view={view}
            mode={mode}
            paused={paused}
            onToggleView={toggleView}
            onToggleMode={() => setMode(m => m === 'auto' ? 'manual' : 'auto')}
            onTogglePause={() => setPaused(p => !p)}
          />

          {/* Left side: Camera thumbnail with timeline */}
          <div style={{
            position: 'absolute', left: 24, bottom: 24,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12
          }}>
            <CameraThumbnail view={view} onClick={toggleView} />
            
            {/* Timeline dots */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center'
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: '#fff', border: '2px solid #333'
              }} />
              <div style={{ width: 2, height: 40, background: '#666' }} />
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: '#666', border: '2px solid #666'
              }} />
            </div>
          </div>

          {/* Bottom-right: E-stop + DPad */}
          <div style={{
            position: 'absolute', bottom: 24, right: 24,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16
          }}>
            <EmergencyStop active={estopActive} onToggle={() => setEstopActive(s => !s)} />
            <DPad disabled={mode === 'auto' || estopActive} />
          </div>
        </div>
      </div>
    </div>
  )
}
