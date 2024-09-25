import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LiveOrderStatus = () => {
  // Dummy data for orders
  const orders = [
    { id: 1, item: "Pizza", status: "Active" },
    { id: 2, item: "Burger", status: "Inactive" },
    { id: 3, item: "Pasta", status: "Active" },
    { id: 4, item: "Salad", status: "Inactive" },
  ];

  return (
    <div className="container my-4">
      <h2 className="text-center">Live Order Status</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.item}</td>
                <td className={order.status === "Active" ? "text-success" : "text-secondary"}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveOrderStatus;
