import React, { useState, useEffect } from 'react';
import WalletBalance from './components/WalletBalance';
import Expenses from './components/ExpenseForm';
import RecentTransactions from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseTrends from './components/ExpenseTrends';
import { Grid, Container, Paper, Box, Typography } from '@mui/material';
import Header from './components/Header';

const App = () => {
  // State for balance and transactions
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('balance');
    return savedBalance ? JSON.parse(savedBalance) : 5000; // Default balance: 5000
  });
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : []; // Default: empty array
  });

  // Save balance and transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Function to add a new transaction (expense)
  const addExpense = (expense) => {
    if (expense.amount > balance) {
      alert('Insufficient balance!');
      return;
    }
    const newTransaction = { ...expense, id: Date.now() }; // Add unique ID to each transaction
    setTransactions((prev) => [...prev, newTransaction]);
    setBalance((prev) => prev - expense.amount);
  };

  // Function to add income
  const addIncome = (income) => {
    setBalance((prev) => prev + income);
  };

  // Function to delete a transaction
  const deleteTransaction = (id) => {
    const transactionToDelete = transactions.find((transaction) => transaction.id === id);
    if (transactionToDelete) {
      setBalance((prev) => prev + transactionToDelete.amount); // Refund the amount to the balance
      setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    }
  };

  const totalExpenses = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  // Function to edit a transaction
  const editTransaction = (id) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id === id);
    if (transactionToEdit) {
      const newTitle = prompt('Enter new title:', transactionToEdit.title) || transactionToEdit.title;
      const newAmount = parseInt(prompt('Enter new amount:', transactionToEdit.amount), 10);

      if (!isNaN(newAmount) && newAmount >= 0) {
        const updatedTransactions = transactions.map((transaction) =>
          transaction.id === id ? { ...transaction, title: newTitle, amount: newAmount } : transaction
        );

        const amountDifference = transactionToEdit.amount - newAmount;
        setBalance((prev) => prev + amountDifference);
        setTransactions(updatedTransactions);
      } else {
        alert('Invalid amount entered!');
      }
    }
  };

  return (
    <>
  {/* <Header /> */}
    <Container
      sx={{
        backgroundColor: '#424242	',
        padding: 3,
        borderRadius: 2,
        color: '#ffffff',
        minHeight: '100vh',
      }}
    >
      {/* First Row */}
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: 4,
          height:180,
          borderRadius:4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            marginRight: 6,
            backgroundColor: '#989898',
            padding: 2,
            color: '#ffffff',
            textAlign: 'center',
            borderRadius:4,
          }}
        >
          <WalletBalance balance={balance} setBalance={addIncome} />
        </Paper>

        <Paper
          elevation={3}
          sx={{
            flex: 1,
            marginRight: 6,
            backgroundColor: '#989898',
            padding: 2,
            color: '#ffffff',
            textAlign: 'center',
            borderRadius:4,
          }}
        >
          <Expenses addExpense={addExpense} />
        </Paper>

        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            padding: 0,
            marginTop:-2,
          }}
        >
          <ExpenseSummary transactions={transactions} />
        </Box>
      </Box> */}
         {/* Header Section */}

        <Header />
      {/* First Row */}
<Paper
  elevation={3}
  sx={{
    backgroundColor: '#585858', // Wrapper background color
    padding: 3,
    borderRadius: 4,
    marginBottom: 4,
  }}
>
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      rowGap: 2,
    }}
  >
    {/* Wallet Balance Section */}
    <Box
      sx={{
        // flex: '1 1 calc(33.333% - 16px)',
        flex:1,
        marginRight: 2,
        marginBottom: 2,
        padding: 4,
        backgroundColor: '#989898', // Section background color
        borderRadius: 2,
        textAlign: 'center',
        color: '#ffffff',
        '@media (max-width: 600px)': {
          flex: '1 1 100%', // Full width on small screens
        },
      }}
    >
      <WalletBalance balance={balance} setBalance={addIncome} />
    </Box>

    {/* Expenses Section */}
    <Box
      sx={{
        // flex: '1 1 calc(33.333% - 16px)',
        flex:1,
        marginRight: 2,
        marginBottom: 2,
        padding: 4,
        backgroundColor: '#9a9a9a', // Section background color
        borderRadius: 2,
        textAlign: 'center',
        color: '#ffffff',
        '@media (max-width: 600px)': {
          flex: '1 1 100%', // Full width on small screens
        },
      }}
    > 
       <Typography variant="h5" lineHeight={3} sx={{ color: '#ffffff' }}>
          Expenses: <span style={{ color: 'orange' }}>₹{totalExpenses}</span>
        </Typography>
      <Expenses addExpense={addExpense} />
    </Box>

    {/* Expense Summary Section */}
    <Box
      sx={{
        // flex: '1 1 calc(33.333% - 16px)',
        flex:1,
        marginBottom: 2,
        padding: 2,
        backgroundColor: '#585858', // Section background color
        borderRadius: 2,
        textAlign: 'center',
        color: '#ffffff',
        '@media (max-width: 600px)': {
          flex: '1 1 100%', // Full width on small screens
        },
      }}
    >
      <ExpenseSummary transactions={transactions} />
    </Box>
  </Box>
</Paper>


      {/* Second Row */}
      <Grid container spacing={4}>
  {/* Recent Transactions Section */}
  <Grid item xs={12} md={8}>
    <Typography
      variant="h6"
      fontWeight={600}
      sx={{
        color: '#ffffff',
        marginBottom: 1,
        textAlign: 'left',
        marginLeft: '16px', // Adjust this based on your design
      }}
    >
      Recent Transactions
    </Typography>
    <Paper
      elevation={3}
      sx={{
        backgroundColor: '#fff',
        padding: 2,
        color: '#000',
        textAlign: 'center',
        height: '80%',
      }}
    >
      <RecentTransactions
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
    </Paper>
  </Grid>

  {/* Expense Trends Section */}
  <Grid item xs={12} md={4}>
    <Typography
      variant="h6"
      fontWeight={600}
      sx={{
        color: '#ffffff',
        marginBottom: 1,
        textAlign: 'left',
        marginLeft: '16px', // Adjust this based on your design
      }}
    >
      Top Expenses
    </Typography>
    <Paper
      elevation={3}
      sx={{
        backgroundColor: '#fff',
        padding: 2,
        color: '#000',
        textAlign: 'center',
        height: '80%',
      }}
    >
      <ExpenseTrends expenses={transactions} />
    </Paper>
  </Grid>
</Grid>

    </Container>
    </>
  );
};

export default App;





