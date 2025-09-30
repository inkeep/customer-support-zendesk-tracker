'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store/useUser'
import Login from '@/components/Login'

export default function Home() {
  const { name, email, hasHydrated } = useUser()
  const router = useRouter()
  
  const isLoggedIn = Boolean(name && email)

  // Redirect to dashboard if already logged in (after hydration)
  useEffect(() => {
    if (hasHydrated && isLoggedIn) {
      router.push('/dashboard')
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
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
        <div className="text-center">
          <p style={{ color: 'var(--color-muted)' }}>Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" style={{ background: 'var(--color-background)' }}>
      <div className="w-full">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-foreground)' }}>
            Customer Support Demo
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
            Sign in to access your personalized AI support assistant
          </p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Login />
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
              What you'll get after signing in:
            </h2>
            <div className="p-8 rounded-xl" style={{ background: 'var(--color-surface)' }}>
              <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--color-foreground)' }}>
                Personalized AI Assistant
              </h3>
              <ul className="text-left space-y-2" style={{ color: 'var(--color-muted)' }}>
                <li>• Track your order status with your account details</li>
                <li>• Get help with returns and refunds</li>
                <li>• Access your account-specific information</li>
                <li>• Find contact information and business hours</li>
                <li>• Continuous conversation history during your session</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
