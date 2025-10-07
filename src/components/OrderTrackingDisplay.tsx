'use client'

import { Package, MapPin, Clock, CheckCircle } from 'lucide-react'

interface OrderTrackingDisplayProps {
  order: {
    id: string
    item: string
    status: string
    latestEvent: string
    primaryAddress: string
    lastUpdated: string
  }
}

export default function OrderTrackingDisplay({ order }: OrderTrackingDisplayProps) {
  // Debug logging to verify component is being called
  console.log('🎯 OrderTrackingDisplay rendered with order:', order)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'in transit':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'processing':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'shipped':
        return 'text-purple-600 bg-purple-50 border-purple-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      case 'in transit':
        return <Package className="w-4 h-4" />
      case 'processing':
        return <Clock className="w-4 h-4" />
      case 'shipped':
        return <Package className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }


  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-md mx-auto my-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-md">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 leading-tight">
            {order.item}
          </h3>
        </div>
        <span className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded">
          {order.id}
        </span>
      </div>

      {/* Status Badge */}
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border mb-3 ${getStatusColor(order.status)}`}>
        {getStatusIcon(order.status)}
        {order.status}
      </div>

      {/* Delivery Address */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">Delivery Address</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {order.primaryAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
