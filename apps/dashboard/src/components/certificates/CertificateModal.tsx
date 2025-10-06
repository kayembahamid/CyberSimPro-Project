'use client'

import { X, Download, Share2, CheckCircle, Award } from 'lucide-react'
import { useEffect } from 'react'
import { Certificate } from '@/types/certificate'

interface CertificateModalProps {
  certificate: Certificate | null
  isOpen: boolean
  onClose: () => void
  onDownload: (cert: Certificate) => void
  onShare: (cert: Certificate) => void
}

export function CertificateModal({ certificate, isOpen, onClose, onDownload, onShare }: CertificateModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !certificate) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Display */}
        <div className="p-8 md:p-12">
          {/* Certificate Border */}
          <div className="border-8 border-double border-blue-600 p-8 md:p-12 bg-gradient-to-br from-white via-blue-50/30 to-white">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600 rounded-full">
                  <Award className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Certificate of Completion
              </h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>

            {/* Body */}
            <div className="text-center space-y-6 mb-8">
              <p className="text-lg text-gray-600">
                This is to certify that
              </p>
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                {certificate.recipientName}
              </p>
              <p className="text-lg text-gray-600">
                has successfully completed the training module
              </p>
              <p className="text-2xl md:text-3xl font-bold text-blue-600">
                {certificate.moduleName}
              </p>
              <div className="flex items-center justify-center space-x-8 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Score</p>
                  <p className="text-2xl font-bold text-blue-600">{certificate.score}%</p>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="text-lg font-semibold">
                    {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-gray-200 pt-6 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Issued By</p>
                  <p className="font-semibold text-gray-900">{certificate.organization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Verification Code</p>
                  <p className="font-mono text-sm text-gray-900">{certificate.verificationCode}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Verified & Authenticated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onShare(certificate)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors flex items-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            onClick={() => onDownload(certificate)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  )
}
