import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const TimerPage = () => {
  const { eggType } = useParams()
  const [duration, setDuration] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)

  const eggTypes = {
    'soft-boiled': {
      name: 'Soft Boiled',
      time: 180,
      description: 'Runny yolk, soft white',
      icon: '🥚',
      tips: ['Room temperature eggs', 'Fresh eggs work best', 'Plunge in ice water after cooking']
    },
    'medium-boiled': {
      name: 'Medium Boiled',
      time: 300,
      description: 'Jammy yolk, firm white',
      icon: '🍳',
      tips: ['Don\'t overcrowd the pot', 'Use a timer', 'Gentle simmer, not rolling boil']
    },
    'hard-boiled': {
      name: 'Hard Boiled',
      time: 420,
      description: 'Fully cooked yolk and white',
      icon: '🥚',
      tips: ['Older eggs peel easier', 'Add vinegar to water', 'Don\'t skip the ice bath']
    },
    'poached': {
      name: 'Poached',
      time: 180,
      description: 'Perfect for breakfast',
      icon: '🍳',
      tips: ['Fresh eggs only', 'Create a water vortex', 'Add a splash of vinegar']
    }
  }

  const currentEgg = eggTypes[eggType]

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlDuration = parseInt(searchParams.get('duration')) || 0;
    setDuration(urlDuration);
    setTimeLeft(urlDuration);
  }, [eggType])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, timeLeft])

  const toggleTimer = () => {
    console.log('Toggle timer. Current state:', isRunning)
    if (timeLeft === 0) {
      console.log('Resetting time to:', duration)
      setTimeLeft(duration)
    }
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    console.log('Resetting timer')
    setIsRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setTimeLeft(duration)
  }

  if (!currentEgg) {
    return <div>Egg type not found</div>
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="max-w-2xl mx-auto main-content">
        <div className="pixel-border mb-8 p-6 bg-white">
          <div className="window-controls">
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
          </div>
          
          <Link to="/" className="pixel-button inline-block mb-8 text-sm">
            ← Back to Eggs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">{currentEgg.icon}</div>
            <h1 className="pixel-font text-3xl mb-4">{currentEgg.name}</h1>
            <p className="text-gray-600 mb-8">{currentEgg.description}</p>

            <div className="timer-display text-6xl mb-8">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <button 
                onClick={toggleTimer}
                className="pixel-button"
              >
                {isRunning ? 'Pause' : timeLeft === 0 ? 'Restart' : 'Start'}
              </button>
              <button 
                onClick={resetTimer}
                className="pixel-button"
              >
                Reset
              </button>
            </div>

            <div className="tips-section mt-12 text-left">
              <h2 className="pixel-font text-xl mb-4">Pro Tips:</h2>
              <ul className="list-none p-0">
                {currentEgg.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="mb-3 flex items-center"
                  >
                    <span className="text-2xl mr-3">✦</span>
                    <span className="text-gray-700">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TimerPage
