import { useState } from 'react';
import { signIn } from '../assets/auth';
import {
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';

export default function SignInForm({ onSuccess, showSnackBar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (!email || !password) {
      showSnackBar('Please enter email and password!', 'warning');
      return;
    }

    try {
      const token = await signIn(email, password);
      setLoading(false);
      showSnackBar('Logged in successfully!', 'success');
      setTimeout(() => {
        onSuccess(email);
      }, 140);
    } catch (err) {
      showSnackBar(err.message, 'error');
    }
  };

  return (
    <>
      <Typography variant="body1" gutterBottom sx={{ mb: 1.5 }}>
        {'Please sign in using your email and password'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" fullWidth loading={loading}>
            Sign In
          </Button>
        </Stack>
      </form>
    </>
  );
}
