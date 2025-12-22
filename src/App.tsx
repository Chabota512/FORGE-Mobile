import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
import { API_BASE_URL } from './config/api';

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Checking connection...');
  const [backendUrl, setBackendUrl] = useState<string>(API_BASE_URL);

  useEffect(() => {
    // Test API connection
    const testConnection = async () => {
      try {
        // Try to connect to the backend
        const response = await apiService.get('/');
        setApiStatus('Connected to backend successfully!');
        console.log('Backend connected:', API_BASE_URL);
      } catch (error) {
        setApiStatus('Backend connection failed');
        console.error('Backend connection error:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="app">
      <h1>FORGE Mobile App</h1>
      <p>Welcome to FORGE Mobile</p>
      <div className="api-status">
        <h3>Backend Connection</h3>
        <p><strong>URL:</strong> {backendUrl}</p>
        <p><strong>Status:</strong> {apiStatus}</p>
      </div>
    </div>
  );
}

export default App;
