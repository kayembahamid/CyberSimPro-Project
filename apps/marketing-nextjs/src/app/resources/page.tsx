'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FileText, Download, BookOpen, Shield, Users } from 'lucide-react';

export default function ResourcesPage() {
  const documentation = [
    {
      title: 'MCP Setup Guide',
      description: 'Complete guide for setting up and configuring the Model Context Protocol server',
      icon: BookOpen,
      link: '/docs/mcp-setup',
    },
    {
      title: 'Architecture & Policy Docs',
      description: 'Technical architecture documentation and security policies',
      icon: Shield,
      link: '/docs/architecture',
    },
    {
      title: 'Compliance Roadmap',
      description: 'Regulatory compliance requirements and implementation timeline',
      icon: FileText,
      link: '/docs/compliance',
    },
  ];

  const downloads = [
    {
      title: 'Compliance Matrix',
      description: 'Comprehensive compliance framework mapping (PDF)',
      size: '2.4 MB',
      file: '/assets/docs/cybersim-compliance-matrix.pdf',
    },
    {
      title: 'Pricing Sheet',
      description: 'Detailed pricing tiers and enterprise options (PDF)',
      size: '1.1 MB',
      file: '/assets/docs/cybersim-pricing-sheet.pdf',
    },
    {
      title: 'Product One-Pager',
      description: 'Executive summary and key features overview (PDF)',
      size: '850 KB',
      file: '/assets/docs/cybersim-product-onepager.pdf',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Resources for Your Evaluation
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Share these links with security leadership, compliance partners, and procurement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Documentation</h2>
              <p className="text-lg text-gray-600 mb-8">
                Comprehensive guides for implementation and management
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {documentation.map((doc, index) => (
                  <motion.a
                    key={index}
                    href={doc.link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <doc.icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600">
                      {doc.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Training Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Training Modules</h2>
              <p className="text-lg text-gray-600 mb-8">
                Interactive cybersecurity training courses and certifications
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Phishing Defense
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn to identify and respond to phishing attacks
                  </p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    Beginner • 2 hours
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Incident Response
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Master incident handling and response procedures
                  </p>
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                    Intermediate • 4 hours
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Threat Hunting
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Advanced techniques for proactive threat detection
                  </p>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                    Advanced • 6 hours
                  </span>
                </motion.div>
              </div>

              <div className="mt-8 text-center">
                <a 
                  href="/login" 
                  className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Start Training →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Downloads Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Downloads</h2>
              <p className="text-lg text-gray-600 mb-8">
                Download comprehensive documentation and resources
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {downloads.map((download, index) => (
                  <motion.a
                    key={index}
                    href={download.file}
                    download
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Download className="w-10 h-10 text-blue-600" />
                      <span className="text-sm text-gray-500">{download.size}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {download.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {download.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Custom Support Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need Something Custom?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Email <a href="mailto:support@cybersimpro.com" className="text-blue-600 hover:underline">support@cybersimpro.com</a> for security questionnaires, 
                DPA templates, or custom deployment advice.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <Users className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Community Forum
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Join the community for roadmap previews and peer templates
                  </p>
                  <a 
                    href="/community" 
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Join Forum
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <Shield className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Enterprise Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Dedicated support for enterprise deployments and custom integrations
                  </p>
                  <a 
                    href="/contact" 
                    className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Contact Sales
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MCP Integration Info */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white"
            >
              <h2 className="text-3xl font-bold mb-4">
                Model Context Protocol (MCP) Integration
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                CyberSim Pro now includes full MCP integration for advanced cybersecurity simulations and real-time analysis.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">✓ 10 API Endpoints</h3>
                  <p className="text-blue-100">Complete REST API for simulations, scenarios, and analysis</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">✓ Real-time Analysis</h3>
                  <p className="text-blue-100">Network traffic and threat analysis with instant results</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">✓ Forensics Tools</h3>
                  <p className="text-blue-100">Digital forensics and incident response capabilities</p>
                </div>
              </div>
              <div className="mt-8">
                <a 
                  href="/docs/mcp-integration" 
                  className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  View MCP Documentation →
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
