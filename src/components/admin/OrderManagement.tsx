import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaTrash } from 'react-icons/fa';
import { formatPrice } from '../../utils/formatters';

interface OrderItem {
  orchid: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
}

const OrderManagement: React.FC = () => {
  // Temporary mock data - replace with API call later
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      customerName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City",
      items: [
        {
          orchid: {
            id: 1,
            name: "Phalaenopsis Pink",
            price: 1250000,
            imageUrl: "https://images.unsplash.com/photo-1567957452651-302037461536"
          },
          quantity: 2
        }
      ],
      totalAmount: 2500000,
      status: "pending",
      orderDate: "2024-03-15"
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: '#f0ad4e',
      processing: '#5bc0de',
      shipped: '#0275d8',
      delivered: '#5cb85c',
      cancelled: '#d9534f'
    };
    return colors[status];
  };

  const handleView = (order: Order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Order Management</h2>
      </div>

      <motion.table
        className="management-table"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <motion.tr
              key={order.id}
              variants={rowVariants}
              whileHover={{ backgroundColor: 'rgba(155, 77, 255, 0.05)' }}
            >
              <td>#{order.id}</td>
              <td>{order.customerName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{formatPrice(order.totalAmount)} VND</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                  style={{
                    backgroundColor: getStatusColor(order.status),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="action-buttons">
                <motion.button
                  className="view-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleView(order)}
                >
                  <FaEye />
                </motion.button>
                <motion.button
                  className="delete-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(order.id)}
                >
                  <FaTrash />
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      <AnimatePresence>
        {isModalOpen && currentOrder && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal order-details-modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <h3>Order Details</h3>
              <div className="order-details">
                <div className="customer-info">
                  <h4>Customer Information</h4>
                  <p><strong>Name:</strong> {currentOrder.customerName}</p>
                  <p><strong>Email:</strong> {currentOrder.email}</p>
                  <p><strong>Phone:</strong> {currentOrder.phone}</p>
                  <p><strong>Address:</strong> {currentOrder.address}</p>
                </div>
                <div className="order-items">
                  <h4>Order Items</h4>
                  {currentOrder.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img 
                        src={item.orchid.imageUrl} 
                        alt={item.orchid.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div className="item-details">
                        <p>{item.orchid.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>{formatPrice(item.orchid.price * item.quantity)} VND</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-summary">
                  <h4>Order Summary</h4>
                  <p><strong>Total Amount:</strong> {formatPrice(currentOrder.totalAmount)} VND</p>
                  <p><strong>Order Date:</strong> {new Date(currentOrder.orderDate).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {currentOrder.status}</p>
                </div>
              </div>
              <div className="modal-buttons">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderManagement; 