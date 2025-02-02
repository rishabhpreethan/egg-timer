import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import Confetti from 'react-confetti'
import toast, { Toaster } from 'react-hot-toast'

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding-top: 8rem;
  padding-bottom: 3rem;
  background: #fef9e7;
`

const MainContent = styled.div`
  max-width: 32rem;
  margin: 0 auto;
  padding: 0 1rem;
`

const Window = styled.div`
  position: relative;
  background: white;
  padding: 4px;
  margin-bottom: 2rem;
  box-shadow: 
    /* Outer white border */
    -4px -4px 0 2px #ffffff,
    4px 4px 0 2px #ffffff,
    -4px 4px 0 2px #ffffff,
    4px -4px 0 2px #ffffff,
    /* Inner black border */
    -6px -6px 0 2px #4a5568,
    6px 6px 0 2px #4a5568,
    -6px 6px 0 2px #4a5568,
    6px -6px 0 2px #4a5568;
`

const WindowControls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 6px;
  padding: 8px;
`

const WindowButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`

const Content = styled.div`
  padding: 1.5rem;
`

const BackButton = styled(Link)`
  font-family: 'Press Start 2P', cursive;
  padding: 12px 24px;
  background: #fbbf24;
  color: #7c2d12;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  text-transform: uppercase;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 2rem;
  box-shadow: 
    /* Light border */
    -2px -2px 0 1px #fde68a,
    2px 2px 0 1px #fde68a,
    -2px 2px 0 1px #fde68a,
    2px -2px 0 1px #fde68a,
    /* Dark border */
    -4px -4px 0 1px #f59e0b,
    4px 4px 0 1px #f59e0b,
    -4px 4px 0 1px #f59e0b,
    4px -4px 0 1px #f59e0b;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      /* Light border */
      -2px -2px 0 1px #fde68a,
      2px 2px 0 1px #fde68a,
      -2px 2px 0 1px #fde68a,
      2px -2px 0 1px #fde68a,
      /* Dark border */
      -4px -4px 0 1px #f59e0b,
      4px 4px 0 1px #f59e0b,
      -4px 4px 0 1px #f59e0b,
      4px -4px 0 1px #f59e0b,
      /* Bottom shadow */
      0 6px 0 0 #f59e0b;
  }
`

const TimerDisplay = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #4a5568;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  letter-spacing: 2px;
  background: #f7e9b9;
  padding: 16px;
  border-radius: 16px;
  display: inline-block;
  font-size: 2rem;
  margin-bottom: 2rem;
  box-shadow: 
    -2px -2px 0 2px #ffffff,
    -4px -4px 0 2px #4a5568,
    4px 4px 0 2px #4a5568,
    -4px 4px 0 2px #4a5568,
    4px -4px 0 2px #4a5568;

  @media (min-width: 640px) {
    font-size: 3rem;
    padding: 20px;
    letter-spacing: 4px;
  }
`

const Button = styled.button`
  font-family: 'Press Start 2P', cursive;
  padding: 12px 24px;
  background: #fbbf24;
  border: none;
  color: #7c2d12;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  border-radius: 8px;
  box-shadow: 
    /* Light border */
    -2px -2px 0 1px #fde68a,
    2px 2px 0 1px #fde68a,
    -2px 2px 0 1px #fde68a,
    2px -2px 0 1px #fde68a,
    /* Dark border */
    -4px -4px 0 1px #f59e0b,
    4px 4px 0 1px #f59e0b,
    -4px 4px 0 1px #f59e0b,
    4px -4px 0 1px #f59e0b;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      /* Light border */
      -2px -2px 0 1px #fde68a,
      2px 2px 0 1px #fde68a,
      -2px 2px 0 1px #fde68a,
      2px -2px 0 1px #fde68a,
      /* Dark border */
      -4px -4px 0 1px #f59e0b,
      4px 4px 0 1px #f59e0b,
      -4px 4px 0 1px #f59e0b,
      4px -4px 0 1px #f59e0b,
      /* Bottom shadow */
      0 6px 0 0 #f59e0b;
  }
`

const TipsSection = styled.div`
  margin-top: 3rem;
  text-align: left;
`

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const TipItem = styled(motion.li)`
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  line-height: 1.6;
  color: #4a5568;
`

const TimerPage = () => {
  const { eggType } = useParams()
  const [duration, setDuration] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const timerRef = useRef(null)
  const audioRef = useRef(new Audio('/sounds/timer-end.mp3'))

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

  // Initialize audio with user interaction
  const initializeAudio = () => {
    audioRef.current.volume = 0.7;
    audioRef.current.play().then(() => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioEnabled(true);
      console.log('Audio initialized successfully');
    }).catch(error => {
      console.log('Error initializing audio:', error);
    });
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setShowConfetti(true);
            // Play sound if enabled
            if (audioEnabled && audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(error => {
                console.log('Error playing sound:', error);
              });
            }
            toast.success(`Your ${currentEgg.name} egg is ready!`, {
              icon: currentEgg.icon,
              style: {
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '14px',
                padding: '16px',
                background: '#fef9e7',
                border: '4px solid #4a5568',
              },
              duration: 5000,
            });
            setTimeout(() => setShowConfetti(false), 5000);
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, timeLeft, currentEgg])

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
    <Container>
      {!audioEnabled && (
        <Button
          onClick={initializeAudio}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            fontSize: '0.875rem',
            padding: '8px 16px',
          }}
        >
          🔔 Enable Sound
        </Button>
      )}
      {showConfetti && <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
        gravity={0.3}
      />}
      <Toaster position="top-center" />
      <MainContent>
        <Window>
          <WindowControls>
            <WindowButton color="#ff5f57" />
            <WindowButton color="#ffbd2e" />
          </WindowControls>
          
          <Content>
            <BackButton to="/" style={{ fontSize: '12px' }}>
              ← Back to Eggs
            </BackButton>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{currentEgg.icon}</div>
              <h1 style={{ 
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '2rem',
                marginBottom: '1rem',
                color: '#4a5568'
              }}>
                {currentEgg.name}
              </h1>
              <p style={{ 
                color: '#4a5568',
                marginBottom: '2rem',
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                {currentEgg.description}
              </p>

              <TimerDisplay>
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </TimerDisplay>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Button onClick={toggleTimer}>
                  {isRunning ? 'Pause' : timeLeft === 0 ? 'Restart' : 'Start'}
                </Button>
                <Button onClick={resetTimer}>
                  Reset
                </Button>
              </div>

              <TipsSection>
                <h2 style={{ 
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '1.25rem',
                  marginBottom: '1rem',
                  color: '#4a5568'
                }}>
                  Pro Tips:
                </h2>
                <TipsList>
                  {currentEgg.tips.map((tip, index) => (
                    <TipItem
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <span style={{ fontSize: '1.5rem', marginRight: '0.75rem', color: '#f59e0b' }}>✦</span>
                      <span>{tip}</span>
                    </TipItem>
                  ))}
                </TipsList>
              </TipsSection>
            </motion.div>
          </Content>
        </Window>
      </MainContent>
    </Container>
  )
}

export default TimerPage
