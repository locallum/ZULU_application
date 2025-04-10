import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

/**
 * The header component contains a navigation bar with a login button.
 */
const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
        <h2>ZULU Urban Metrics</h2>

        <Button variant="text" onClick={() => navigate('/')}>
          Dashboard
        </Button>

        <Button variant="contained" onClick={() => navigate('/login')}>
          Login
        </Button>
    </div>
  );
};

export default Header;
