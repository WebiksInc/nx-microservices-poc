import axios from 'axios';
import { Customer, DetaildOrder, Order, Product } from '@tech-shop/common';
import {DB_PORT, HOST} from '../consts';

const TECH_SHOP_DB_URL = `http://${HOST}:${DB_PORT}`;

const resolvers = {
  Query: {
    orders: async ():Promise<Order> => {
      console.log(`${TECH_SHOP_DB_URL}/orders`);
      const orderResponse = await axios.get<Order>(
        `${TECH_SHOP_DB_URL}/orders`
      );
      if (orderResponse.status !== 200) {
        throw new Error(`Orders not found `);
      }

      return orderResponse.data;
    },
    order: async (_, { id }: { id: string }): Promise<DetaildOrder> => {
      console.log({ id });
      const orderResponse = await axios.get<Order>(
        `${TECH_SHOP_DB_URL}/orders/${id}`
      );
      if (orderResponse.status !== 200) {
        throw new Error(`Order with ID ${id} not found`);
      }
      const order = orderResponse.data;

      const customerResponse = await axios.get<Customer>(
        `${TECH_SHOP_DB_URL}/customers/${order.customer_id}`
      );
      if (customerResponse.status !== 200) {
        throw new Error(`Customer with ID ${order.customer_id} not found`);
      }
      const customer = customerResponse.data;

      const products: Product[] = await Promise.all(
        order.items.map(async (item) => {
          const productResponse = await axios.get<Product>(
            `${TECH_SHOP_DB_URL}/products/${item.product_id}`
          );
          if (productResponse.status !== 200) {
            throw new Error(`Product with ID ${item.product_id} not found`);
          }
          return productResponse.data;
        })
      );

      const detailedOrderItems = order.items.map((item) => {
        const product = products.find((p) => p.id);
        return { ...item, product };
      });

      return {
        id: order.id,
        customer: customer,
        order_date: order.order_date,
        total_amount: order.total_amount,
        items: detailedOrderItems,
      };
    },
  },
};

export default resolvers;
