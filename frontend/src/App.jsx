import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

// Import components and pages
import Layout from './layout/Layout';
import Home from './pages/Home';
import SuburbExplorer from './pages/SuburbExplorer';
import UserDashboard from './pages/UserDashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthPage from './pages/AuthPage';

const theme = createTheme({ cssVariables: true });

function App() {
  document.title = 'ZULU UrbanMetrics';

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/explorer" element={<SuburbExplorer />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
