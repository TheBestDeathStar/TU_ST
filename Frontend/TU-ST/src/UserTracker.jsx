import React, { useState } from 'react';
import './UserTracker.css'; 

const UserTracker = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  const handleTrackClick = async () => {
    if (!email && !username) {
      setError('Please enter a valid email or username.');
      return;
    }

    try {
      // Fetch user credentials
      const credentialsResponse = await fetch(`your-credentials-api-endpoint?email=${email}&username=${username}`);

      if (!credentialsResponse.ok) {
        throw new Error('Internal server error. Please try again later.');
      }

      const credentialsData = await credentialsResponse.json();

      if (!credentialsData) {
        throw new Error('Invalid email or username. Please enter a valid user.');
      }

      // Fetch user data using the retrieved credentials
      const userDataResponse = await fetch(`your-user-data-api-endpoint?userId=${credentialsData.userId}`);
      const userData = await userDataResponse.json();

      if (!userDataResponse.ok || !userData) {
        throw new Error('Failed to fetch user data.');
      }

      setUserInfo(userData);
      setError('');
    } catch (error) {
      setError(error.message);
      setUserInfo(null); 
    }
  };

  return (
    <div>
      <h1 className="header">User Tracker</h1>
      <div className="user-tracker-container">
        <div className="input-container">
          <label>Email:</label>
          <input className="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Username:</label>
          <input className="input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <button className="button" onClick={handleTrackClick}>Track</button>

        {error && <p className="error-message">{error}</p>}

        {userInfo && (
          <div className="user-info-container">
            <h2>User Information</h2>
            <p>Age: {userInfo.age}</p>
            <p>Daily Steps: {userInfo.dailySteps}</p>
            <p>Workouts: {userInfo.workouts}</p>
            <p>Body Fat: {userInfo.bodyFat}%</p>
            <p>Lean Body Mass: {userInfo.leanBodyMass} kg</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTracker;
