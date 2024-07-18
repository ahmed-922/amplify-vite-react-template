import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import TopNavigation from './components/TopNavigation';
import HomePage from './pages/homePage/HomePage';
import Login from './pages/Login';
import Register from './pages/register'; 
import Profile from './pages/profile'; 
import Mail from './pages/user-mail'; 


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <TopNavigation />
        <Routes>
          <Route path="/" element={<HomePage queryClient={queryClient}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user-mail" element={<Mail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
