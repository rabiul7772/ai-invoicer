import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { ScrollToTop } from './components/layout/ScrollToTop';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import CreateEditInvoice from './pages/CreateInvoice';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import InvoiceDetails from './pages/InvoiceDetails';
import CheckoutSuccess from './pages/CheckoutSuccess';

import { ProtectedRoute } from './components/auth/ProtectedRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/create-invoice" element={<CreateEditInvoice />} />
            <Route path="/edit-invoice/:id" element={<CreateEditInvoice />} />
            <Route path="/invoices/:id" element={<InvoiceDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 5000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-bg-card)',
            color: 'var(--color-text-bright)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)'
          }
        }}
      />
    </>
  );
};

export default App;
