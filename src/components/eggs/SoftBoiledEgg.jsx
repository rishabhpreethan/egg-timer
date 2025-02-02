import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SoftBoiledEgg = () => {
  const eggData = {
    id: 'soft-boiled',
    name: 'Soft Boiled',
    time: 180,
    description: 'Runny yolk, soft white',
    icon: '🥚',
    tips: ['Room temperature eggs', 'Fresh eggs work best', 'Plunge in ice water after cooking']
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="egg-card"
    >
      <Link to={`/timer/${eggData.id}`} className="block">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 flex items-center justify-center bg-amber-100 rounded-lg">
            <span className="text-4xl">{eggData.icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="pixel-font text-xl mb-2">{eggData.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{eggData.description}</p>
            <div className="flex items-center gap-2">
              <div className="bg-amber-100 px-3 py-1 rounded-lg text-sm font-medium text-amber-900">
                {Math.floor(eggData.time / 60)}:{(eggData.time % 60).toString().padStart(2, '0')}
              </div>
              <motion.div 
                whileHover={{ x: 4 }}
                className="ml-auto text-orange-900"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default SoftBoiledEgg
