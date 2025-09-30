'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store/useUser'
import Login from '@/components/Login'
import Footer from '@/components/Footer'

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-scale">
          <div className="loading-spinner mx-auto mb-6"></div>
          <p className="font-neue-haas text-lg" style={{ color: 'var(--color-muted)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  // Show loading while redirecting
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-scale">
          <div className="loading-spinner mx-auto mb-6"></div>
          <p className="font-neue-haas text-lg" style={{ color: 'var(--color-muted)' }}>Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="w-full">
        {/* Hero Section */}
        <header className="text-center mb-8 animate-fade-in-up">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 font-neue-haas bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Customer Support Demo
            </h1>
            <p className="text-xl md:text-2xl font-neue-haas mb-12" style={{ color: 'var(--color-muted)' }}>
              Experience the future of AI-powered customer support
            </p>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto">
          {/* Login Section */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Login />
          </div>
          
          {/* Features Section */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-bold mb-4 font-neue-haas" style={{ color: 'var(--color-foreground)' }}>
              What you&apos;ll experience:
            </h2>
            <p className="text-lg mb-12 font-neue-haas" style={{ color: 'var(--color-muted)' }}>
              A personalized AI assistant that understands your context and provides intelligent support
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="card p-8 text-left group">
                <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-neue-haas" style={{ color: 'var(--color-foreground)' }}>
                  Personalized Support
                </h3>
                <p className="font-neue-haas" style={{ color: 'var(--color-muted)' }}>
                  Get help tailored to your account with order tracking, returns, and account-specific information.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="card p-8 text-left group">
                <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-neue-haas" style={{ color: 'var(--color-foreground)' }}>
                  Intelligent Chat
                </h3>
                <p className="font-neue-haas" style={{ color: 'var(--color-muted)' }}>
                  Continuous conversation history with context-aware responses and natural language understanding.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="card p-8 text-left group">
                <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-neue-haas" style={{ color: 'var(--color-foreground)' }}>
                  Instant Access
                </h3>
                <p className="font-neue-haas" style={{ color: 'var(--color-muted)' }}>
                  Quick access to business hours, contact information, and immediate help when you need it.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
