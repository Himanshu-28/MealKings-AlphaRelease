import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrdersHistory = () => {
  // Dummy data for past orders
  const pastOrders = [
    { id: 1, item: "Pizza", quantity: 2, price: 20.00 },
    { id: 2, item: "Burger", quantity: 1, price: 10.00 },
    { id: 3, item: "Pasta", quantity: 3, price: 30.00 },
    { id: 4, item: "Salad", quantity: 1, price: 7.50 },
  ];

  return (
    <div className="container my-4">
      <h2 className="text-center">Order History</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {pastOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
                <td>{order.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersHistory;
