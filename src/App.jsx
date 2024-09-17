// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyForm from './usedcomponent/MyForm';
import Dashboard from './usedcomponent/dashboard/Dashboard';
import ProtectedRoute from './usedcomponent/protected/ProtectedRoute';

const fieldConfig = {
  email: {
    type: 'email',
    placeholder: 'Enter your email',
    label: 'email',
    validation: 'email is required'
  },
  password: {
    type: 'password',
    placeholder: 'Enter your password',
    label: 'password',
    validation: 'password is required'
  },
};

const handleFormSubmit = (formData) => {
  console.log('Form Data Submitted:', formData);
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<MyForm fieldConfig={fieldConfig} onSubmit={handleFormSubmit} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

{/* <Router>
<Routes>
  <Route path="/login" element={<MyForm fieldConfig={fieldConfig} onSubmit={handleFormSubmit} />} />
  <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>
</Router> */}