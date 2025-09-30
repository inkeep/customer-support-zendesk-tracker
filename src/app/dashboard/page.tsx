'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store/useUser'
import InkeepChat from '@/components/InkeepChat'

export default function Dashboard() {
  const { name, email, hasHydrated, clear } = useUser()
  const router = useRouter()
  
  const isLoggedIn = Boolean(name && email)

  // Redirect to home if not logged in (after hydration)
  useEffect(() => {
    if (hasHydrated && !isLoggedIn) {
      router.push('/')
    }
  }, [hasHydrated, isLoggedIn, router])

  // Don't render until store has hydrated from localStorage
  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-primary)' }}></div>
          <p style={{ color: 'var(--color-muted)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  // Show loading while redirecting
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
        <div className="text-center">
          <p style={{ color: 'var(--color-muted)' }}>Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" style={{ background: 'var(--color-background)' }}>
      <div className="w-full">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-foreground)' }}>
            Customer Support Dashboard
          </h1>
          <p className="text-lg mb-4" style={{ color: 'var(--color-muted)' }}>
            Welcome back, {name}! How can we help you today?
          </p>
          
          {/* User info and logout */}
          <div className="max-w-md mx-auto p-4 rounded-lg mb-8" style={{ background: 'var(--color-surface)' }}>
            <p className="mb-3" style={{ color: 'var(--color-muted)' }}>
              Logged in as: <span className="font-semibold" style={{ color: 'var(--color-foreground)' }}>{name}</span>
            </p>
            <button
              onClick={() => {
                clear()
                router.push('/')
              }}
              className="px-4 py-2 rounded-md transition-colors font-medium"
              style={{
                background: 'var(--color-muted)',
                border: '1px solid var(--color-muted)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-primary-text)';
                e.currentTarget.style.borderColor = 'var(--color-primary-text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-muted)';
                e.currentTarget.style.borderColor = 'var(--color-muted)';
              }}
            >
              Logout
            </button>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
              Need Help?
            </h2>
            <p className="mb-6" style={{ color: 'var(--color-muted)' }}>
              Click the "Ask AI" button in the bottom right to start a conversation with our AI assistant.
              Your chat session is personalized with your account information.
            </p>
            <div className="p-8 rounded-xl" style={{ background: 'var(--color-surface)' }}>
              <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--color-foreground)' }}>
                What you can ask:
              </h3>
              <ul className="text-left space-y-2" style={{ color: 'var(--color-muted)' }}>
                <li>• Track your order status</li>
                <li>• Get help with returns and refunds</li>
                <li>• Find contact information</li>
                <li>• Learn about business hours</li>
                <li>• Account-specific questions</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      
      {/* InkeepChat will automatically establish connection when component mounts */}
      <InkeepChat />
    </div>
  );
}
