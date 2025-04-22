import { useState, useRef } from 'react';
import { confirmSignUp } from '../assets/auth';
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Stack,
  Typography,
} from '@mui/material';

export default function VerifyCodeForm({ email, username, onSuccess, showSnackBar }) {
  const [code, setCode] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  // const [snack, setSnack] = useState({ open: false, message: '', severity: 'error' });

  const handleChange = (i, val) => {
    const newCode = [...code];
    newCode[i] = val.slice(-1);
    setCode(newCode);
    if (val && i < 5) inputsRef.current[i + 1].focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pastedData)) return;
  
    const newCode = pastedData.split('');
    setCode(newCode);
  
    newCode.forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = digit;
      }
    });
  
    if (inputsRef.current[5]) inputsRef.current[5].focus();
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      showSnackBar('Please enter all 6 digits', 'warning');
      return;
    }

    try {
      await confirmSignUp(email, username, fullCode);
      showSnackBar('Email verification successful!', 'success');
      setTimeout(() => {
        onSuccess();
      }, 100);
    } catch (err) {
      showSnackBar(err.message, 'error');
    }
  };

  return (
    <>
      <Typography variant="body1" gutterBottom sx={{ mb: 1.5 }}>
        {'Please enter the 6-digit code from your provided email to verify your account'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between" gap={1}>
            {code.map((digit, i) => (
              <input
                key={i}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onPaste={(e) => handlePaste(e)}
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

      {/* <Snackbar 
        open={snack.open} 
        autoHideDuration={4000} 
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar> */}
    </>
  );
}
