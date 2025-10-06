'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Lock, Bell, CreditCard, Globe } from 'lucide-react'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')

  const sections = [
    {
      id: 'profile',
      name: 'Profile',
      icon: User,
      href: '/dashboard/settings/profile',
      description: 'Manage your personal information and avatar'
    },
    {
      id: 'account',
      name: 'Account',
      icon: Globe,
      href: '/dashboard/settings/account',
      description: 'Configure account preferences and settings'
    },
    {
      id: 'security',
      name: 'Security',
      icon: Lock,
      href: '/dashboard/settings/security',
      description: 'Manage password, 2FA, and security settings'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: Bell,
      href: '/dashboard/settings/notifications',
      description: 'Control email and in-app notifications'
    },
    {
      id: 'billing',
      name: 'Billing',
      icon: CreditCard,
      href: '/dashboard/settings/billing',
      description: 'Manage subscription and payment methods'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.id}
              href={section.href}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {section.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Account Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Account Status</p>
            <p className="text-xl font-semibold text-green-600">Active</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Member Since</p>
            <p className="text-xl font-semibold text-gray-900">
              {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Current Plan</p>
            <p className="text-xl font-semibold text-blue-600">Free</p>
          </div>
        </div>
      </div>
    </div>
  )
}
