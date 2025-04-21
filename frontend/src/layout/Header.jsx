import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Custom styling for nav text buttons
const TextButton = styled(Button)({
  color: "white",
  "&:hover": {
    backgroundColor: "#177be0",
  },
});

/**
 * The header component contains a navigation bar with a login button.
 */
const Header = () => {
  return (
    <header className="header-container">
        <h2>ZULU Urban Metrics</h2>

        <nav className="flex-row">
          <TextButton variant="text" component={Link} to="/">
            Home
          </TextButton>
          <TextButton variant="text" component={Link} to="/explorer">
            Suburb Explorer
          </TextButton>
          <TextButton variant="text" href="https://app.swaggerhub.com/apis/zulu-89f/Zulu_transport_API/1.0.0">
            APIs
          </TextButton>
          <Button variant="contained" component={Link} to="/register">
            Register
          </Button>
          <Button variant="contained" component={Link} to="/login">
            Login
          </Button>
        </nav>
    </header>
  );
};

export default Header;
