import React, { useState } from 'react';
import { Typography, Button, Modal, Box, TextField, MenuItem } from '@mui/material';

const Expenses = ({ addExpense }) => {
  const [open, setOpen] = useState(false);
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    category: '',
  });

  const handleAddExpense = () => {
    if (expense.title && expense.amount > 0 && expense.category) {
      addExpense({ ...expense, amount: parseInt(expense.amount, 10) });
      setExpense({ title: '', amount: '', category: '' });
      setOpen(false);
    } else {
      alert('Please fill all the fields correctly');
    }
  };

  return (
    <div>
      <Typography variant="h5" lineHeight={3} sx={{ color: '#ffffff' }}>
        
      </Typography>
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>
        + Add Expense
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
            Add Expense
          </Typography>
          <TextField
            label="Title"
            fullWidth
            value={expense.title}
            onChange={(e) => setExpense({ ...expense, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Category"
            select
            fullWidth
            value={expense.category}
            onChange={(e) => setExpense({ ...expense, category: e.target.value })}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => setOpen(false)} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleAddExpense}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Expenses;






