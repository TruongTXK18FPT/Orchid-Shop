import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Orchid {
  id: number;
  name: string;
  species: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const OrchidManagement: React.FC = () => {
  const [orchids, setOrchids] = useState<Orchid[]>([
    { 
      id: 1, 
      name: 'Purple Phalaenopsis', 
      species: 'Phalaenopsis', 
      price: 29.99, 
      stock: 15,
      imageUrl: '/orchid1.jpg'
    },
    { 
      id: 2, 
      name: 'Pink Cattleya', 
      species: 'Cattleya', 
      price: 39.99, 
      stock: 10,
      imageUrl: '/orchid2.jpg'
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrchid, setCurrentOrchid] = useState<Orchid | null>(null);

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
            <th>Species</th>
            <th>Price</th>
            <th>Stock</th>
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
                />
              </td>
              <td>{orchid.name}</td>
              <td>{orchid.species}</td>
              <td>${orchid.price.toFixed(2)}</td>
              <td>{orchid.stock}</td>
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