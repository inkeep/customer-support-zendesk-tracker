'use client'

import { useState, useMemo, useEffect } from 'react'
import { Sparkle, X } from 'lucide-react'
import { useUser } from '@/store/useUser'
import {
  InkeepChatButton,
  InkeepEmbeddedChat,
  type InkeepEmbeddedChatProps,
} from '@inkeep/agents-ui'
import OrderTrackingDisplay from './OrderTrackingDisplay'
import SupportTicketCard from './SupportTicketCard'

const styleOverrides = `
 .ikp-chat-button__button {
  background-color: #D5E5FF !important;
  border: 1px solid #69A3FF !important;
  color: #231F20 !important;
  font-family: var(--font-neue-haas), Arial, Helvetica, sans-serif !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  box-shadow: 5px 6px 18px rgba(157, 194, 255, 0.20), 0 8px 32px rgba(0, 0, 0, 0.08) !important;
  transition: box-shadow 0.2s ease, background-color 0.2s ease, transform 0.2s ease !important;
}

.ikp-chat-button__text {
  color: #231F20 !important;
}

.ikp-chat-button__button:hover {
  background-color: #C9DBFF !important;
  border-color: #69A3FF !important;
  box-shadow: 6px 8px 22px rgba(157, 194, 255, 0.24), 0 10px 36px rgba(0, 0, 0, 0.10) !important;
  transform: translateY(-1px);
}

.ikp-chat-button__button:focus-visible {
  box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #69A3FF !important;
}

@media (min-width: 600px) {
  .ikp-chat-bubble__root {
    width: 550px !important;
  }
}

.ikp-markdown-code {
  background-color: var(--ikp-color-gray-100);
  color: var(--ikp-color-gray-900);
}

[data-theme=dark] .ikp-markdown-code {
  background-color: var(--ikp-color-white-alpha-100);
  color: var(--ikp-color-white-alpha-950);
}
`

const agentUrl = process.env.NEXT_PUBLIC_INKEEP_AGENT_URL || 'http://localhost:3003/api/chat'
const tenantId = process.env.NEXT_PUBLIC_INKEEP_TENANT_ID || 'inkeep'
const projectId = process.env.NEXT_PUBLIC_INKEEP_PROJECT_ID || 'default'
const agentId = process.env.NEXT_PUBLIC_INKEEP_AGENT_ID || 'your-agent-id'

export default function InkeepChat() {
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
      setSessionId('')
    }
  }, [hasHydrated, isLoggedIn, name, email, isInitialized])

  // Prepare headers for the agent request context
  // IMPORTANT: keys are lowercase (see Request Context docs).
  const aiChatSettings = useMemo<InkeepEmbeddedChatProps["aiChatSettings"]>(() => {
    // Only create settings if user is initialized (logged in and ready)
    if (!isInitialized || !isLoggedIn) {
      return undefined
    }

    const headers = {
      "x-inkeep-tenant-id": tenantId,
      "x-inkeep-project-id": projectId,
      "x-inkeep-agent-id": agentId,
      'x-emit-operations': 'true',

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
      agentUrl,
      headers,
      aiAssistantAvatar: "/images/logos/square-outline-logo-black.png",
      // Example questions (better than quickQuestions)
      exampleQuestions: [
        'How can I track my order?',
        'What is your return policy?',
        'How do I contact support?'
      ],
      placeholder: "Ask me anything about your order...",
      introMessage: `Hi ${name}! 👋 I'm here to help you with any questions about your orders, returns, or our services. Your session is now connected and personalized. What can I help you with today?`,

      // Data components registration
      components: {
        OrderTrackingDisplay,
        SupportTicketCard
      },

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

    <InkeepChatButton
      baseSettings={{
        userProperties: {
          name,
          email,
        },
        apiKey: process.env.NEXT_PUBLIC_INKEEP_API_KEY || 'demo-key',
        primaryBrandColor: '#3784ff',
        organizationDisplayName: 'Customer Support Demo',
        colorMode: { forcedColorMode: "light" },
        theme: {
          styles: [
            {
              key: "ikp-style-overrides",
              type: "style",
              value: styleOverrides,
            },
          ],
        },
      }}
      aiChatSettings={aiChatSettings}
    />
  )
}