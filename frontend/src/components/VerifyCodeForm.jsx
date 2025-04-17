import { useState, useRef } from 'react';
import { confirmSignUp } from '../assets/auth';
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';

export default function VerifyCodeForm({ email, onSuccess }) {
  const [code, setCode] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'error' });

  const handleChange = (i, val) => {
    const newCode = [...code];
    newCode[i] = val.slice(-1);
    setCode(newCode);
    if (val && i < 5) inputsRef.current[i + 1].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setSnack({ open: true, message: 'Please enter all 6 digits.', severity: 'warning' });
      return;
    }

    try {
      await confirmSignUp(email, fullCode);
      setSnack({ open: true, message: 'Verification successful!', severity: 'success' });
      onSuccess();
    } catch (err) {
      setSnack({ open: true, message: err.message, severity: 'error' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between" gap={1}>
            {code.map((digit, i) => (
              <input
                key={i}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                ref={(el) => (inputsRef.current[i] = el)}
                maxLength={1}
                style={{
                  width: '40px',
                  height: '50px',
                  fontSize: '24px',
                  textAlign: 'center',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              />
            ))}
          </Box>

          <Button type="submit" variant="contained" fullWidth>
            Verify Code
          </Button>
        </Stack>
      </form>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </>
  );
}
