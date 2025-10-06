'use client'

import { useState, useEffect } from 'react'
import { Award, TrendingUp, Calendar, Filter } from 'lucide-react'
import { CertificateCard } from '@/components/certificates/CertificateCard'
import { CertificateModal } from '@/components/certificates/CertificateModal'
import { ErrorMessage } from '@/components/error-message'
import { Certificate } from '@/types/certificate'

export default function CertificationsPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all')

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      setLoading(true)
      // Simulated data - replace with actual API call
      const mockCertificates: Certificate[] = [
        {
          id: '1',
          name: 'Phishing Detection Expert',
          moduleName: 'Phishing Detection 101',
          issueDate: new Date().toISOString(),
          score: 92,
          verificationCode: 'PHD-2024-A1B2C3',
          status: 'active',
          recipientName: 'John Doe',
          organization: 'CyberSim Pro'
        },
        {
          id: '2',
          name: 'Network Security Specialist',
          moduleName: 'Network Security Basics',
          issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          score: 88,
          verificationCode: 'NSB-2024-D4E5F6',
          status: 'active',
          recipientName: 'John Doe',
          organization: 'CyberSim Pro'
        },
        {
          id: '3',
          name: 'Password Security Pro',
          moduleName: 'Password Security Basics',
          issueDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          score: 95,
          verificationCode: 'PSB-2024-G7H8I9',
          status: 'active',
          recipientName: 'John Doe',
          organization: 'CyberSim Pro'
        }
      ]
      
      setCertificates(mockCertificates)
      setError(null)
    } catch (err) {
      setError('Failed to load certificates. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleView = (cert: Certificate) => {
    setSelectedCertificate(cert)
    setIsModalOpen(true)
  }

  const handleDownload = (cert: Certificate) => {
    // Simulate PDF download
    alert(`Downloading certificate: ${cert.name}\n\nIn production, this would generate and download a PDF.`)
  }

  const handleShare = (cert: Certificate) => {
    // Share functionality is handled by ShareButton component
    console.log('Share certificate:', cert.name)
  }

  const filteredCertificates = certificates.filter(cert => {
    if (filter === 'all') return true
    return cert.status === filter
  })

  const stats = {
    total: certificates.length,
    active: certificates.filter(c => c.status === 'active').length,
    avgScore: certificates.length > 0 
      ? Math.round(certificates.reduce((sum, c) => sum + c.score, 0) / certificates.length)
      : 0
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
        <ErrorMessage message={error} />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="mt-2 text-gray-600">
            View and share your earned certifications
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Certificates</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Certificates</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgScore}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-3">
        <Filter className="w-5 h-5 text-gray-500" />
        <div className="flex space-x-2">
          {(['all', 'active', 'expired'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filterOption === 'all' ? 'All' : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              {filterOption !== 'all' && (
                <span className="ml-2 text-xs">
                  ({certificates.filter(c => c.status === filterOption).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Certificates Grid */}
      {filteredCertificates.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No certificates yet
          </h3>
          <p className="text-gray-600 mb-6">
            Complete training modules to earn certificates
          </p>
          <a
            href="/dashboard/training"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Training
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onView={handleView}
              onDownload={handleDownload}
              onShare={handleShare}
            />
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCertificate(null)
        }}
        onDownload={handleDownload}
        onShare={handleShare}
      />
    </div>
  )
}
