'use client'

import { Share2, Linkedin, Twitter, Mail, Link as LinkIcon, Check } from 'lucide-react'
import { useState } from 'react'
import { Certificate } from '@/types/certificate'

interface ShareButtonProps {
  certificate: Certificate
  onClose?: () => void
}

export function ShareButton({ certificate, onClose }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const verificationUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/verify/${certificate.verificationCode}`

  const shareText = `I just completed ${certificate.moduleName} and earned a certificate! 🎓`

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verificationUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(verificationUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(`Certificate: ${certificate.name}`)}&body=${encodeURIComponent(`${shareText}\n\nVerify at: ${verificationUrl}`)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(verificationUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = (platform: 'linkedin' | 'twitter' | 'email') => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
    setIsOpen(false)
    onClose?.()
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setIsOpen(false)}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Share Certificate</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            ×
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Share your achievement on social media or copy the verification link
        </p>

        <div className="space-y-3">
          {/* LinkedIn */}
          <button
            onClick={() => handleShare('linkedin')}
            className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-blue-600 rounded">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Share on LinkedIn</p>
              <p className="text-sm text-gray-600">Add to your profile</p>
            </div>
          </button>

          {/* Twitter */}
          <button
            onClick={() => handleShare('twitter')}
            className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-sky-500 rounded">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Share on Twitter</p>
              <p className="text-sm text-gray-600">Tweet your achievement</p>
            </div>
          </button>

          {/* Email */}
          <button
            onClick={() => handleShare('email')}
            className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-gray-600 rounded">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Share via Email</p>
              <p className="text-sm text-gray-600">Send to colleagues</p>
            </div>
          </button>

          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded ${copied ? 'bg-green-600' : 'bg-gray-400'}`}>
              {copied ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <LinkIcon className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">
                {copied ? 'Link Copied!' : 'Copy Verification Link'}
              </p>
              <p className="text-sm text-gray-600 truncate">{verificationUrl}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
