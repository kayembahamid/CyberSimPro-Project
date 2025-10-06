'use client'

import Link from 'next/link'

export function TrainingShowcase() {
  const modules = [
    {
      title: 'Phishing Detective',
      icon: '🕵️',
      time: '5 MIN',
      description: 'Track down phishing attempts and protect against email scams',
      color: 'border-green-500 hover:bg-green-50'
    },
    {
      title: 'Password Guardian',
      icon: '🛡️',
      time: '5 MIN',
      description: 'Defend with strong passwords and security best practices',
      color: 'border-blue-500 hover:bg-blue-50'
    },
    {
      title: 'Malware Defender',
      icon: '🦠',
      time: '5 MIN',
      description: 'Stop malware infections before they compromise your system',
      color: 'border-red-500 hover:bg-red-50'
    },
    {
      title: 'Social Engineering',
      icon: '🎭',
      time: '5 MIN',
      description: 'Spot manipulation tactics used by cybercriminals',
      color: 'border-purple-500 hover:bg-purple-50'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Interactive Cybersecurity Training
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gamified 5-minute modules that employees actually enjoy. 
            Learn real cybersecurity skills through engaging scenarios.
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {modules.map((module) => (
            <div 
              key={module.title} 
              className={`bg-white rounded-lg p-6 border-2 ${module.color} transition shadow-sm hover:shadow-md`}
            >
              {/* Icon */}
              <div className="text-6xl mb-4 text-center">{module.icon}</div>
              
              {/* Time Badge */}
              <div className="text-center mb-3">
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-semibold text-gray-700">
                  {module.time}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                {module.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 text-center">
                {module.description}
              </p>
              
              {/* Try Free Button */}
              <Link 
                href="/signup?plan=trial"
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Try Free
              </Link>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quick & Effective</h3>
            <p className="text-gray-600">
              Each module takes just 5 minutes. Complete all 4 in under 30 minutes.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Gamified Learning</h3>
            <p className="text-gray-600">
              Story-based scenarios with points, badges, and real-time feedback.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Admins see who's completed training with Gold, Silver, Bronze badges.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Train Your Team?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Start protecting your organization from cyber threats today
          </p>
          
          {/* Pricing Options */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
            <div className="flex-1 max-w-xs">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">FREE</div>
                <div className="text-gray-700 mb-4">For Companies</div>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Unlimited employees</li>
                  <li>✓ All 4 training modules</li>
                  <li>✓ Admin dashboard</li>
                  <li>✓ Progress tracking</li>
                  <li>✓ Export reports</li>
                </ul>
                <Link 
                  href="/signup?plan=company"
                  className="block w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Start Company Trial
                </Link>
              </div>
            </div>

            <div className="flex-1 max-w-xs">
              <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">$29/mo</div>
                <div className="text-gray-700 mb-4">For Individuals</div>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Personal training</li>
                  <li>✓ All 4 modules</li>
                  <li>✓ Completion certificates</li>
                  <li>✓ Progress tracking</li>
                  <li>✓ Shareable badges</li>
                </ul>
                <Link 
                  href="/signup?plan=individual"
                  className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Individual Access
                </Link>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="border-t pt-6">
            <p className="text-gray-500 text-sm mb-4">Trusted by companies worldwide</p>
            <div className="flex justify-center items-center gap-8 text-gray-400">
              <div className="text-2xl font-bold">500+</div>
              <div className="border-l h-8"></div>
              <div className="text-2xl font-bold">10K+</div>
              <div className="border-l h-8"></div>
              <div className="text-2xl font-bold">98%</div>
            </div>
            <div className="flex justify-center items-center gap-8 text-xs text-gray-500 mt-2">
              <div>Companies</div>
              <div className="opacity-0">|</div>
              <div>Employees Trained</div>
              <div className="opacity-0">|</div>
              <div>Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            🛡️ Protect your organization from cyber threats • ⚡ Get started in 2 minutes • 📊 See results immediately
          </p>
          <Link 
            href="/signup"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            Start Free Trial →
          </Link>
        </div>
      </div>
    </section>
  )
}
