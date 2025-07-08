import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import RegisterPage from './pages/RegisterPage';
import LoginPage         from './pages/LoginPage';
import DashboardPage     from './pages/DashboardPage';
import ScoreHistoryPage from './pages/ScoreHistoryPage';
import UploadScorePage   from './pages/UploadScorePage';
import PrivateRoute      from './components/PrivateRoute';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/"       element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/scores" element={<PrivateRoute><ScoreHistoryPage /></PrivateRoute>} />
        <Route path="/upload" element={<PrivateRoute><UploadScorePage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;