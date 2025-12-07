import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Main1 from './layout/Main';

function App() {
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));

  const setAuthToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('jwt_token', newToken);
    } else {
      localStorage.removeItem('jwt_token');
    }
    setToken(newToken);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route 
            path="/*"
            element={
              <PrivateRoute token={token}>
                <Main1 />
              </PrivateRoute>
            } 
          />
          <Route path="/auth/callback" element={<AuthCallback setAuthToken={setAuthToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

const PrivateRoute = ({ children, token }) => {
  return token ? children : <Navigate to="/login" />;
};

const AuthCallback = ({ setAuthToken }) => {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            setAuthToken(token);
        }
    }, [location, setAuthToken]);

    return <Navigate to="/" />;
};

export default App;