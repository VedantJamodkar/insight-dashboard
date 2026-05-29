# Insight.IO Dashboard - ERIC Robotics Assignment

## 👤 Candidate Information

- **Full Name**: Vedant Panjab Jamodkar
- **Email ID**: vedantjamodkar18@gmail.com
- **GitHub Username**: VedantJamodkar

---

A fully functional robotics visualization dashboard featuring real-time 3D point cloud mapping and video feed monitoring.

## 🚀 Features

- **3D Map View**: Interactive 3D point cloud visualization with robot tracking
- **Camera View**: Live video feed from warehouse camera
- **Picture-in-Picture**: Seamless switching between map and camera views
- **Manual Control**: D-pad controls for manual robot operation (WASD + Arrow keys)
- **Emergency Stop**: Safety control with visual feedback
- **Status Monitoring**: Real-time system status indicators
- **Responsive Design**: Clean, modern UI with smooth animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Setup Instructions

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/VedantJamodkar/insight-dashboard.git
   cd insight-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The dashboard should load immediately

## 📁 Project Structure

```
insight-dashboard/
├── public/
│   └── assets/
│       ├── map.pcd              # Point cloud data file
│       └── warehouse-cam.mp4    # Camera feed video
├── src/
│   ├── components/
│   │   ├── CameraCanvas.jsx     # Camera view component
│   │   ├── CameraThumbnail.jsx  # PiP thumbnail
│   │   ├── DPad.jsx             # Manual control pad
│   │   ├── EmergencyStop.jsx    # E-stop button
│   │   ├── MapCanvas.jsx        # 3D map view with Three.js
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   └── TopBar.jsx           # Status bar
│   ├── App.jsx                  # Main application
│   ├── App.css                  # App-specific styles
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Implementation Details

### Technology Stack
- **Framework**: React 18.3.1
- **3D Rendering**: Three.js + React Three Fiber
- **Build Tool**: Vite
- **Styling**: CSS-in-JS (inline styles)

### Key Components

#### 1. MapCanvas
- Loads and renders `.pcd` point cloud files
- Animated robot marker with collision detection
- Interactive camera controls (OrbitControls)
- Grid floor and restricted zones visualization
- Fallback synthetic point cloud if file fails to load

#### 2. CameraCanvas
- Video playback with HTML5 video element
- Vignette effect for cinematic look
- Smooth transitions between views

#### 3. TopBar
- Real-time status indicators (HAAS, Stormy, Failsafe, System)
- Mode switching (Auto/Manual)
- View toggle (Map/Camera)
- Signal strength visualization

#### 4. DPad
- Manual robot control interface
- Keyboard support (WASD + Arrow keys)
- Touch-friendly for mobile devices
- Disabled state when in Auto mode or E-stop active

#### 5. EmergencyStop
- Visual feedback with color changes
- Animated icon when active
- Disables all manual controls when triggered

### Design Decisions

1. **Modular Component Architecture**: Each UI element is a separate, reusable component
2. **State Management**: React hooks for local state management (useState, useEffect, useRef)
3. **Performance**: Canvas-based rendering for smooth animations
4. **Accessibility**: Keyboard controls, visual feedback, and clear status indicators
5. **Responsive**: Flexible layout that adapts to different screen sizes

## 🎮 Usage

### Controls
- **View Toggle**: Click "Main View" button or camera thumbnail
- **Mode Switch**: Toggle between AUTO and MANUAL modes
- **Manual Control**: 
  - Use D-pad buttons or
  - Keyboard: W/A/S/D or Arrow keys
- **Emergency Stop**: Click the red/yellow button
- **3D Map**: Click and drag to rotate, scroll to zoom

### Status Indicators
- **Green dot**: System operational
- **HAAS**: Connection status
- **Stormy**: Signal strength
- **Failsafe**: Safety system status
- **System**: Overall system health

## 🔧 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

## 📦 Dependencies

### Core
- `react` & `react-dom`: UI framework
- `three`: 3D graphics library
- `@react-three/fiber`: React renderer for Three.js
- `@react-three/drei`: Useful helpers for R3F

### Dev
- `vite`: Fast build tool
- `@vitejs/plugin-react`: React support for Vite

## 🎨 Design Fidelity

The implementation closely matches the reference design:
- ✅ Sidebar navigation with ERIC branding
- ✅ Top status bar with indicators
- ✅ 3D map view with point cloud
- ✅ Camera feed view
- ✅ Picture-in-picture thumbnail
- ✅ Emergency stop button
- ✅ D-pad controls
- ✅ Smooth transitions and animations
- ✅ Responsive layout

## 🚧 Future Enhancements

- ROS integration via `roslibjs` for live data
- WebSocket support for real-time updates
- Multiple camera feeds
- Path planning visualization
- Historical data playback
- User authentication
- Settings panel

## 📝 Notes

- The point cloud file (`map.pcd`) should be placed in `public/assets/`
- Video file (`warehouse-cam.mp4`) should be in `public/assets/`
- All assets are loaded from the public directory
- No internet connection required after initial setup

## 👨‍💻 Development

The codebase follows React best practices:
- Functional components with hooks
- Clear component separation
- Inline documentation
- Consistent naming conventions
- Performance optimizations (useRef, useCallback)

## 📄 License

This project is part of the ERIC Robotics assignment.

---

**Built with ❤️ for ERIC Robotics**
