'use client'

import { motion } from 'framer-motion'

interface KPIBadgeProps {
  completion: number
  size?: 'sm' | 'md' | 'lg'
}

export function KPIBadge({ completion, size = 'md' }: KPIBadgeProps) {
  const getBadge = () => {
    if (completion === 100) {
      return { 
        color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        textColor: 'text-yellow-900',
        metal: 'GOLD', 
        emoji: '🏆',
        glow: 'shadow-lg shadow-yellow-500/50'
      }
    }
    if (completion >= 50) {
      return { 
        color: 'bg-gradient-to-r from-gray-300 to-gray-500',
        textColor: 'text-gray-900',
        metal: 'SILVER', 
        emoji: '🥈',
        glow: 'shadow-lg shadow-gray-400/50'
      }
    }
    if (completion > 0) {
      return { 
        color: 'bg-gradient-to-r from-amber-600 to-amber-800',
        textColor: 'text-amber-100',
        metal: 'BRONZE', 
        emoji: '🥉',
        glow: 'shadow-lg shadow-amber-600/50'
      }
    }
    return { 
      color: 'bg-gradient-to-r from-slate-600 to-slate-700',
      textColor: 'text-slate-300',
      metal: 'NONE', 
      emoji: '❌',
      glow: 'shadow-md shadow-slate-700/50'
    }
  }

  const badge = getBadge()
  
  const sizes = {
    sm: {
      container: 'px-2 py-1',
      emoji: 'text-sm',
      text: 'text-xs',
      percent: 'text-xs'
    },
    md: {
      container: 'px-3 py-1.5',
      emoji: 'text-base',
      text: 'text-sm',
      percent: 'text-sm'
    },
    lg: {
      container: 'px-4 py-2',
      emoji: 'text-lg',
      text: 'text-base',
      percent: 'text-base'
    }
  }

  const sizeClasses = sizes[size]

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`${badge.color} ${badge.glow} ${sizeClasses.container} rounded-full inline-flex items-center gap-2 font-bold transition-all`}
    >
      <span className={sizeClasses.emoji}>{badge.emoji}</span>
      <span className={`${badge.textColor} ${sizeClasses.text} font-black tracking-wide`}>
        {badge.metal}
      </span>
      <span className={`${badge.textColor} ${sizeClasses.percent} opacity-90`}>
        {completion}%
      </span>
    </motion.div>
  )
}
