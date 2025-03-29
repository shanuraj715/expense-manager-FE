// client/components/PaymentMethodIcon.js
import { 
    AccountBalanceWallet as UPI,
    CreditCard as CreditCardIcon,
    Payment as DebitCardIcon,
    AccountBalance as NetBankingIcon,
    Money as CashIcon
  } from '@mui/icons-material';
  
  const PaymentMethodIcon = ({ method }) => {
    switch (method) {
      case 'UPI':
        return <UPI fontSize="small" />;
      case 'Debit Card':
        return <DebitCardIcon fontSize="small" />;
      case 'Credit Card':
        return <CreditCardIcon fontSize="small" />;
      case 'Net Banking':
        return <NetBankingIcon fontSize="small" />;
      case 'Cash':
        return <CashIcon fontSize="small" />;
      default:
        return <UPI fontSize="small" />;
    }
  };
  
  export default PaymentMethodIcon;