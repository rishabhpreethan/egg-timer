import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const HardBoiledEgg = () => {
  const eggData = {
    id: 'hard-boiled',
    name: 'Hard Boiled',
    time: 420,
    description: 'Fully cooked yolk and white',
    icon: '🥚',
    tips: ['Older eggs peel easier', 'Add vinegar to water', 'Don\'t skip the ice bath']
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="egg-card"
    >
      <Link to={`/timer/${eggData.id}?duration=${eggData.time}`} className="block">
        <div className="text-center">
          <div className="text-4xl mb-4">{eggData.icon}</div>
          <h3 className="pixel-font text-lg mb-2">{eggData.name}</h3>
          <p className="mb-4">{eggData.description}</p>
          <div className="time-badge inline-block">
            {Math.floor(eggData.time / 60)}:{(eggData.time % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default HardBoiledEgg