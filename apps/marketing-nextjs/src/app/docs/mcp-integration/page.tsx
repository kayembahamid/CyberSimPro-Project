'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Code, Terminal, CheckCircle, ArrowRight } from 'lucide-react';

export default function MCPIntegrationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-4">
                MCP Integration Guide
              </h1>
              <p className="text-xl text-blue-100">
                Complete guide for integrating Model Context Protocol with CyberSim Pro
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <p className="text-gray-600 mb-6">
                CyberSim Pro now includes full Model Context Protocol (MCP) integration, providing advanced cybersecurity 
                simulations, real-time threat analysis, and comprehensive forensics capabilities.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Key Features</h3>
              <ul className="space-y-2 mb-8">
                {[
                  '10 RESTful API endpoints for comprehensive control',
                  'Real-time network traffic analysis',
                  'Advanced threat simulation capabilities',
                  'Digital forensics and incident response tools',
                  'Automated security control generation',
                  'Comprehensive reporting and metrics'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Quick Start</h3>
              
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-mono text-sm">Terminal</span>
                </div>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                  {`# 1. Build MCP Server
cd packages/mcp-server
npm run build

# 2. Start API Server (Port 3003)
cd apps/api
npm run dev

# 3. Test Health Endpoint
curl http://localhost:3003/api/mcp/health`}
                </pre>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">API Endpoints</h3>
              
              <div className="space-y-4 mb-8">
                {[
                  { method: 'POST', path: '/api/mcp/scenarios', desc: 'Create security scenarios' },
                  { method: 'POST', path: '/api/mcp/attacks', desc: 'Simulate cyberattacks' },
                  { method: 'POST', path: '/api/mcp/network-analysis', desc: 'Analyze network traffic' },
                  { method: 'POST', path: '/api/mcp/incidents/:id/investigate', desc: 'Investigate incidents' },
                  { method: 'POST', path: '/api/mcp/forensics', desc: 'Perform forensics analysis' },
                  { method: 'POST', path: '/api/mcp/reports', desc: 'Generate reports' },
                  { method: 'GET', path: '/api/mcp/metrics', desc: 'Get exercise metrics' },
                  { method: 'GET', path: '/api/mcp/controls', desc: 'Export security controls' },
                  { method: 'POST', path: '/api/mcp/simulations/:id/stop', desc: 'Stop simulations' },
                  { method: 'GET', path: '/api/mcp/health', desc: 'Health check' },
                ].map((endpoint, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-mono ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-gray-700">{endpoint.path}</code>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{endpoint.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Example Usage</h3>
              
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                  {`// Create a security scenario
const response = await mcpService.createScenario({
  type: 'phishing',
  difficulty: 'intermediate',
  environment: 'corporate',
  sector: 'finance'
});

// Simulate an attack
const attack = await mcpService.simulateAttack({
  attack_type: 'spear_phishing',
  target: 'corporate-network',
  intensity: 'medium'
});

// Analyze network traffic
const analysis = await mcpService.analyzeNetwork({
  network_segment: 'prod-dmz',
  duration: 15,
  focus: ['anomalies', 'vulnerabilities']
});`}
                </pre>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Next Steps</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="/resources" className="block p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 transition">
                  <h4 className="font-semibold text-blue-600 mb-2">View All Resources</h4>
                  <p className="text-sm text-gray-600">Access documentation, PDFs, and guides</p>
                </a>
                <a href="/contact" className="block p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 transition">
                  <h4 className="font-semibold text-purple-600 mb-2">Get Support</h4>
                  <p className="text-sm text-gray-600">Contact our team for implementation help</p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
