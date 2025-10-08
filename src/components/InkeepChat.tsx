'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { Sparkle, X } from 'lucide-react'
import { useUser } from '@/store/useUser'
import {
  InkeepEmbeddedChat,
  type InkeepEmbeddedChatProps,
} from '@inkeep/cxkit-react-oss'
import type { AIChatFunctions } from '@inkeep/cxkit-react-oss/types'
import OrderTrackingDisplay from './OrderTrackingDisplay'
import SupportTicketCard from './SupportTicketCard'

const styleOverrides = `
.ikp-ai-chat-wrapper{
  max-height: 100% !important;
  height: calc(100% - 40px) !important;
  box-shadow: none !important;
}
/* from agents framework */
.ikp-ai-chat-message-wrapper {
  padding-top: 1rem;
  padding-bottom: 1rem;

}
[data-role="user"] .ikp-ai-chat-message-header {
  display: none;
}

.ikp-ai-chat-message-header {
  margin-bottom: 16px;
}

.ikp-ai-chat-message-wrapper:not(:last-child):after {
  border-bottom-width: 0px;
}
 [data-role="user"] .ikp-ai-chat-message-name {
  display: none;
  margin-bottom: 0px;
}
.ikp-ai-chat-message-content, .ikp-ai-chat-input {
  font-size: 14px;
}
.ikp-ai-chat-message-avatar-content {
  width: 24px;
  height: 24px;
}
[data-widget-md] .ikp-ai-chat-message-avatar {
  height: 24px;
}
.ikp-ai-chat-message-name {
  background: none;
  padding-left: 0px;
  padding-right: 0px;
  margin-left: 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ikp-color-gray-600);
}
.ikp-ai-chat-tagline__text {
  font-size: 13px;
}
.ikp-ai-chat-input__fieldset {
  padding: 4px;
}
.ikp-ai-chat-input__send-button {
  height: 36px;
  width: 36px;
}

.ikp-ai-chat-message-loading {
  height: auto;
}

/* User message styles */
[data-role="user"] .ikp-ai-chat-message-content-wrapper {
  align-items: flex-end;
}
[data-role="user"] .ikp-ai-chat-message-content {
  background-color: var(--ikp-color-gray-100);
  color: var(--ikp-color-gray-900);
  border-radius: 24px;
  border-bottom-right-radius: 2px;
  padding: 8px 16px;
}
[data-role="user"] .ikp-ai-chat-message-part > p {
  margin: 0px;
}
[data-role="user"] .ikp-ai-chat-message-part {
  margin-bottom: 0px;
}
[data-theme=dark] [data-role="user"] .ikp-ai-chat-message-content {
  background-color: var(--ikp-color-white-alpha-100);
  color: var(--ikp-color-white-alpha-950);
}

.ikp-markdown-code {
  background-color: var(--ikp-color-gray-100);
  color: var(--ikp-color-gray-900);
}

[data-theme=dark] .ikp-markdown-code {
  background-color: var(--ikp-color-white-alpha-100);
  color: var(--ikp-color-white-alpha-950);
}

/* Dark mode styles for chat containers */
[data-theme=dark] .ikp-sidebar-chat__close-button {
  color: var(--ikp-color-gray-50);
}
[data-theme=dark] .ikp-ai-chat-message-name {
  background: none;
}
  `

const graphUrl = process.env.NEXT_PUBLIC_INKEEP_GRAPH_URL || 'http://localhost:3003/api/chat'
const tenantId = process.env.NEXT_PUBLIC_INKEEP_TENANT_ID || 'inkeep'
const projectId = process.env.NEXT_PUBLIC_INKEEP_PROJECT_ID || 'default'
const graphId = process.env.NEXT_PUBLIC_INKEEP_GRAPH_ID || 'your-graph-id'

export default function InkeepChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const { name, email, hasHydrated } = useUser()
  const chatFunctionsRef = useRef<AIChatFunctions | null>(null);

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


  const submitMessage = (message: string) => {
    chatFunctionsRef.current?.submitMessage(message);
  };


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
      chatFunctions: chatFunctionsRef.current,
      headers,
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
        OrderTrackingDisplay: (props: any) => <OrderTrackingDisplay submitMessage={submitMessage} {...props} />,
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
    <>
      {/* Ask AI button - matching marketing-site styling */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed cursor-pointer bottom-5 right-5 px-4 py-3 rounded-full transition-all duration-200 z-[99998] flex items-center gap-2 font-medium border font-jet-brains backdrop-blur-[10px] ${isOpen
          ? "bg-primary-dark hover:bg-primary text-white border-primary-dark"
          : "bg-primary-lighter hover:bg-primary-light text-primary-text border-primary-light"
          }`}
        style={{
          boxShadow: isOpen
            ? "6px 8px 22px rgba(157, 194, 255, 0.24), 0 10px 36px rgba(0, 0, 0, 0.10)"
            : "5px 6px 18px rgba(157, 194, 255, 0.20), 0 8px 32px rgba(0, 0, 0, 0.08)"
        }}
        aria-label={isOpen ? "Close chat" : "Ask AI"}
      >
        {isOpen ? (
          <>
            <X width={16} height={16} />
            <span className="text-sm font-medium">Close</span>
          </>
        ) : (
          <>
            <Sparkle width={16} height={16} />
            <span className="text-sm font-medium">Ask AI</span>
          </>
        )}
      </button>

      <div className={`fixed bottom-[80px] right-5 height-full z-20 h-full w-[550px] shadow-2xl rounded-md transition-opacity duration-300 translate-y-0 max-h-[min(700px,calc(100%-80px))] ${isOpen ? 'opacity-100' : 'opacity-0  pointer-events-none'}`}>
        <div className="flex justify-between items-center py-2 pr-4 pl-5 bg-white text-gray-500 relative text-sm rounded-t-md after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-3 after:translate-y-full after:transform after:bg-gradient-to-b after:from-white after:to-transparent after:z-[1] after:pointer-events-none
 ">
          <div>Ask AI</div>
          <button className="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1" type="button" onClick={() => setIsOpen(false)}>
            <X width={16} height={16} />
          </button>
        </div>
        <div className="h-full w-full">
          <InkeepEmbeddedChat
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
        </div>
      </div>
    </>
  )
}