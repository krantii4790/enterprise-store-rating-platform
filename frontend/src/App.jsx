import {
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Login from './pages/Login';

import Register from './pages/Register';

import AdminDashboard from './pages/AdminDashboard';

import UserDashboard from './pages/UserDashboard';

import StoreOwnerDashboard from './pages/StoreOwnerDashboard';

import ProtectedRoute from './components/ProtectedRoute';

import OwnerDashboard from './pages/OwnerDashboard';

function App() {

  return (
    <>

      <Navbar />

      <Routes>

        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='/register'
          element={<Register />}
        />

        <Route
          path='/admin'
          element={
            <ProtectedRoute role='ADMIN'>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/user'
          element={
            <ProtectedRoute role='USER'>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/owner'
          element={
            <ProtectedRoute role='STORE_OWNER'>
              <StoreOwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path='/owner'
  element={
    <ProtectedRoute role='STORE_OWNER'>
      <OwnerDashboard />
    </ProtectedRoute>
  }
/>

      </Routes>

    </>
  );
}

export default App;