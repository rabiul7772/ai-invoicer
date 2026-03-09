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
import InvoiceDetails from './pages/InvoiceDetails';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/create-invoice" element={<CreateEditInvoice />} />
          <Route path="/edit-invoice/:id" element={<CreateEditInvoice />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
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
