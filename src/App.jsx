import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import TimerPage from './components/TimerPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timer/:type" element={<TimerPage />} />
      </Routes>
    </Router>
  )
}

export default App
