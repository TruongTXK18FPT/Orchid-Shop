import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Employee {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
}

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Doe', position: 'Manager', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', position: 'Sales', email: 'jane@example.com', phone: '123-456-7891' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

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

  const handleEdit = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Employee Management</h2>
        <motion.button
          className="add-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentEmployee(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus /> Add Employee
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
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <motion.tr
              key={employee.id}
              variants={rowVariants}
              whileHover={{ backgroundColor: 'rgba(155, 77, 255, 0.05)' }}
            >
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td className="action-buttons">
                <motion.button
                  className="edit-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(employee)}
                >
                  <FaEdit />
                </motion.button>
                <motion.button
                  className="delete-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(employee.id)}
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
              <h3>{currentEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
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

export default EmployeeManagement; 