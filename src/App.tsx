import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
import { API_BASE_URL } from './config/api';

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Checking connection...');
  const [backendUrl, setBackendUrl] = useState<string>(API_BASE_URL);
  const [errorDetails, setErrorDetails] = useState<string>('');

  useEffect(() => {
    // Test API connection with multiple approaches
    const testConnection = async () => {
      try {
        console.log('Testing connection to:', API_BASE_URL);
        
        // Try different endpoints
        const endpoints = ['/', '/api', '/health', '/ping'];
        let connected = false;
        
        for (const endpoint of endpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint}`);
            const response = await apiService.get(endpoint);
            console.log(`Success with endpoint ${endpoint}:`, response.status);
            setApiStatus(`Connected to backend successfully! (Endpoint: ${endpoint})`);
            connected = true;
            break;
          } catch (endpointError) {
            console.log(`Failed endpoint ${endpoint}:`, endpointError);
            continue;
          }
        }
        
        if (!connected) {
          // Try a simple fetch without the API service
          try {
            console.log('Trying direct fetch to root');
            const directResponse = await fetch(API_BASE_URL, {
              method: 'GET',
              mode: 'no-cors',
            });
            console.log('Direct fetch response:', directResponse);
            setApiStatus('Backend reachable (CORS limited)');
          } catch (directError) {
            console.error('Direct fetch failed:', directError);
            setApiStatus('Backend connection failed');
            setErrorDetails(directError instanceof Error ? directError.message : 'Unknown error');
          }
        }
      } catch (error) {
        console.error('All connection attempts failed:', error);
        setApiStatus('Backend connection failed');
        setErrorDetails(error instanceof Error ? error.message : 'Unknown error');
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
        {errorDetails && (
          <p><strong>Error:</strong> {errorDetails}</p>
        )}
      </div>
    </div>
  );
}

export default App;
