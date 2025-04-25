const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota que cria uma cobrança na Asaas
app.post("/criar-cobranca", async (req, res) => {
  try {
    const { nome, cpfCnpj, valor } = req.body;

    const response = await axios.post("https://www.asaas.com/api/v3/customers", {
      name: nome,
      cpfCnpj: cpfCnpj,
      email: "cliente@email.com"
    }, {
      headers: {
        access_token: process.env.ASAAS_TOKEN
      }
    });

    const clienteId = response.data.id;

    const cobranca = await axios.post("https://www.asaas.com/api/v3/payments", {
      customer: clienteId,
      billingType: "PIX",
      value: valor,
      dueDate: "2025-04-15"
    }, {
      headers: {
        access_token: process.env.ASAAS_TOKEN
      }
    });

    res.json(cobranca.data);
  } catch (error) {
    console.error("Erro ao criar cobrança:", error.response?.data || error.message);
    res.status(500).json({ erro: "Erro ao criar cobrança" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
