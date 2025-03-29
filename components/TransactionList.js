// client/components/TransactionList.js
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    IconButton, 
    Typography,
    CircularProgress,
    Box,
    Snackbar,
    Alert
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { green, red } from '@mui/material/colors';
  import PaymentMethodIcon from './PaymentMethodIcon';
  import { useState } from 'react';
  
  const TransactionList = ({ transactions, loading, onDelete }) => {
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success'
    });
  
    const handleDelete = async (id) => {
      try {
        await onDelete(id);
        setSnackbar({
          open: true,
          message: 'Transaction deleted successfully',
          severity: 'success'
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to delete transaction',
          severity: 'error'
        });
      }
    };
  
    const handleCloseSnackbar = () => {
      setSnackbar(prev => ({ ...prev, open: false }));
    };
  
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      );
    }
  
    if (transactions.length === 0) {
      return (
        <Typography variant="body1" align="center" my={4}>
          No transactions found. Add one to get started!
        </Typography>
      );
    }
  
    return (
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleString()}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <PaymentMethodIcon method={transaction.paymentMethod} />
                      <Box ml={1}>{transaction.paymentMethod}</Box>
                    </Box>
                  </TableCell>
                  <TableCell 
                    align="right" 
                    sx={{ 
                      color: transaction.type === 'earning' ? green[500] : red[500],
                      fontWeight: 'bold'
                    }}
                  >
                    {transaction.type === 'earning' ? '+' : '-'}
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleDelete(transaction._id)} 
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    );
  };
  
  export default TransactionList;