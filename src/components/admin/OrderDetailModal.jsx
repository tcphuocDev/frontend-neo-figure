import {
  X,
  User,
  Phone,
  MapPin,
  Package,
  CreditCard,
  Truck,
  Clock,
  CheckCircle,
  Printer,
} from 'lucide-react';
import { useState } from 'react';

export default function OrderDetailModal({ order, isOpen, onClose, onUpdateStatus }) {
  const [updatingStatus, setUpdatingStatus] = useState(false);

  if (!isOpen || !order) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: {
        label: 'Pending',
        color: 'yellow',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        textColor: 'text-yellow-700 dark:text-yellow-400',
        icon: Clock,
      },
      paid: {
        label: 'Paid',
        color: 'green',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        textColor: 'text-green-700 dark:text-green-400',
        icon: CheckCircle,
      },
      shipped: {
        label: 'Shipped',
        color: 'blue',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        textColor: 'text-blue-700 dark:text-blue-400',
        icon: Truck,
      },
      delivered: {
        label: 'Delivered',
        color: 'green',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        textColor: 'text-green-700 dark:text-green-400',
        icon: CheckCircle,
      },
      cancelled: {
        label: 'Cancelled',
        color: 'red',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        textColor: 'text-red-700 dark:text-red-400',
        icon: X,
      },
    };
    return statusMap[status] || statusMap.pending;
  };

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  const handleStatusUpdate = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      await onUpdateStatus(order._id, newStatus);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const nextStatus = {
    pending: 'paid',
    paid: 'shipped',
    shipped: 'delivered',
  };

  const nextStatusLabel = {
    pending: 'Mark as Paid',
    paid: 'Mark as Shipped',
    shipped: 'Mark as Delivered',
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-sm">
            <div className={`p-2 ${statusInfo.bgColor} rounded-lg`}>
              <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
            </div>
            <div>
              <h3 className="text-heading-md font-bold text-gray-900 dark:text-white">
                Order #{order._id.slice(-8).toUpperCase()}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-xs text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-md">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Customer & Shipping Info */}
            <div className="lg:col-span-1 space-y-md">
              {/* Customer Info */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-sm">
                <div className="flex items-center gap-sm mb-sm">
                  <User className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Customer Information
                  </h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Name
                    </label>
                    <p className="text-gray-900 dark:text-white font-medium mt-1">
                      {order.customerName}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Email
                    </label>
                    <p className="text-gray-900 dark:text-white mt-1">{order.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Phone
                    </label>
                    <p className="text-gray-900 dark:text-white font-medium mt-1">{order.phone}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-sm">
                <div className="flex items-center gap-sm mb-sm">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Shipping Address</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{order.address}</p>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-sm">
                <div className="flex items-center gap-sm mb-sm">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Payment Method</h4>
                </div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {order.paymentMethod || 'Cash on Delivery'}
                </p>
              </div>

              {/* Order Status */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-sm">
                <div className="flex items-center gap-sm mb-sm">
                  <Truck className="w-5 h-5 text-orange-600" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Order Status</h4>
                </div>
                <div
                  className={`flex items-center gap-sm px-sm py-xs rounded-lg ${statusInfo.bgColor}`}
                >
                  <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
                  <span className={`font-semibold ${statusInfo.textColor}`}>
                    {statusInfo.label}
                  </span>
                </div>
                {order.note && (
                  <div className="mt-sm">
                    <label className="text-small-text font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Note
                    </label>
                    <p className="text-gray-700 dark:text-gray-300 mt-xs text-body">{order.note}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-sm">
                <div className="flex items-center gap-sm mb-sm">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Order Items</h4>
                </div>

                {/* Items List */}
                <div className="space-y-xs">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-sm p-sm bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <img
                        src={item.productId?.thumbnail || '/placeholder.png'}
                        alt={item.productId?.name || 'Product'}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-xs">
                          {item.productId?.name || 'Deleted Product'}
                        </h5>
                        <p className="text-body text-gray-500 dark:text-gray-400">
                          SKU: {item.productId?.sku || 'N/A'}
                        </p>
                        <div className="flex items-center gap-sm mt-sm">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity:{' '}
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Price:{' '}
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {formatPrice(item.price)}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-md pt-md border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-xs">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span className="font-medium">{formatPrice(order.totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Shipping Fee</span>
                      <span className="font-medium">{formatPrice(order.shippingFee || 0)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600 dark:text-green-400 text-body">
                        <span>Discount</span>
                        <span className="font-medium">-{formatPrice(order.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span>Total</span>
                      <span className="text-red-600 dark:text-red-400">
                        {formatPrice(
                          order.totalPrice + (order.shippingFee || 0) - (order.discount || 0),
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-md border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Invoice
            </button>
            <div className="flex gap-3">
              {order.status !== 'cancelled' &&
                order.status !== 'delivered' &&
                nextStatus[order.status] && (
                  <button
                    onClick={() => handleStatusUpdate(nextStatus[order.status])}
                    disabled={updatingStatus}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updatingStatus ? 'Updating...' : nextStatusLabel[order.status]}
                  </button>
                )}
              {order.status === 'pending' && (
                <button
                  onClick={() => handleStatusUpdate('cancelled')}
                  disabled={updatingStatus}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
