'use client'

import { useState, useMemo, useEffect } from 'react'
import { useUser } from '@/store/useUser'
import {
  InkeepSidebarChat,
  type InkeepSidebarChatProps,
} from '@inkeep/cxkit-react-oss'

const graphUrl = process.env.NEXT_PUBLIC_INKEEP_GRAPH_URL || 'http://localhost:3003/api/chat'
const tenantId = process.env.NEXT_PUBLIC_INKEEP_TENANT_ID || 'inkeep'
const projectId = process.env.NEXT_PUBLIC_INKEEP_PROJECT_ID || 'default'
const graphId = process.env.NEXT_PUBLIC_INKEEP_GRAPH_ID || 'your-graph-id'

export default function InkeepChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const { name, email, hasHydrated } = useUser()
  
  // Check if user is logged in
  const isLoggedIn = Boolean(name && email)

  // Initialize graph connection when user logs in
  useEffect(() => {
    if (hasHydrated && isLoggedIn && !isInitialized) {
      const newSessionId = `session_${name}_${email}_${Date.now()}`
      setSessionId(newSessionId)
      setIsInitialized(true)
    } else if (!isLoggedIn && isInitialized) {
      setIsInitialized(false)
      setIsOpen(false) // Close chat if open
      setSessionId('')
    }
  }, [hasHydrated, isLoggedIn, name, email, isInitialized])

  // Prepare headers for the agent request context
  // IMPORTANT: keys are lowercase (see Request Context docs).
  const aiChatSettings = useMemo<InkeepSidebarChatProps["aiChatSettings"]>(() => {
    // Only create settings if user is initialized (logged in and ready)
    if (!isInitialized || !isLoggedIn) {
      return undefined
    }

    const headers = {
      "x-inkeep-tenant-id": tenantId,
      "x-inkeep-project-id": projectId,
      "x-inkeep-graph-id": graphId,

      // Request context headers for personalization
      // These will be available in your graph as requestContext.user_name and requestContext.user_email
      "user_name": name,
      "user_email": email?.toLowerCase(),
      "user_logged_in": "true",
      "session_id": sessionId,
      "session_timestamp": new Date().toISOString(),
      "initialization_timestamp": Date.now().toString(),
    };

    return {
      graphUrl,
      headers,
      // Example questions (better than quickQuestions)
      exampleQuestions: [
        'How can I track my order?',
        'What is your return policy?',
        'How do I contact support?'
      ],
      placeholder: "Ask me anything about your order...",
      introMessage: `Hi ${name}! 👋 I'm here to help you with any questions about your orders, returns, or our services. Your session is now connected and personalized. What can I help you with today?`,
      
      // Help options for better UX
      getHelpOptions: [
        {
          name: "Contact Support",
          isPinnedToToolbar: true,
          icon: { builtIn: "IoChatbubblesOutline" },
          action: {
            type: "open_link",
            url: "mailto:support@example.com?subject=Customer%20Support%20Request",
          },
        },
        {
          name: "Track Order",
          isPinnedToToolbar: true,
          icon: { builtIn: "LuPackage" },
          action: {
            type: "open_link",
            url: "/track-order",
          },
        },
      ],
      
      // Enable sharing
      isShareButtonVisible: true,
      shareChatUrlBasePath: typeof window !== "undefined" ? `${window.location.origin}` : "",
      
      // Link behavior
      shouldOpenLinksInNewTab: true,
    }
  }, [name, email, isLoggedIn, isInitialized, sessionId])

  // Don't render until store has hydrated from localStorage
  if (!hasHydrated) {
    return null
  }

  // Don't render if user is not logged in or not initialized
  if (!isLoggedIn || !isInitialized) {
    return null
  }


  return (
    <>
      {/* Ask AI button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 px-4 py-3 rounded-full transition-all duration-300 z-50 flex items-center gap-2 font-medium border-2 ${
          isOpen 
            ? "bg-gray-500 hover:bg-gray-600 text-white border-gray-500" 
            : "bg-blue-100 hover:bg-blue-200 text-blue-900 border-blue-300 hover:scale-105"
        }`}
        aria-label={isOpen ? "Close chat" : "Ask AI"}
      >
        {isOpen ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm font-medium">Close</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
            </svg>
            <span className="text-sm font-medium">Ask AI</span>
          </>
        )}
      </button>

      {/* The chat sidebar wrapper */}
      <div className={`fixed right-0 top-0 w-[450px] h-screen z-[9999] max-w-[85vw] ${
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}>
        {aiChatSettings && (
            <InkeepSidebarChat
              baseSettings={{
                apiKey: process.env.NEXT_PUBLIC_INKEEP_API_KEY || 'demo-key',
                primaryBrandColor: '#3784ff',
                organizationDisplayName: 'Customer Support Demo',
                colorMode: { forcedColorMode: "light" },
              }}
              aiChatSettings={aiChatSettings}
              isOpen={isOpen}
              onOpenChange={setIsOpen}
            />
        )}
      </div>

    </>
  )
}