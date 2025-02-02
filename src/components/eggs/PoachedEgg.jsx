import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const PoachedEgg = () => {
  const eggData = {
    id: 'poached',
    name: 'Poached',
    time: 180,
    description: 'Perfect for breakfast',
    icon: '🥚',
    tips: []
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
          <ul className="tips-list">
            {eggData.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.div>
  )
}

export default PoachedEgg
