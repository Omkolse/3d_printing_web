import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from './OrderForm';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const confirmOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/orders/${orderId}/confirm`, 
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert('Order confirmed! You will receive email updates.');
      fetchMyOrders();
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  if (loading) return <div className="loading">Loading your orders...</div>;

  return (
    <div className="customer-dashboard">
      <div className="dashboard-header">
        <h2>My 3D Printing Orders</h2>
        <button 
          onClick={() => setShowOrderForm(true)}
          className="btn btn-primary"
        >
          + New Print Order
        </button>
      </div>

      {showOrderForm ? (
        <OrderForm 
          onOrderCreated={() => {
            setShowOrderForm(false);
            fetchMyOrders();
          }}
          onCancel={() => setShowOrderForm(false)}
        />
      ) : (
        <div className="my-orders">
          {orders.length === 0 ? (
            <div className="no-orders">
              <h3>No orders yet</h3>
              <p>Create your first 3D print order to get started!</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h4>Order #{order.id} - {order.fileName}</h4>
                  <span className={`status ${order.status}`}>{order.status}</span>
                </div>
                
                <div className="order-info">
                  <p><strong>Material:</strong> {order.material} | <strong>Color:</strong> {order.color}</p>
                  <p><strong>Infill:</strong> {order.infill}% | <strong>Quantity:</strong> {order.quantity}</p>
                  
                  {order.price && (
                    <div className="quote-info">
                      <p><strong>Quoted Price:</strong> ${order.price}</p>
                      <p><strong>Time Estimate:</strong> {order.timeEstimate}</p>
                      <p><strong>Delivery By:</strong> {order.deliveryDate}</p>
                      
                      {order.status === 'quoted' && (
                        <button 
                          onClick={() => confirmOrder(order.id)}
                          className="btn btn-success"
                        >
                          Confirm & Pay
                        </button>
                      )}
                    </div>
                  )}
                  
                  {order.status === 'pending' && (
                    <p className="waiting">Waiting for price quote from admin...</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;