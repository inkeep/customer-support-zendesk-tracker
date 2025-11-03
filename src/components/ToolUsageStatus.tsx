'use client'

import { Loader2, CheckCircle2, XCircle, Package, Ticket, Search } from 'lucide-react'

interface ToolUsageStatusProps {
  // Direct props (legacy support)
  tool_name?: string
  purpose?: string
  status?: 'in_progress' | 'completed' | 'failed'
  result_summary?: string
  // Data-summary structure from agent
  type?: string
  label?: string
  details?: {
    tool_name?: string
    purpose?: string
    status?: 'in_progress' | 'completed' | 'failed'
    result_summary?: string
    summary?: string
  }
}

// Helper to get icon based on tool name
const getToolIcon = (toolName?: string) => {
  if (!toolName) return <Loader2 className="w-4 h-4" />
  
  const lowerName = toolName.toLowerCase()
  if (lowerName.includes('order') || lowerName.includes('track')) {
    return <Package className="w-4 h-4" />
  }
  if (lowerName.includes('ticket') || lowerName.includes('zendesk')) {
    return <Ticket className="w-4 h-4" />
  }
  if (lowerName.includes('search') || lowerName.includes('get')) {
    return <Search className="w-4 h-4" />
  }
  return <Loader2 className="w-4 h-4" />
}

// Helper to get status color
const getStatusColor = (status?: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'failed':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'in_progress':
    default:
      return 'text-blue-600 bg-blue-50 border-blue-200'
  }
}

// Helper to get status icon
const getStatusIcon = (status?: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-4 h-4" />
    case 'failed':
      return <XCircle className="w-4 h-4" />
    case 'in_progress':
    default:
      return <Loader2 className="w-4 h-4 animate-spin" />
  }
}

function ToolUsageStatus(props: ToolUsageStatusProps) {
  // Debug: Log received props to verify data structure
  console.log('[ToolUsageStatus] 🎨 Component called with props:', JSON.stringify(props, null, 2))
  console.log('[ToolUsageStatus] 🎨 Component IS being rendered!')

  // Extract props from data-summary structure if present
  // The Inkeep UI library may pass the entire data object
  const {
    tool_name: directToolName,
    purpose: directPurpose,
    status: directStatus,
    result_summary: directResultSummary,
    label,
    details,
  } = props

  // Use details if available (from data-summary structure), otherwise use direct props
  const tool_name = details?.tool_name ?? directToolName
  const purpose = details?.purpose ?? directPurpose
  const status = (details?.status ?? directStatus ?? 'in_progress') as 'in_progress' | 'completed' | 'failed'
  const result_summary = details?.result_summary ?? details?.summary ?? directResultSummary

  // The label is the user-friendly description, prioritize it
  // Purpose is a fallback description if no label
  const displayPurpose = label || purpose || undefined
  
  // Show tool_name as the heading if available, otherwise show nothing (label will be shown below)
  const displayToolName = tool_name || undefined

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-md mx-auto my-3">
      <div className="flex items-start gap-3">
        {/* Tool Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
            {getToolIcon(tool_name)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Tool Name/Label & Status */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {displayToolName && (
                <span className="text-sm font-semibold text-gray-900 truncate">
                  {displayToolName}
                </span>
              )}
            </div>
            {status && (
              <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(status)}`}>
                {getStatusIcon(status)}
                <span className="capitalize">{status.replaceAll('_', ' ')}</span>
              </div>
            )}
          </div>

          {/* Purpose/Label - Show label prominently if it exists */}
          {displayPurpose && (
            <p className="text-sm text-gray-600 mb-2 leading-relaxed">
              {displayPurpose}
            </p>
          )}

          {/* Result Summary */}
          {result_summary && status === 'completed' && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Result:</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {result_summary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Set display name for better debugging
ToolUsageStatus.displayName = 'ToolUsageStatus'

export default ToolUsageStatus
