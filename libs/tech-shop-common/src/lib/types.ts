// Customer table
export type Customer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
};

// Product table
export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
};

// Order table
export type Order = {
  id: string;
  customer_id: string;
  order_date: string;
  total_amount: number;
  items: OrderItem[];
};

// Order Item table
export type OrderItem = {
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
};

export type DetaildOrderItem = OrderItem & {
  product: Product;
};

export type DetaildOrder = {
  id: string;
  customer: Customer;
  order_date: string;
  total_amount: number;
  items: DetaildOrderItem[];
};
