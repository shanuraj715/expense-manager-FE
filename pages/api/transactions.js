// client/pages/api/transactions.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
  const { method, query, body } = req;
  console.log(query)
  const { id } = query;
  const period = query.period || body?.period;

  try {
    let response;
    console.log("SHANU API URL", method, period)
    switch (method) {
      case 'GET':
        if (id) {
          response = await axios.get(`${API_URL}/transactions/${id}`);
        } else if (period) {
          // Correct summary endpoint
          response = await axios.get(`${API_URL}/transactions/summary/${period}`);
        } else {
          response = await axios.get(`${API_URL}/transactions`);
        }
        return res.status(200).json(response.data);
      
      case 'POST':
        response = await axios.post(`${API_URL}/transactions`, body);
        return res.status(201).json(response.data);
      
      case 'PUT':
        response = await axios.put(`${API_URL}/transactions/${id}`, body);
        return res.status(200).json(response.data);
      
      case 'DELETE':
        // Correct delete endpoint
        response = await axios.delete(`${API_URL}/transactions/${id}`);
        return res.status(200).json(response.data);
      
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || error.message || 'Internal Server Error';
    return res.status(status).json({ success: false, message });
  }
}