'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PricingSection() {
  const plans = [
    {
      name: 'Growth',
      description: 'Scenario library, essential reporting, email support',
      features: [
        'Up to 10 named analysts',
        'Core MCP integrations',
        'Weekly enablement office hours',
        'Standard scenario library',
        'Email support',
      ],
      highlighted: false,
    },
    {
      name: 'Enterprise',
      description: 'SSO/SCIM, audit seals, telemetry replay, dedicated TAM',
      features: [
        'Unlimited workspaces',
        'Premium data lake sync',
        'Quarterly executive briefings',
        'Enhanced purple/blue facilitation kit',
        'Dedicated account manager',
        'Priority support',
      ],
      highlighted: true,
    },
    {
      name: 'Regulated',
      description: 'On-prem or VPC, custom retention, regulator bundle automation',
      features: [
        'Hardened deployment runbooks',
        'Dedicated compliance concierge',
        'Signed regulator-ready reports',
        'Bespoke DPA + supply chain attestations',
        'Air-gapped deployment options',
        'Custom SLA agreements',
      ],
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-black via-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-200/10 via-transparent to-transparent" />
      
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
            Pricing & Packaging
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Pick the bundle that matches your operating model. Every plan starts with a guided pilot.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-brand-200/20 to-brand-300/10 border-2 border-brand-200/50 shadow-2xl scale-105'
                  : 'bg-dark-800/50 border border-brand-200/20'
              } backdrop-blur-sm`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-200 text-dark-900 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-3">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-200 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="#contact"
                    className={`group flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold transition-all ${
                      plan.highlighted
                        ? 'bg-brand-200 hover:bg-brand-100 text-dark-900'
                        : 'bg-brand-200/10 hover:bg-brand-200/20 text-brand-100 border border-brand-200/30'
                    }`}
                  >
                    Talk to Sales
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <Link
                  href="#contact"
                  className="block text-center text-sm text-gray-400 hover:text-brand-100 transition-colors"
                >
                  Start 30-day pilot
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {[
              {
                question: 'How do I purchase?',
                answer: 'Schedule a demo; we provision a pilot in your environment and finalize billing via Stripe or invoice after approval.',
              },
              {
                question: 'What integrations ship with each plan?',
                answer: 'Growth covers GitHub, GitLab, Jira, and ServiceNow. Enterprise unlocks SIEM/SOAR bridges plus telemetry replay.',
              },
              {
                question: 'Can I run CyberSim Pro in my own cloud?',
                answer: 'Yes. Enterprise offers dedicated VPC tenancy, while Regulated includes hardened runbooks for AWS, Azure, GovCloud, and optional air-gapped deployments.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-dark-800/50 border border-brand-200/10 rounded-xl p-6 group"
              >
                <summary className="cursor-pointer text-white font-semibold list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-brand-200 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
