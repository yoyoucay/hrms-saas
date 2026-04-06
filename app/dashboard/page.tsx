'use client';

import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    {
      label: 'Total Employees',
      value: '254',
      icon: '👥',
      color: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Present Today',
      value: '198',
      icon: '✓',
      color: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'On Leave',
      value: '12',
      icon: '📋',
      color: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      label: 'Pending Reviews',
      value: '8',
      icon: '⚠️',
      color: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New Employee Onboarded',
      description: 'Jane Smith - Marketing Department',
      time: '2 hours ago',
      icon: '👤',
    },
    {
      id: 2,
      title: 'Leave Request Approved',
      description: 'John Doe - 5 days approved',
      time: '4 hours ago',
      icon: '✓',
    },
    {
      id: 3,
      title: 'Payroll Processed',
      description: 'Monthly payroll for March processed',
      time: '1 day ago',
      icon: '💰',
    },
    {
      id: 4,
      title: 'Attendance Alert',
      description: 'Low attendance rate in Sales dept',
      time: '2 days ago',
      icon: '⚠️',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-900 dark:to-indigo-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name}!</h1>
        <p className="mt-2 opacity-90">
          Here's what's happening in your HRMS today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`text-4xl ${stat.color} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'New Employee', icon: '➕' },
                { label: 'Approve Leave', icon: '✓' },
                { label: 'View Reports', icon: '📊' },
                { label: 'Settings', icon: '⚙️' },
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Department Overview */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Department Overview
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Engineering', count: 42, color: 'bg-blue-500' },
                { name: 'Marketing', count: 18, color: 'bg-pink-500' },
                { name: 'Sales', count: 35, color: 'bg-green-500' },
                { name: 'HR', count: 8, color: 'bg-purple-500' },
              ].map((dept, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {dept.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {dept.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${dept.color} h-2 rounded-full`}
                      style={{ width: `${(dept.count / 50) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="pb-4 border-b border-gray-200 dark:border-gray-700 last:pb-0 last:border-b-0"
                >
                  <div className="flex gap-3">
                    <span className="text-xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-3">
              Your Profile
            </h3>
            <div className="space-y-2 text-sm text-indigo-900 dark:text-indigo-300">
              <p>
                <strong>Employee Code:</strong> {session?.user?.empCode}
              </p>
              <p>
                <strong>Department:</strong> {session?.user?.department}
              </p>
              <p>
                <strong>Role:</strong> {session?.user?.role}
              </p>
              <p>
                <strong>Hire Date:</strong> {session?.user?.hireDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
