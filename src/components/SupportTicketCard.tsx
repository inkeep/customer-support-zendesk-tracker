'use client'

import { Ticket, AlertCircle, Clock, CheckCircle, ArrowRight } from 'lucide-react'

interface SupportTicketCardProps {
  ticket: {
    id: string
    subject: string
    priority: string
    return_reason?: string
    resolution_type?: string
  }
}

export default function SupportTicketCard({ ticket }: SupportTicketCardProps) {
  // Debug logging to verify component is being called
  console.log('🎫 SupportTicketCard rendered with ticket:', ticket)

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
      case 'normal':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
      case 'high':
        return <AlertCircle className="w-4 h-4" />
      case 'medium':
      case 'normal':
        return <Clock className="w-4 h-4" />
      case 'low':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Ticket className="w-4 h-4" />
    }
  }

  const getResolutionColor = (resolutionType: string) => {
    switch (resolutionType?.toLowerCase()) {
      case 'resolved':
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'refund':
      case 'replacement':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'escalated':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-md mx-auto my-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Ticket className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Support Ticket</h3>
        </div>
        <span className="text-sm font-mono text-gray-500">#{ticket.id}</span>
      </div>

      {/* Subject */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 text-base leading-relaxed">
          {ticket.subject}
        </h4>
      </div>

      {/* Priority Badge */}
      <div className="mb-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getPriorityColor(ticket.priority)}`}>
          {getPriorityIcon(ticket.priority)}
          {ticket.priority} Priority
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-3">
        {/* Return Reason */}
        {ticket.return_reason && (
          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Return Reason</p>
                <p className="text-sm text-gray-600 leading-relaxed">{ticket.return_reason}</p>
              </div>
            </div>
          </div>
        )}

        {/* Resolution Type */}
        {ticket.resolution_type && (
          <div className={`border-t border-gray-100 pt-3 ${ticket.return_reason ? '' : 'border-t-0 pt-0'}`}>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-2">Resolution</p>
                <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border ${getResolutionColor(ticket.resolution_type)}`}>
                  {ticket.resolution_type}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="border-t border-gray-100 pt-3 mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Ticket Details</span>
          <div className="flex items-center gap-1">
            <span>View Full History</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  )
}
