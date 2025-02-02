import { motion } from 'framer-motion'
import SoftBoiledEgg from './eggs/SoftBoiledEgg'
import MediumBoiledEgg from './eggs/MediumBoiledEgg'
import HardBoiledEgg from './eggs/HardBoiledEgg'
import PoachedEgg from './eggs/PoachedEgg'

const HomePage = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="pixel-border mb-12 p-8 bg-white">
          <div className="window-controls">
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="pixel-font text-3xl mb-6">Perfect Egg Timer</h1>
            <p className="text-gray-600">Choose your egg style and let's get cooking!</p>
          </motion.div>
        </div>
        
        <div className="space-y-4">
          <SoftBoiledEgg />
          <MediumBoiledEgg />
          <HardBoiledEgg />
          <PoachedEgg />
        </div>
      </div>
    </div>
  )
}

export default HomePage
