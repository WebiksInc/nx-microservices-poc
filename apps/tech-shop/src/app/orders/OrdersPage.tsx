import React, { useEffect, useState } from 'react';
import styles from './OrdersPage.module.scss';
import { DetaildOrder } from '@tech-shop/common';
import { API_URL } from '../consts';

const OrdersPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<DetaildOrder | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  const fetchOrder = async (id: string) => {
    // Replace this URL with your API service URL

    try {
      const res = await  fetch(API_URL, {
        headers: {
          'content-type': 'application/json',
        },
        body: `{"query":"{\\n  order(id: ${id}) {\\n    id\\n    customer {\\n      first_name\\n      last_name\\n    }\\n    order_date\\n    total_amount\\n    items {\\n      product {\\n        id\\n        name\\n        description\\n        price\\n      }\\n      quantity\\n      price\\n    }\\n  }\\n}","extensions":{}}`,
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
      }).then(data=>data.json());

      setOrder(res?.data?.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="number"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter order ID"
        />
        {/* <button onClick={() => fetchOrder(orderId)}>Fetch Order</button> */}
      </div>

      {order && (
        <div key={order.id} className={styles.order}>
          <div className={styles.orderDetails}>
            <h2>Order #{order.id}</h2>
            <p>
              Customer: {order.customer.first_name} {order.customer.last_name}
            </p>
            <p>Date: {order.order_date}</p>
            <p>Total Amount: ${order.total_amount.toFixed(2)}</p>
          </div>
          <div className={styles.orderItems}>
            <h3>Items:</h3>
            {order.items.map((item) => (
              <div key={item.product.id+item.product.price} className={styles.orderItem}>
                <p>
                  {item.product.name} - ${item.price.toFixed(2)} x{' '}
                  {item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
