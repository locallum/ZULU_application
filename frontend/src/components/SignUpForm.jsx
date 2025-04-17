import { useState } from 'react';
import { signUp } from '../assets/auth';
import {
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';

export default function SignUpForm({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'error' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      setSnack({ open: true, message: 'Please enter username, email and password!', severity: 'warning' });
      return;
    }

    try {
      await signUp(username, email, password);
      setSnack({ open: true, message: 'Sign up successful! Check your email.', severity: 'success' });
      onSuccess(email, username);
    } catch (err) {
      setSnack({ open: true, message: err.message, severity: 'error' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              fullWidth
              required
            />
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
          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
        </Stack>
      </form>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </>
  );
}