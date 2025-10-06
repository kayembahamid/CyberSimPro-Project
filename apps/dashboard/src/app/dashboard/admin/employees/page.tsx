'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Employee {
  id: string
  name: string
  email: string
  department: string
  overallProgress: number
  modules: {
    'phishing-detective': number
    'password-guardian': number
    'malware-defender': number
    'social-engineer-spotter': number
  }
  badge: 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE'
  lastActive: string
}

export default function AdminEmployeeDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ 
    department: 'all', 
    status: 'all',
    search: ''
  })

  useEffect(() => {
    fetchEmployeeProgress()
  }, [filters])

  const fetchEmployeeProgress = async () => {
    try {
      const params = new URLSearchParams({
        department: filters.department,
        status: filters.status,
        search: filters.search
      })
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/employee-progress?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setEmployees(data.employees || [])
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Department', 'Overall Progress', 'Phishing', 'Password', 'Malware', 'Social Eng', 'Badge', 'Last Active']
    const rows = employees.map(emp => [
      emp.name,
      emp.email,
      emp.department,
      `${emp.overallProgress}%`,
      `${emp.modules['phishing-detective']}%`,
      `${emp.modules['password-guardian']}%`,
      `${emp.modules['malware-defender']}%`,
      `${emp.modules['social-engineer-spotter']}%`,
      emp.badge,
      emp.lastActive
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `training-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const sendReminders = async () => {
    if (!confirm('Send reminder emails to all employees who haven\'t completed training?')) {
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/send-reminders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert(`Reminders sent to ${data.count} employees!`)
      }
    } catch (error) {
      alert('Failed to send reminders')
    }
  }

  const goldCount = employees.filter(e => e.badge === 'GOLD').length
  const silverCount = employees.filter(e => e.badge === 'SILVER').length
  const bronzeCount = employees.filter(e => e.badge === 'BRONZE').length
  const noneCount = employees.filter(e => e.badge === 'NONE').length

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Training Dashboard</h1>
            <p className="text-gray-600 mt-1">Track and manage employee cybersecurity training progress</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={sendReminders}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold"
            >
              📧 Send Reminders
            </button>
            <button 
              onClick={exportToCSV}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold"
            >
              📊 Export CSV
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{goldCount}</div>
                <div className="text-gray-600 text-sm mt-1">Gold Badges</div>
              </div>
              <div className="text-5xl">🏆</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{silverCount}</div>
                <div className="text-gray-600 text-sm mt-1">Silver Badges</div>
              </div>
              <div className="text-5xl">🥈</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{bronzeCount}</div>
                <div className="text-gray-600 text-sm mt-1">Bronze Badges</div>
              </div>
              <div className="text-5xl">🥉</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{noneCount}</div>
                <div className="text-gray-600 text-sm mt-1">Not Started</div>
              </div>
              <div className="text-5xl">⏰</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.department}
              onChange={(e) => setFilters({...filters, department: e.target.value})}
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
              <option value="operations">Operations</option>
            </select>
            
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed (100%)</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not Started</option>
            </select>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Employee</th>
                  <th className="p-4 font-semibold text-gray-700">Department</th>
                  <th className="p-4 font-semibold text-gray-700">🕵️ Phishing</th>
                  <th className="p-4 font-semibold text-gray-700">🛡️ Password</th>
                  <th className="p-4 font-semibold text-gray-700">🦠 Malware</th>
                  <th className="p-4 font-semibold text-gray-700">🎭 Social Eng</th>
                  <th className="p-4 font-semibold text-gray-700">Overall</th>
                  <th className="p-4 font-semibold text-gray-700">Badge</th>
                  <th className="p-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-gray-500">
                      Loading employees...
                    </td>
                  </tr>
                ) : employees.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-gray-500">
                      No employees found. Upload employee list to get started.
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div>
                          <div className="font-semibold text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-600">{employee.email}</div>
                        </div>
                      </td>
                      <td className="p-4 text-center text-gray-700">{employee.department}</td>
                      <td className="p-4 text-center">
                        <ProgressBadge percentage={employee.modules['phishing-detective']} />
                      </td>
                      <td className="p-4 text-center">
                        <ProgressBadge percentage={employee.modules['password-guardian']} />
                      </td>
                      <td className="p-4 text-center">
                        <ProgressBadge percentage={employee.modules['malware-defender']} />
                      </td>
                      <td className="p-4 text-center">
                        <ProgressBadge percentage={employee.modules['social-engineer-spotter']} />
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${employee.overallProgress}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {employee.overallProgress}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <BadgeDisplay badge={employee.badge} />
                      </td>
                      <td className="p-4 text-center">
                        <Link
                          href={`/dashboard/admin/employees/${employee.id}`}
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6">
          <Link 
            href="/dashboard"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProgressBadge({ percentage }: { percentage: number }) {
  if (percentage === 0) {
    return <span className="text-gray-400 text-sm">Not Started</span>
  }
  if (percentage === 100) {
    return <span className="text-green-600 font-bold text-lg">✓</span>
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-16 bg-gray-200 rounded-full h-1.5">
        <div 
          className="bg-blue-500 h-1.5 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-gray-600">{percentage}%</span>
    </div>
  )
}

function BadgeDisplay({ badge }: { badge: 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE' }) {
  const badges = {
    GOLD: { icon: '🏆', text: 'Gold', color: 'text-yellow-600 bg-yellow-50 border-yellow-300' },
    SILVER: { icon: '🥈', text: 'Silver', color: 'text-gray-600 bg-gray-50 border-gray-300' },
    BRONZE: { icon: '🥉', text: 'Bronze', color: 'text-orange-600 bg-orange-50 border-orange-300' },
    NONE: { icon: '⏰', text: 'None', color: 'text-gray-400 bg-gray-50 border-gray-200' }
  }

  const b = badges[badge]
  
  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${b.color} font-semibold text-sm`}>
      <span>{b.icon}</span>
      <span>{b.text}</span>
    </div>
  )
}
