import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const CircularProgress = ({ progress, size = 200, strokeWidth = 15 }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        className="stroke-gray-200"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="progress-ring__circle"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset
        }}
      />
    </svg>
  )
}

const TimerPage = () => {
  const { type } = useParams()
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)
  const audioRef = useRef(null)
  
  const eggTypes = {
    'soft-boiled': {
      id: 'soft-boiled',
      name: 'Soft Boiled',
      time: 180,
      description: 'Runny yolk, soft white',
      icon: '🥚',
      tips: ['Room temperature eggs', 'Fresh eggs work best', 'Plunge in ice water after cooking']
    },
    'medium-boiled': {
      id: 'medium-boiled',
      name: 'Medium Boiled',
      time: 300,
      description: 'Jammy yolk, firm white',
      icon: '🍳',
      tips: ['Don\'t overcrowd the pot', 'Use a timer', 'Gentle simmer, not rolling boil']
    },
    'hard-boiled': {
      id: 'hard-boiled',
      name: 'Hard Boiled',
      time: 420,
      description: 'Fully cooked yolk and white',
      icon: '🥚',
      tips: ['Older eggs peel easier', 'Add vinegar to water', 'Don\'t skip the ice bath']
    },
    'poached': {
      id: 'poached',
      name: 'Poached',
      time: 180,
      description: 'Perfect for breakfast',
      icon: '🍳',
      tips: ['Fresh eggs only', 'Create a water vortex', 'Add a splash of vinegar']
    }
  }
  
  const eggType = eggTypes[type]
  
  useEffect(() => {
    if (!eggType) {
      navigate('/')
      return
    }
    setTimeLeft(eggType.time)
    setIsRunning(false)
    setIsComplete(false)
    audioRef.current = new Audio('/timer-complete.mp3')
  }, [eggType, navigate])
  
  useEffect(() => {
    let timer
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1
          if (newTime <= 0) {
            setIsRunning(false)
            setIsComplete(true)
            audioRef.current?.play()
            return 0
          }
          return newTime
        })
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (isRunning) {
      const tipInterval = setInterval(() => {
        setCurrentTip(prev => (prev + 1) % eggType.tips.length)
      }, 5000)
      return () => clearInterval(tipInterval)
    }
  }, [isRunning, eggType.tips.length])
  
  if (!eggType) return null
  
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((eggType.time - timeLeft) / eggType.time) * 100
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg"
      >
        <div className="pixel-border p-8 bg-white">
          <div className="window-controls">
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <Link 
                to="/"
                className="pixel-button text-sm"
              >
                ← Back
              </Link>
              <h2 className="pixel-font text-xl">{eggType.name}</h2>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <CircularProgress progress={progress} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="timer-display text-4xl mb-2">
                      {minutes}:{seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {isRunning ? 'Cooking in progress...' : 'Ready to cook'}
                    </div>
                  </div>
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                {isComplete ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="text-center space-y-4"
                  >
                    <div className="pixel-font text-2xl mb-4">Your egg is ready! 🎉</div>
                    <button
                      onClick={() => {
                        setTimeLeft(eggType.time)
                        setIsComplete(false)
                      }}
                      className="pixel-button"
                    >
                      Cook Another Egg
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-6 w-full">
                    <button
                      onClick={() => setIsRunning(!isRunning)}
                      className="pixel-button w-full"
                    >
                      {isRunning ? 'Pause Timer' : 'Start Timer'}
                    </button>
                    
                    {isRunning && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pixel-border p-4"
                      >
                        <div className="pixel-font text-sm mb-2">Cooking Tip:</div>
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={currentTip}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-sm text-gray-600"
                          >
                            {eggType.tips[currentTip]}
                          </motion.p>
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TimerPage
