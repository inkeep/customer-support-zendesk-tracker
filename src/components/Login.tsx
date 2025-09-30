'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store/useUser'
import Button from './Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUser, name: currentName, email: currentEmail, clear } = useUser()
  
  const isLoggedIn = Boolean(currentName && currentEmail)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && password.trim()) {
      setIsLoading(true)
      
      // Simulate a brief loading state for better UX
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Parse name from email (part before @) and format it
      const parsedName = email.split('@')[0]
      const formattedName = parsedName.charAt(0).toUpperCase() + parsedName.slice(1).toLowerCase()
      
      setUser(formattedName, email.trim())
      router.push('/dashboard')
    }
  }

  if (isLoggedIn) {
    return (
      <div className="card animate-fade-in-scale max-w-md mx-auto p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold font-neue-haas" style={{ color: 'var(--color-foreground)' }}>Welcome!</h2>
        </div>
        <p className="mb-6 font-neue-haas text-center" style={{ color: 'var(--color-muted)' }}>
          Logged in as: <span className="font-semibold text-primary">{currentName}</span>
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            clear()
            router.push('/')
          }}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    )
  }

  return (
    <div className="card animate-fade-in-scale max-w-md mx-auto p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold font-neue-haas" style={{ color: 'var(--color-foreground)' }}>Welcome Back</h2>
        <p className="text-sm mt-2 font-neue-haas" style={{ color: 'var(--color-muted)' }}>
          Sign in to access your personalized AI assistant
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input w-full"
            placeholder="Enter your email address"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input w-full"
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="loading-spinner w-4 h-4"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-xs font-neue-haas" style={{ color: 'var(--color-muted)' }}>
          Demo: Use your email and password to sign in
        </p>
      </div>
    </div>
  )
}
