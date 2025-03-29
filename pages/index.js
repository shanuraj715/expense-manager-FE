// client/pages/index.js
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionList from "../components/TransactionList";
import SummaryChart from "../components/SummaryChart";

// client/pages/index.js
// ... (previous imports remain the same)

const fetchTransactions = async () => {
  try {
    const res = await axios.get("/api/transactions");
    setTransactions(res.data);
    setLoading(false);
  } catch (err) {
    console.error("Fetch transactions error:", err);
    setLoading(false);
  }
};

const fetchSummaryData = async () => {
  try {
    const res = await axios.get(`/api/transactions?period=${period}`);
    setSummaryData(res.data);
  } catch (err) {
    console.error("Fetch summary error:", err);
  }
};

const handleDeleteTransaction = async id => {
  try {
    await axios.delete(`/api/transactions?id=${id}`);
    setTransactions(transactions.filter(transaction => transaction._id !== id));
    fetchSummaryData();
    return true;
  } catch (err) {
    console.error("Delete error:", err);
    throw err;
  }
};

// ... (rest of the component remains the same)

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [period, setPeriod] = useState("week");
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/api/transactions");
      setTransactions(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchSummaryData = async () => {
    try {
      // Pass period as a query parameter
      const res = await axios.get(`/api/transactions`, {
        params: { period }
      });
      setSummaryData(res.data);
    } catch (err) {
      console.error("Fetch summary error:", err);
    }
  };

  useEffect(
    () => {
      fetchTransactions();
      fetchSummaryData();
    },
    [period]
  );

  const handleAddTransaction = newTransaction => {
    setTransactions([newTransaction, ...transactions]);
    fetchSummaryData();
  };

  const handleDeleteTransaction = async id => {
    try {
      await axios.delete(`/api/transactions/?id=${id}`);
      setTransactions(
        transactions.filter(transaction => transaction._id !== id)
      );
      fetchSummaryData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Expense Tracker
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8} className="summary-chart">
            <Paper sx={{ p: 2 }}>
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="period-select-label">View Summary</InputLabel>
                  <Select
                    labelId="period-select-label"
                    value={period}
                    label="View Summary"
                    onChange={e => setPeriod(e.target.value)}
                  >
                    <MenuItem value="day">Daily</MenuItem>
                    <MenuItem value="week">Weekly</MenuItem>
                    <MenuItem value="month">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <SummaryChart data={summaryData} period={period} />
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={0} mb={3}>
          <Grid item xs={12} md={12} className="summary-chart">
            <Paper sx={{ p: 2 }}>
              <AddTransactionForm onAddTransaction={handleAddTransaction} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {/* <Grid item xs={12}> */}
            {/* <Paper sx={{ p: 2 }}> */}
              <TransactionList
                transactions={transactions}
                loading={loading}
                onDelete={handleDeleteTransaction}
              />
            {/* </Paper> */}
          {/* </Grid> */}
        </Grid>
      </Box>
    </Container>
  );
}
