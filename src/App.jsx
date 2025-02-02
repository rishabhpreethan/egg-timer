import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import TimerPage from './components/TimerPage'

function App() {
  return (
    <Router basename="/egg-timer">
      <div className="bg-[#fef3c7] min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/timer/:eggType" element={<TimerPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
