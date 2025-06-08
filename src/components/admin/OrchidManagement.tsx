import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { formatPrice } from '../../utils/formatters';

interface Orchid {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const OrchidManagement: React.FC = () => {
  const [orchids, setOrchids] = useState<Orchid[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrchid, setCurrentOrchid] = useState<Orchid | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrchids();
  }, []);

  const fetchOrchids = async () => {
    try {
      const response = await fetch('https://68426af6e1347494c31cbc60.mockapi.io/api/orchid/Orchids');
      const data = await response.json();
      setOrchids(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orchids:', error);
      setLoading(false);
    }
  };

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

  const handleEdit = (orchid: Orchid) => {
    setCurrentOrchid(orchid);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setOrchids(orchids.filter(orchid => orchid.id !== id));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Orchid Management</h2>
        <motion.button
          className="add-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentOrchid(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus /> Add Orchid
        </motion.button>
      </div>

      <motion.table
        className="management-table"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orchids.map((orchid) => (
            <motion.tr
              key={orchid.id}
              variants={rowVariants}
              whileHover={{ backgroundColor: 'rgba(155, 77, 255, 0.05)' }}
            >
              <td>
                <img 
                  src={orchid.imageUrl} 
                  alt={orchid.name} 
                  className="orchid-thumbnail"
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </td>
              <td>{orchid.name}</td>
              <td>
                <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {orchid.description}
                </div>
              </td>
              <td>{formatPrice(orchid.price)} VND</td>
              <td className="action-buttons">
                <motion.button
                  className="edit-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(orchid)}
                >
                  <FaEdit />
                </motion.button>
                <motion.button
                  className="delete-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(orchid.id)}
                >
                  <FaTrash />
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <h3>{currentOrchid ? 'Edit Orchid' : 'Add Orchid'}</h3>
              {/* Form content will be added later */}
              <div className="modal-buttons">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="save-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrchidManagement; 