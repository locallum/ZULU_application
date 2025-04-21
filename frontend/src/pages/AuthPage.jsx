import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';
import VerifyCodeForm from '../components/VerifyCodeForm';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'

export default function AuthPage() {
  const [mode, setMode] = useState('signin'); // 'signup' or 'signin'
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleVerified = () => {
    setMode('signin');
    navigate('/explorer');
  };

  const handleRegistered = () => {
    setShowVerification(false);
    setMode('signin');
    navigate('/login');
  };

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          backgroundColor: '#f0f2f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: isMobile ? '90%' : '800px',
            minHeight: '500px',
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          {/* Left side: Forms */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom>
              {showVerification
                ? 'Verify Email'
                : mode === 'signup'
                ? 'Create an Account'
                : 'Welcome Back'}
            </Typography>

            {!showVerification ? (
              mode === 'signup' ? (
                <>
                  <SignUpForm
                    onSuccess={(email, username) => {
                      setEmail(email);
                      setUsername(username);
                      setShowVerification(true);
                    }}
                  />
                  <Button onClick={() => setMode('signin')} sx={{ mt: 2 }}>
                    Already have an account? Sign In
                  </Button>
                </>
              ) : (
                <>
                  <SignInForm
                    onSuccess={(email) => {
                      setEmail(email);
                      handleVerified();
                    }}
                  />
                  <Button onClick={() => setMode('signup')} sx={{ mt: 2 }}>
                    Don't have an account? Sign Up
                  </Button>
                </>
              )
            ) : (
              <VerifyCodeForm email={email} username={username} onSuccess={handleRegistered} />
            )}
          </Box>

          {/* Right side: Image */}
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(${logo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: isMobile ? 'none' : 'block',
            }}
          />
        </Paper>
      </Box>
    </>
  );
}
