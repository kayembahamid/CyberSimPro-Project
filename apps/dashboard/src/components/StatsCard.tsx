'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card } from './ui/card'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: number
  trendLabel?: string
  gradient?: string
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendLabel = 'vs last month',
  gradient = 'from-purple-600 to-blue-600'
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} blur-xl`} />
        </div>
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <motion.p 
              className="text-4xl font-bold text-white"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {value}
            </motion.p>
            
            {trend !== undefined && (
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center text-sm font-semibold ${
                  trend > 0 ? 'text-green-400' : trend < 0 ? 'text-red-400' : 'text-slate-400'
                }`}>
                  {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend)}%
                </span>
                <span className="text-xs text-slate-500">{trendLabel}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </Card>
    </motion.div>
  )
}
