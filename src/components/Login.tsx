'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store/useUser'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { setUser, name: currentName, email: currentEmail, clear } = useUser()
  
  const isLoggedIn = Boolean(currentName && currentEmail)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && password.trim()) {
      // Parse name from email (part before @) and format it
      const parsedName = email.split('@')[0]
      const formattedName = parsedName.charAt(0).toUpperCase() + parsedName.slice(1).toLowerCase()
      
      setUser(formattedName, email.trim())
      router.push('/dashboard')
    }
  }

  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto p-8 rounded-xl shadow-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-primary-lighter)' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-foreground)' }}>Welcome!</h2>
        <p className="mb-4" style={{ color: 'var(--color-muted)' }}>
          Logged in as: <span className="font-semibold">{currentName}</span>
        </p>
        <button
          onClick={() => {
            clear()
            router.push('/')
          }}
          className="w-full text-white py-2 px-4 rounded-md transition-colors font-medium"
          style={{
            background: 'var(--color-muted)',
            border: '1px solid var(--color-muted)'
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
    )
  }

  return (
    <div className="max-w-md mx-auto p-8 rounded-xl shadow-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-primary-lighter)' }}>
      <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-foreground)' }}>Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-foreground)' }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none transition-colors"
            style={{
              borderColor: 'var(--color-primary-lighter)',
              background: 'var(--color-surface-alt)',
              color: 'var(--color-foreground)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(55, 132, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary-lighter)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-foreground)' }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none transition-colors"
            style={{
              borderColor: 'var(--color-primary-lighter)',
              background: 'var(--color-surface-alt)',
              color: 'var(--color-foreground)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(55, 132, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary-lighter)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white py-2 px-4 rounded-md transition-colors font-medium"
          style={{
            background: 'var(--color-primary)',
            border: '1px solid var(--color-primary)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-primary-dark)';
            e.currentTarget.style.borderColor = 'var(--color-primary-dark)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-primary)';
            e.currentTarget.style.borderColor = 'var(--color-primary)';
          }}
        >
          Login
        </button>
      </form>
    </div>
  )
}
