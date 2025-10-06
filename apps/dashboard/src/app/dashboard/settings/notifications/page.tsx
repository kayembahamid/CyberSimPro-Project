'use client'

import { useState } from 'react'
import { ArrowLeft, Save, Bell } from 'lucide-react'
import Link from 'next/link'

export default function NotificationsSettingsPage() {
  const [saving, setSaving] = useState(false)
  
  const [notifications, setNotifications] = useState({
    emailNotifications: {
      trainingComplete: true,
      certificateEarned: true,
      weeklyDigest: true,
      productUpdates: false,
      marketingEmails: false
    },
    inAppNotifications: {
      trainingReminders: true,
      achievementUnlocked: true,
      teamActivity: true,
      systemAnnouncements: true
    }
  })

  const handleToggle = (category: 'emailNotifications' | 'inAppNotifications', key: string) => {
    setNotifications({
      ...notifications,
      [category]: {
        ...notifications[category],
        [key]: !notifications[category][key as keyof typeof notifications.emailNotifications]
      }
    })
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    alert('Notification preferences saved!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard/settings"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
          <p className="mt-1 text-gray-600">Manage how you receive notifications</p>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Email Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <NotificationToggle
            label="Training Completed"
            description="Get notified when you complete a training module"
            checked={notifications.emailNotifications.trainingComplete}
            onChange={() => handleToggle('emailNotifications', 'trainingComplete')}
          />
          <NotificationToggle
            label="Certificate Earned"
            description="Receive an email when you earn a new certificate"
            checked={notifications.emailNotifications.certificateEarned}
            onChange={() => handleToggle('emailNotifications', 'certificateEarned')}
          />
          <NotificationToggle
            label="Weekly Digest"
            description="Get a weekly summary of your progress and achievements"
            checked={notifications.emailNotifications.weeklyDigest}
            onChange={() => handleToggle('emailNotifications', 'weeklyDigest')}
          />
          <NotificationToggle
            label="Product Updates"
            description="Stay informed about new features and improvements"
            checked={notifications.emailNotifications.productUpdates}
            onChange={() => handleToggle('emailNotifications', 'productUpdates')}
          />
          <NotificationToggle
            label="Marketing Emails"
            description="Receive promotional content and special offers"
            checked={notifications.emailNotifications.marketingEmails}
            onChange={() => handleToggle('emailNotifications', 'marketingEmails')}
          />
        </div>
      </div>

      {/* In-App Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          In-App Notifications
        </h2>
        
        <div className="space-y-4">
          <NotificationToggle
            label="Training Reminders"
            description="Get reminded to continue your training sessions"
            checked={notifications.inAppNotifications.trainingReminders}
            onChange={() => handleToggle('inAppNotifications', 'trainingReminders')}
          />
          <NotificationToggle
            label="Achievement Unlocked"
            description="Celebrate when you unlock new achievements"
            checked={notifications.inAppNotifications.achievementUnlocked}
            onChange={() => handleToggle('inAppNotifications', 'achievementUnlocked')}
          />
          <NotificationToggle
            label="Team Activity"
            description="Stay updated on your team's progress and activities"
            checked={notifications.inAppNotifications.teamActivity}
            onChange={() => handleToggle('inAppNotifications', 'teamActivity')}
          />
          <NotificationToggle
            label="System Announcements"
            description="Important platform updates and maintenance notices"
            checked={notifications.inAppNotifications.systemAnnouncements}
            onChange={() => handleToggle('inAppNotifications', 'systemAnnouncements')}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Link
          href="/dashboard/settings"
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Preferences'}</span>
        </button>
      </div>
    </div>
  )
}

function NotificationToggle({
  label,
  description,
  checked,
  onChange
}: {
  label: string
  description: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
