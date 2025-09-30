'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store/useUser'
import InkeepChat from '@/components/InkeepChat'
import Button from '@/components/Button'
import Footer from '@/components/Footer'

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-scale">
          <div className="loading-spinner mx-auto mb-6"></div>
          <p className="font-neue-haas text-lg" style={{ color: 'var(--color-muted)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  // Show loading while redirecting
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-scale">
          <div className="loading-spinner mx-auto mb-6"></div>
          <p className="font-neue-haas text-lg" style={{ color: 'var(--color-muted)' }}>Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="w-full">
        {/* Welcome Header */}
        <header className="text-center mb-8 animate-fade-in-up">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-neue-haas bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Welcome back, {name}!
            </h1>
            <p className="text-xl font-neue-haas mb-8" style={{ color: 'var(--color-muted)' }}>
              Your AI support assistant is ready to help
            </p>
            
            {/* Sign out button */}
            <div className="flex justify-center animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
              <Button
                variant="secondary"
                onClick={() => {
                  clear()
                  router.push('/')
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto">
          {/* Chat Instructions */}
          <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-bold mb-6 font-neue-haas" style={{ color: 'var(--color-foreground)' }}>
              Ready to get help?
            </h2>
            <p className="text-lg mb-12 font-neue-haas max-w-3xl mx-auto" style={{ color: 'var(--color-muted)' }}>
              Click the &quot;Ask AI&quot; button in the bottom right corner to start a conversation with your personalized AI assistant. 
              Your session is connected and ready to provide intelligent support.
            </p>
            
            {/* Quick Actions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="card p-6 text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-neue-haas font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Track Orders
                </h3>
                <p className="text-sm font-neue-haas" style={{ color: 'var(--color-muted)' }}>
                  Check order status
                </p>
              </div>

              <div className="card p-6 text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m5 14v-5a2 2 0 00-2-2H6a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2z" />
                  </svg>
                </div>
                <h3 className="font-neue-haas font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Returns & Refunds
                </h3>
                <p className="text-sm font-neue-haas" style={{ color: 'var(--color-muted)' }}>
                  Process returns easily
                </p>
              </div>

              <div className="card p-6 text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-neue-haas font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Contact Support
                </h3>
                <p className="text-sm font-neue-haas" style={{ color: 'var(--color-muted)' }}>
                  Get in touch
                </p>
              </div>

              <div className="card p-6 text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-neue-haas font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Business Hours
                </h3>
                <p className="text-sm font-neue-haas" style={{ color: 'var(--color-muted)' }}>
                  Check availability
                </p>
              </div>
            </div>
          </div>

          {/* AI Assistant Status */}
          <div className="card p-8 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-neue-haas font-semibold" style={{ color: 'var(--color-foreground)' }}>
                AI Assistant Online
              </span>
            </div>
            <p className="font-neue-haas" style={{ color: 'var(--color-muted)' }}>
              Your personalized AI assistant is ready to help with any questions about your account, orders, or our services.
            </p>
          </div>
        </main>
      </div>
      <Footer />
      
      {/* InkeepChat will automatically establish connection when component mounts */}
      <InkeepChat />
    </div>
  );
}
