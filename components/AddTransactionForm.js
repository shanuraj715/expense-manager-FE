// client/components/AddTransactionForm.js
import { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Grid
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense",
    paymentMethod: "UPI",
    category: "Other",
    date: new Date()
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = date => {
    setFormData({
      ...formData,
      date
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/transactions", {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      onAddTransaction(res.data);
      setFormData({
        description: "",
        amount: "",
        type: "expense",
        paymentMethod: "UPI",
        category: "Other",
        date: new Date()
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Add New Transaction
      </Typography>

      <Grid container spacing={2} mb={2} width={"100%"}>
        
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
          />

      </Grid>
      <Grid container spacing={2} mb={2}>
        {/* <Grid item xs={12}> */}
          <FormControl component="fieldset">
            <Typography variant="subtitle1" gutterBottom>
              Type
            </Typography>
            <RadioGroup
              row
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
              />
              <FormControlLabel
                value="earning"
                control={<Radio />}
                label="Earning"
              />
            </RadioGroup>
          </FormControl>
        {/* </Grid> */}
      </Grid>
      <Grid container spacing={2} mb={2}>
        {/* <Grid item xs={12} sm={6}> */}
          <FormControl fullWidth>
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              label="Payment Method"
              required
            >
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="Debit Card">Debit Card</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Net Banking">Net Banking</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
            </Select>
          </FormControl>
        {/* </Grid> */}

        {/* <Grid item xs={12} sm={6}> */}
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
              required
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Bills">Bills</MenuItem>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        {/* </Grid> */}
        </Grid>
        <Grid container spacing={2} mb={2}>
        {/* <Grid item xs={12}> */}
        <div style={{width: "inherit"}}>
          <Typography variant="subtitle1" gutterBottom>
            Date
          </Typography>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="date-picker"
            sx={{ width: "100% " }}
          />
        {/* </Grid> */}
        </div>
        </Grid>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Transaction
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTransactionForm;
