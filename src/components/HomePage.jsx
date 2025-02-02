import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import SoftBoiledEgg from './eggs/SoftBoiledEgg'
import MediumBoiledEgg from './eggs/MediumBoiledEgg'
import HardBoiledEgg from './eggs/HardBoiledEgg'
import PoachedEgg from './eggs/PoachedEgg'

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
  background: #fef9e7;
  
  @media (min-width: 640px) {
    padding-top: 8rem;
    padding-bottom: 3rem;
  }
`

const MainContent = styled.div`
  max-width: 32rem;
  margin: 0 auto;
  padding: 0 1rem;
`

const Window = styled.div`
  position: relative;
  background: white;
  padding: 1.5rem;
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

const Title = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4a5568;
  
  @media (min-width: 640px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.875rem;
  color: #718096;
  line-height: 1.6;
`

const EggGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const HomePage = () => {
  return (
    <Container>
      <MainContent>
        <Window>
          <WindowControls>
            <WindowButton color="#ff5f57" />
            <WindowButton color="#ffbd2e" />
          </WindowControls>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center' }}
          >
            <Title>Perfect Egg Timer</Title>
            <Subtitle>Choose your egg style and let's get cooking!</Subtitle>
          </motion.div>
        </Window>
        
        <EggGrid>
          <SoftBoiledEgg />
          <MediumBoiledEgg />
          <HardBoiledEgg />
          <PoachedEgg />
        </EggGrid>
      </MainContent>
    </Container>
  )
}

export default HomePage
