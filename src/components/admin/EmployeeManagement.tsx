import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { adminAPI } from '../../utils/api';
import type { AccountDTO, CreateAccountRequest, UpdateAccountRequest } from '../../types/orchid';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<AccountDTO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<AccountDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    accountName: '',
    email: '',
    password: '',
    roleId: 2 // Default to Admin role (roleId 2)
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAllAccounts();
      setEmployees(data);
      toast.success(`Loaded ${data.length} accounts successfully!`);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load accounts. Please try again.');
    } finally {
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

  const handleEdit = (employee: AccountDTO) => {
    setCurrentEmployee(employee);
    setFormData({
      accountName: employee.accountName,
      email: employee.email,
      password: '',
      roleId: employee.roleId
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentEmployee(null);
    setFormData({
      accountName: '',
      email: '',
      password: '',
      roleId: 2 // Default to Admin role (roleId 2)
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.accountName.trim() || !formData.email.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!currentEmployee && !formData.password.trim()) {
      toast.error('Password is required for new accounts');
      return;
    }

    try {
      if (currentEmployee) {
        // Update existing employee
        const updateData: UpdateAccountRequest = {
          accountName: formData.accountName,
          email: formData.email,
          roleId: formData.roleId,
          ...(formData.password.trim() && { password: formData.password })
        };
        
        const updatedEmployee = await adminAPI.updateAccount(parseInt(currentEmployee.accountId), updateData);
        setEmployees(employees.map(emp => 
          emp.accountId === currentEmployee.accountId ? updatedEmployee : emp
        ));
        toast.success('Account updated successfully!');
      } else {
        // Create new employee
        const createData: CreateAccountRequest = {
          accountName: formData.accountName,
          email: formData.email,
          password: formData.password,
          roleId: formData.roleId
        };
        
        const newEmployee = await adminAPI.createAccount(createData);
        setEmployees([...employees, newEmployee]);
        toast.success('Account created successfully!');
      }
      
      setIsModalOpen(false);
      setFormData({ accountName: '', email: '', password: '', roleId: 2 });
    } catch (error) {
      console.error('Error saving account:', error);
      toast.error(currentEmployee ? 'Failed to update account' : 'Failed to create account');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await adminAPI.deleteAccount(parseInt(id));
        setEmployees(employees.filter(emp => emp.accountId !== id));
        toast.success('Account deleted successfully!');
      } catch (error) {
        console.error('Error deleting account:', error);
        toast.error('Failed to delete account. Please try again.');
      }
    }
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
        <h2>Account Management</h2>
        <motion.button
          className="add-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
        >
          <FaPlus /> Add Account
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
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <motion.tr
              key={employee.accountId}
              variants={rowVariants}
              whileHover={{ backgroundColor: 'rgba(155, 77, 255, 0.05)' }}
            >
              <td>{employee.accountName}</td>
              <td>{employee.email}</td>
              <td style={{ textTransform: 'capitalize' }}>{employee.roleName}</td>
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
                  onClick={() => handleDelete(employee.accountId)}
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
              <h3>{currentEmployee ? 'Edit Account' : 'Add Account'}</h3>
              <form onSubmit={handleSubmit} className="employee-form">
                <div className="form-group">
                  <label htmlFor="accountName">Name *</label>
                  <input
                    type="text"
                    id="accountName"
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    placeholder="Enter account name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    Password {currentEmployee ? '(leave blank to keep current)' : '*'}
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={currentEmployee ? 'Enter new password' : 'Enter password'}
                      required={!currentEmployee}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="roleId">Role *</label>
                  <select
                    id="roleId"
                    value={formData.roleId}
                    onChange={(e) => setFormData({ ...formData, roleId: parseInt(e.target.value) })}
                    required
                  >
                    <option value={2}>Admin</option>
                    <option value={3}>Customer</option>
                  </select>
                </div>

                <div className="modal-buttons">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsModalOpen(false);
                      setFormData({ accountName: '', email: '', password: '', roleId: 2 });
                    }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="save-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentEmployee ? 'Update' : 'Create'} Account
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeeManagement; 