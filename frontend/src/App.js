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
import LecturerStudentsPage from './pages/LecturerStudentsPage';
import LecturerStudentScoresPage from './pages/LecturerStudentScoresPage';
import LecturerAddScorePage from './pages/LecturerAddScorePage';
import LecturerEditScorePage from './pages/LecturerEditScorePage';
import LecturerNotificationsPage from './pages/LecturerNotificationsPage';
import StudentScoreHistoryPage from './pages/StudentScoreHistoryPage';
import StudentNotificationsPage from './pages/StudentNotificationsPage';
import ScoreVisualizationPage from './pages/ScoreVisualizationPage';
import DummyStudentListPage from './pages/DummyStudentListPage';
import Navbar from './components/Navbar';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/"       element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/scores" element={<PrivateRoute><ScoreHistoryPage /></PrivateRoute>} />
        <Route path="/upload" element={<PrivateRoute><UploadScorePage /></PrivateRoute>} />
        <Route path="/score-visualization" element={<PrivateRoute><ScoreVisualizationPage /></PrivateRoute>} />
        {/* Lecturer routes */}
        <Route path="/lecturer/students" element={<PrivateRoute><LecturerStudentsPage /></PrivateRoute>} />
        <Route path="/lecturer/student/:id/scores" element={<PrivateRoute><LecturerStudentScoresPage /></PrivateRoute>} />
        <Route path="/lecturer/student/:id/add-score" element={<PrivateRoute><LecturerAddScorePage /></PrivateRoute>} />
        <Route path="/lecturer/scores/:id/edit" element={<PrivateRoute><LecturerEditScorePage /></PrivateRoute>} />
        <Route path="/lecturer/notifications" element={<PrivateRoute><LecturerNotificationsPage /></PrivateRoute>} />
        {/* Student routes */}
        <Route path="/student/scores" element={<PrivateRoute><StudentScoreHistoryPage /></PrivateRoute>} />
        <Route path="/student/notifications" element={<PrivateRoute><StudentNotificationsPage /></PrivateRoute>} />
        <Route path="/dummy-students" element={<PrivateRoute><DummyStudentListPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;