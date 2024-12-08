import React, { useState } from 'react';
import { Typography, Button, Modal, Box, TextField } from '@mui/material';

const WalletBalance = ({ balance, setBalance }) => {
  const [open, setOpen] = useState(false);
  const [income, setIncome] = useState('');

  const handleAddIncome = () => {
    const incomeAmount = parseInt(income, 10);
    if (incomeAmount > 0) {
      setBalance(incomeAmount);
      setIncome('');
      setOpen(false);
    } else {
      alert('Please enter a valid amount');
    }
  };

  return (
    <div>
      <Typography variant="h5" lineHeight={3} sx={{ color: '#ffffff' }}>
        Wallet Balance :
        <span style={{ color: '#269c17' }}> ₹{balance}</span>
      </Typography>
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        + Add Income
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
            width: 300,
          }}
        >
          <Typography variant="h6" mb={2}>
            Add Balance
          </Typography>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => setOpen(false)} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={handleAddIncome}>
              Add Balance
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default WalletBalance;







