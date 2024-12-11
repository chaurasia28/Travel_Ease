import React, { useState } from 'react';
import '../styles/admin.css';
import SettingsPage from './Setting.jsx';  // Import SettingsPage component
import { Line } from 'react-chartjs-2';  // Import chart library for user graph
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    image: null,
    subscription: 'basic', // Default subscription
  });
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard'); // Track active page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData({
        ...userData,
        image: imageUrl,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email || !userData.age) {
      alert('Please fill in all fields!');
      return;
    }
    setUsers([...users, { ...userData, id: Date.now() }]);
    setUserData({ name: '', email: '', age: '', image: null, subscription: 'basic' });
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setUserData(userToEdit);
    handleDelete(id);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Age'];
    const rows = users.map((user) => [user.id, user.name, user.email, user.age]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach((row) => {
      csvContent += row.join(',') + '\n';
    });

    // Create a link to download the CSV
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'users.csv');
    link.click();
  };

  // Graph data: users per subscription plan
  const subscriptionData = {
    labels: ['Basic', 'Regular', 'Premium'],
    datasets: [
      {
        label: 'Users by Subscription',
        data: [
          users.filter((user) => user.subscription === 'basic').length,
          users.filter((user) => user.subscription === 'regular').length,
          users.filter((user) => user.subscription === 'premium').length,
        ],
        fill: false,
        borderColor: 'rgb(234, 163, 38)',
        tension: 0.1,
      },
    ],
  };

  // Graph options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Subscription Breakdown',
      },
    },
  };
  
  

  // Counts for subscription types
  const basicUsers = users.filter((user) => user.subscription === 'basic').length;
  const regularUsers = users.filter((user) => user.subscription === 'regular').length;
  const premiumUsers = users.filter((user) => user.subscription === 'premium').length;

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Admin Dashboard</h2>
          <ul>
            <li onClick={() => setCurrentPage('dashboard')}>Dashboard</li>
            <li onClick={() => setCurrentPage('users')}>Users</li>
            <li onClick={() => setCurrentPage('settings')}>Settings</li>
            <li onClick={exportCSV}>Export CSV</li> {/* Add Export CSV option */}
          </ul>
        </div>

        {/* Main Content */}
        <div className="admin-content">
          <h1 className="page-title">
            {currentPage === 'settings' ? 'Settings' : 'Admin Panel'}
          </h1>

          {currentPage === 'dashboard' && (
            <div>
              {/* Dashboard content */}
              <div className="statistics">
                <div className="stat-cards">
                  <h3>Total Users</h3>
                  <p>{users.length}</p>
                </div>
                <div className="stat-cards">
                  <h3>Active Users</h3>
                  <p>{filteredUsers.length}</p>
                </div>
              </div>
              {/* User Graph */}
              <div className="user-graph" style={{color:"black"}}>
                <Line data={subscriptionData} options={options} />
              </div>

              {/* Subscription Cards */}
              <div className="subscription-cardss">
                <div className="cards">
                  <h3>Basic</h3>
                  <p>{basicUsers} Users</p>
                </div>
                <div className="cards">
                  <h3>Regular</h3>
                  <p>{regularUsers} Users</p>
                </div>
                <div className="cards">
                  <h3>Premium</h3>
                  <p>{premiumUsers} Users</p>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'users' && (
            <div>
              {/* User list content */}
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search users by name..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="search-input"
                />
              </div>
              <div className="user-list">
                <h2>User List</h2>
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Subscription</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          {user.image && (
                            <img src={user.image} alt="User" className="table-image" />
                          )}
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.subscription}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="action-button edit-button"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="action-button delete-button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Add/Edit Form */}
              <div className="form-container">
                <div className="image-container">
                  {userData.image ? (
                    <img src={userData.image} alt="User" className="user-image" />
                  ) : (
                    <div className="image-placeholder">Upload Image</div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload"
                  />
                </div>

                <div className="form-data">
                  <form onSubmit={handleSubmit} className="form-cards">
                    <div className="form-group">
                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter Name"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter Email"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Age:</label>
                      <input
                        type="number"
                        name="age"
                        value={userData.age}
                        onChange={handleChange}
                        required
                        placeholder="Enter Age"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Subscription:</label>
                      <select
                        name="subscription"
                        value={userData.subscription}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="basic">Basic</option>
                        <option value="regular">Regular</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                    <button type="submit" className="submit-button">
                      {userData.id ? 'Update' : 'Save'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'settings' && (
            <SettingsPage />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
