const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const ASAAS_TOKEN = process.env.ASAAS_TOKEN;
const api = axios.create({
  baseURL: 'https://www.asaas.com/api/v3',
  headers: {
    'access_token': ASAAS_TOKEN,
  },
});
const criarCobranca = async (nome, cpfCnpj, valor) => {
  try {
    const customerResponse = await api.post('/customers', {
      name: nome,
      cpfCnpj: cpfCnpj,
      email: 'cliente@email.com',
    });
    const clienteId = customerResponse.data.id;
    const paymentResponse = await api.post('/payments', {
      customer: clienteId,
      billingType: 'PIX',
      value: valor,
      dueDate: '2025-04-15',
    });
    return paymentResponse.data;
  } catch (error) {
    console.error('Erro ao criar cobrança:', error.response?.data || error.message);
    throw error;
  }
};
module.exports = { criarCobranca };