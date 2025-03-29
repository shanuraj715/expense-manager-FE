// client/components/SummaryChart.js
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SummaryChart = ({ data, period }) => {
  const chartData = useMemo(() => {
    const labels = data.map(item => item._id);
    const expenses = data.map(item => item.totalExpenses);
    const earnings = data.map(item => item.totalEarnings);

    return {
      labels,
      datasets: [
        {
          label: 'Expenses',
          data: expenses,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1,
          fill: true
        },
        {
          label: 'Earnings',
          data: earnings,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.1,
          fill: true
        }
      ]
    };
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: period === 'day' ? 'Today' : period === 'week' ? 'Last 7 Days' : 'Last 30 Days',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default SummaryChart;