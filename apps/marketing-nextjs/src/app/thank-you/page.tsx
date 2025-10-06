import { CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-900 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8 py-20">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
            <CheckCircle className="relative text-green-500" size={100} strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Thank You for Your Interest!
          </h1>
          <p className="text-xl text-gray-400">
            Your demo request has been received successfully.
          </p>
        </div>

        {/* Details */}
        <div className="bg-dark-800/50 border border-brand-200/20 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-brand-100">What happens next?</h2>
          <ul className="space-y-3 text-left text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-brand-200 mt-1">✓</span>
              <span>Our team will review your request within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-200 mt-1">✓</span>
              <span>We'll contact you to schedule a personalized demo</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-200 mt-1">✓</span>
              <span>You'll see CyberSim Pro in action tailored to your needs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-200 mt-1">✓</span>
              <span>Get answers to all your questions from our security experts</span>
            </li>
          </ul>
        </div>

        {/* Additional Info */}
        <div className="text-gray-400">
          <p>Check your inbox for a confirmation email.</p>
          <p className="text-sm mt-2">
            Didn't receive an email? Check your spam folder or contact us at{' '}
            <a href="mailto:demo@cybersimpro.com" className="text-brand-200 hover:underline">
              demo@cybersimpro.com
            </a>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-200 hover:bg-brand-100 text-dark-900 px-8 py-3 rounded-full font-semibold transition-all"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <Link
            href="/#features"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-brand-200/30 hover:border-brand-200 text-brand-100 px-8 py-3 rounded-full font-semibold transition-all"
          >
            Learn More
          </Link>
        </div>

        {/* Social Proof */}
        <div className="pt-12 space-y-4">
          <p className="text-sm text-gray-500">In the meantime, see what others are saying:</p>
          <div className="flex justify-center gap-8 text-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-100">500+</div>
              <div className="text-sm">Companies Trust Us</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-100">4.9/5</div>
              <div className="text-sm">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-100">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
