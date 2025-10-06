'use client'

import { Award, Calendar, CheckCircle, Download, Share2, Eye } from 'lucide-react'
import { useState } from 'react'
import { Certificate } from '@/types/certificate'

interface CertificateCardProps {
  certificate: Certificate
  onView: (cert: Certificate) => void
  onDownload: (cert: Certificate) => void
  onShare: (cert: Certificate) => void
}

export function CertificateCard({ certificate, onView, onDownload, onShare }: CertificateCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    expired: 'bg-gray-100 text-gray-800',
    revoked: 'bg-red-100 text-red-800'
  }

  const statusIcons = {
    active: <CheckCircle className="w-4 h-4" />,
    expired: <Calendar className="w-4 h-4" />,
    revoked: <Award className="w-4 h-4 opacity-50" />
  }

  return (
    <div
      className="bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Certificate Header with Badge */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-8">
          <div className="absolute inset-0 bg-white opacity-10 rounded-full"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Award className="w-8 h-8" />
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${statusColors[certificate.status]}`}>
              {statusIcons[certificate.status]}
              <span className="capitalize">{certificate.status}</span>
            </span>
          </div>
          <h3 className="text-xl font-bold mb-1">{certificate.name}</h3>
          <p className="text-blue-100 text-sm">{certificate.moduleName}</p>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Issued Date</p>
            <p className="font-semibold text-gray-900">
              {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          {certificate.expiryDate && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Expires</p>
              <p className="font-semibold text-gray-900">
                {new Date(certificate.expiryDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-600 mb-1">Score</p>
            <p className="font-semibold text-gray-900">{certificate.score}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Verification</p>
            <p className="font-mono text-xs text-gray-700">{certificate.verificationCode}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex items-center space-x-2 pt-4 border-t border-gray-200 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}>
          <button
            onClick={() => onView(certificate)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button
            onClick={() => onDownload(certificate)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onShare(certificate)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            title="Share Certificate"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
