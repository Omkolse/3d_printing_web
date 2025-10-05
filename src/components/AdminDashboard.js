import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const sendQuote = async (orderId, price, timeEstimate, deliveryDate) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/orders/${orderId}/estimate`, 
        {
          price,
          timeEstimate,
          deliveryDate
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      alert('Quote sent successfully! Customer will receive email notification.');
      fetchAllOrders(); // Refresh orders
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error sending quote:', error);
      alert('Error sending quote');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (status === 'completed') {
        alert('Order marked as completed! Customer will receive completion email.');
      }
      fetchAllOrders();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard - Order Management</h2>
      
      {selectedOrder ? (
        <QuoteForm 
          order={selectedOrder}
          onSendQuote={sendQuote}
          onCancel={() => setSelectedOrder(null)}
        />
      ) : (
        <div className="orders-list">
          <h3>All Customer Orders ({orders.length})</h3>
          
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h4>Order #{order.id}</h4>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>
              
              <div className="order-details">
                <p><strong>Customer:</strong> {order.User?.name} ({order.User?.email})</p>
                <p><strong>File:</strong> {order.fileName}</p>
                <p><strong>Material:</strong> {order.material} | Color: {order.color}</p>
                <p><strong>Infill:</strong> {order.infill}% | Quantity: {order.quantity}</p>
                <p><strong>Delivery:</strong> {order.deliveryOption}</p>
                
                {order.price && (
                  <p><strong>Quoted Price:</strong> ${order.price}</p>
                )}
                {order.timeEstimate && (
                  <p><strong>Time Estimate:</strong> {order.timeEstimate}</p>
                )}
              </div>

              <div className="order-actions">
                {!order.price && (
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="btn btn-primary"
                  >
                    Send Quote
                  </button>
                )}
                
                <select 
                  value={order.status} 
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="quoted">Quoted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="printing">Printing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const QuoteForm = ({ order, onSendQuote, onCancel }) => {
  const [price, setPrice] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!price || !timeEstimate || !deliveryDate) {
      alert('Please fill all fields');
      return;
    }
    onSendQuote(order.id, parseFloat(price), timeEstimate, deliveryDate);
  };

  return (
    <div className="quote-form">
      <h3>Send Quote for Order #{order.id}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Price ($):</label>
          <input 
            type="number" 
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Time Estimate:</label>
          <input 
            type="text" 
            placeholder="e.g., 3-5 business days"
            value={timeEstimate}
            onChange={(e) => setTimeEstimate(e.target.value)}
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Delivery Date:</label>
          <input 
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required 
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-success">Send Quote to Customer</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;