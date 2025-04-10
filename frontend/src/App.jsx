import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components and pages
import Layout from './layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  document.title = 'ZULU UrbanMetrics';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
