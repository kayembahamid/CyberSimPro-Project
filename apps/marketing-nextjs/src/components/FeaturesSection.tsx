'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Lock, Target, TrendingUp, Users } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Create Realistic Scenarios',
      description: 'Generate training scenarios for phishing, ransomware, DDoS, APT, and insider threats. Multiple difficulty levels from beginner to expert.',
      gradient: 'from-brand-200 to-brand-300',
    },
    {
      icon: Zap,
      title: 'Simulate Cyberattacks',
      description: 'Execute multi-phase attack simulations mapped to MITRE ATT&CK framework. Includes reconnaissance, initial access, persistence, and exfiltration phases.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Target,
      title: 'Analyze Networks',
      description: 'Comprehensive network analysis tool detecting threats, vulnerabilities, misconfigurations, and anomalies in real-time.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Lock,
      title: 'Investigate Incidents',
      description: 'Conduct structured incident response investigations with timeline reconstruction, evidence collection, and impact assessment.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: TrendingUp,
      title: 'Forensics Analysis',
      description: 'Perform digital forensics with chain of custody tracking, artifact analysis, memory dumps, and disk forensics capabilities.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Users,
      title: 'Generate Reports',
      description: 'Auto-generate executive summaries and technical reports with MITRE ATT&CK mapping, compliance documentation, and remediation guidance.',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ]

  return (
    <section id="features" className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            6 Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-100 to-brand-300">MCP Tools</span> for Cybersecurity
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive simulation engine for attack scenarios, incident response, forensics, and purple team training
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-brand-200/10 rounded-2xl p-8 hover:border-brand-200/30 transition-all"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-100 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-200/0 to-brand-300/0 group-hover:from-brand-200/5 group-hover:to-brand-300/5 transition-all pointer-events-none" />
              </motion.div>
            )
          })}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-brand-300/20 via-brand-200/20 to-brand-300/20 rounded-2xl p-8 md:p-12 border border-brand-200/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Training That Actually Works
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: '100+', label: 'Attack scenarios' },
              { value: 'APT29', label: 'Elite adversary groups' },
              { value: '24/7', label: 'Simulation availability' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-100 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
