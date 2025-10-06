'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Lock, Zap, X } from 'lucide-react'
import Link from 'next/link'
import AnimatedNetwork from './AnimatedNetwork'
import { DemoBookingForm } from './DemoBookingForm'

export default function HeroSection() {
  const [showDemoModal, setShowDemoModal] = useState(false)
  const floatingIcons = [
    { icon: Shield, position: 'left-[10%] top-[20%]', delay: 0 },
    { icon: Lock, position: 'left-[15%] top-[60%]', delay: 0.2 },
    { icon: Zap, position: 'right-[12%] top-[30%]', delay: 0.4 },
    { icon: Shield, position: 'right-[18%] top-[65%]', delay: 0.6 },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark-800 via-dark-900 to-black pt-20">
      {/* Animated Network Visualization */}
      <AnimatedNetwork />
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={index}
            className={`absolute ${item.position} text-brand-200/30`}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          >
            <Icon size={48} />
          </motion.div>
        )
      })}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-200/10 border border-brand-200/20 rounded-full px-4 py-2 text-sm text-brand-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-200"></span>
            </span>
            Trusted by leading security teams worldwide
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white max-w-5xl mx-auto leading-tight"
          >
            Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-100 via-brand-200 to-brand-300 glow-text">adversary emulation</span> training platform
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            MCP-powered simulation engine for realistic cyberattack scenarios, incident response training, and purple team exercises. MITRE ATT&CK mapped.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => setShowDemoModal(true)}
                className="group inline-flex items-center gap-2 bg-brand-200 hover:bg-brand-100 text-dark-900 px-8 py-4 rounded-full text-lg font-semibold transition-all glow-effect"
              >
                Book a Demo
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-brand-200/30 hover:border-brand-200 text-brand-100 px-8 py-4 rounded-full text-lg font-semibold transition-all"
              >
                View Pricing
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12"
          >
            {[
              { value: '6', label: 'MCP Simulation Tools' },
              { value: '100+', label: 'Attack Scenarios' },
              { value: 'MITRE', label: 'ATT&CK Mapped' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-brand-100">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-400 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-brand-200/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-brand-200 rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Demo Booking Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} className="text-gray-500" />
            </button>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Book a Demo</h2>
            <p className="text-gray-600 mb-6">
              See CyberSim Pro in action. We'll contact you within 24 hours.
            </p>
            
            <DemoBookingForm onClose={() => setShowDemoModal(false)} />
          </motion.div>
        </div>
      )}
    </section>
  )
}
