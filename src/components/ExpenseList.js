import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, Typography, IconButton, Box } from '@mui/material';
import { Delete, Edit, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { FaPizzaSlice, FaCar, FaFilm } from 'react-icons/fa';

const RecentTransactions = ({ transactions, deleteTransaction, editTransaction }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 3;

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  // Get the corresponding icon for the category
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food':
        return <FaPizzaSlice style={{ color: '#ff9800', marginRight: 10 }} />;
      case 'Transport':
        return <FaCar style={{ color: '#3f51b5', marginRight: 10 }} />;
      case 'Entertainment':
        return <FaFilm style={{ color: '#9c27b0', marginRight: 10 }} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* <Typography variant="h6" fontWeight={600} sx={{ color: '#000', marginBottom: 2 }}>
        Recent Transactions
      </Typography> */}
      <List>
        {currentTransactions.map((transaction) => (
          <React.Fragment key={transaction.id}>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* Category Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {getCategoryIcon(transaction.category)}
                <ListItemText
                  primary={transaction.title}
                  secondary={`₹${transaction.amount} - ${transaction.category}`}
                />
              </Box>

              {/* Edit and Delete Icons */}
              <Box>
                <IconButton onClick={() => editTransaction(transaction.id)}>
                  <Edit sx={{ color: '#000' }} />
                </IconButton>
                <IconButton onClick={() => deleteTransaction(transaction.id)}>
                  <Delete sx={{ color: '#ff0000' }} />
                </IconButton>
              </Box>
            </ListItem>
            <Divider sx={{ backgroundColor: '#cccccc' }} />
          </React.Fragment>
        ))}
      </List>

      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <IconButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          sx={{
            color: currentPage === 1 ? '#cccccc' : '#000',
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <Box
          sx={{
            width: 40,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #cccccc',
            borderRadius: 4,
            margin: '0 10px',
            color: '#000',
            fontWeight: 'bold',
          }}
        >
          {currentPage}
        </Box>
        <IconButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          sx={{
            color: currentPage === totalPages ? '#cccccc' : '#000',
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </div>
  );
};

export default RecentTransactions;







