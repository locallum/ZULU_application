import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Custom styling for nav text buttons
const TextButton = styled(Button)({
  color: 'white',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
});

/**
 * The header component contains a navigation bar with a login button.
 */
const Header = () => {
  return (
    <header className="header-container">
        <h2>ZULU Urban Metrics</h2>

        <nav className="nav-container">
          <TextButton variant="text" component={Link} to="/">
            Dashboard
          </TextButton>
          <TextButton variant="text" href="https://app.swaggerhub.com/apis/zulu-89f/Zulu_transport_API/1.0.0">
            Swagger API
          </TextButton>
          <Button variant="contained" component={Link} to="/">
            Login
          </Button>
        </nav>
    </header>
  );
};

export default Header;
