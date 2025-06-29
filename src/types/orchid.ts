export interface Orchid {
  orchidId: number;
  orchidName: string;
  orchidDescription: string;
  price: number;
  orchidUrl: string;
  isNatural: boolean;
  categoryId?: number;
  categoryName?: string;
}

// For backward compatibility, create an alias
export interface OrchidDTO extends Orchid {}

// Category types
export interface Category {
  categoryId: number;
  categoryName: string;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  accountName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  accountId: string;
  accountName: string;
  email: string;
  roleId: number;
  roleName: string;
}

export interface RegisterResponse {
  accountId: string;
  accountName: string;
  email: string;
  roleId: number;
  roleName: string;
}

export interface AccountDTO {
  accountId: string;
  accountName: string;
  email: string;
  roleId: number;
  roleName: string;
}

export interface UpdateProfileRequest {
  accountName: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  result?: T;
}

export interface User {
  accountId: string;
  accountName: string;
  email: string;
  roleId: number;
  roleName: string;
  token: string;
}

// Admin types
export interface CreateAccountRequest {
  accountName: string;
  email: string;
  password: string;
  roleId: number;
}

export interface OrderDTO {
  id: number;
  accountId: number; // Backend uses Integer, so should be number
  accountName?: string; // For display purposes
  orderDate: string; // LocalDate from backend
  orderStatus: string;
  totalAmount: number; // Backend uses Double
  orderDetails: OrderDetailDTO[];
}

export interface OrderDetailDTO {
  id: number;
  orchidId: number;
  orchidName?: string; // For display purposes
  orchidUrl?: string; // For display purposes
  price: number; // Backend uses Double
  quantity: number;
  orderId?: number;
  subtotal?: number; // Calculated field (price * quantity)
}

// Order Detail types
export interface OrderDetail {
  id: number;
  orchid: Orchid;
  price: number;
  quantity: number;
  orderId: number;
}

// Order types
export interface Order {
  id: number;
  accountId: string; // Should be string to match authentication
  orderDate: string;
  orderStatus: string;
  totalAmount: number;
  orderDetails: OrderDetail[];
}

// Shopping Cart types - Updated to match backend DTOs
export interface CartItemDTO {
  orchidId: number;
  orchidName: string;
  price: number;
  quantity: number;
  subtotal: number;
  orchidUrl: string;
}

export interface ShoppingCartDTO {
  items: CartItemDTO[];
  totalAmount: number;
  totalItems: number;
}

// Legacy cart item interface for backward compatibility
export interface CartItem {
  orchid: Orchid;
  quantity: number;
  price: number;
}

// Additional Order DTO for API responses
export interface OrderResponse extends Order {
  accountName?: string;
}

// Admin Request Types
export interface CreateOrchidRequest {
  orchidName: string;
  isNatural: boolean;
  categoryId: number;
  orchidDescription: string;
  price: number;
  orchidUrl: string;
}

export interface UpdateOrchidRequest extends CreateOrchidRequest {}

export interface CreateOrderRequest {
  accountId: number; // Backend uses Integer
  orderDate: string; // LocalDate format
  orderStatus: string;
  totalAmount: number; // Backend uses Double
  orderDetails: CreateOrderDetailRequest[];
}

export interface CreateOrderDetailRequest {
  orchidId: number;
  quantity: number;
  price: number; // Backend uses Double
}

// For the new order endpoint that accepts items
export interface CreateOrderFromCartRequest {
  items: CartItemDTO[];
}

export interface UpdateOrderRequest {
  orderDate: string;
  totalAmount: number;
  orderStatus: string; // Changed to match orderStatus field
  address?: string;
  phone?: string;
  notes?: string;
  accountId: string; // Should be string to match authentication
}

export interface CreateAccountRequest {
  accountName: string;
  email: string;
  password: string;
  roleId: number;
}

export interface UpdateAccountRequest {
  accountName: string;
  email: string;
  password?: string;
  roleId?: number; // Optional to allow non-superadmin users to update without changing role
}