const express = require('express');
const { criarCobranca } = require('./asaas');
const { createOrder } = require('./lalamove');
const router = express.Router();

// Asaas Routes
router.post('/asaas/create-charge', async (req, res) => {
  try {
    const { name, cpfCnpj, value } = req.body;
    const cobranca = await criarCobranca(name, cpfCnpj, value);
    res.json(cobranca);
  } catch (error) {
    console.error('Erro ao criar cobrança:', error);
    res.status(500).json({ erro: 'Erro ao criar cobrança' });
  }
});

// Lalamove Routes
router.post('/lalamove/create-order', async (req, res) => {
  try {
    const order = await createOrder();
    res.status(201).json(order);
  } catch (error) {
    console.error('Erro ao criar ordem de entrega:', error);
    res.status(500).json({ erro: 'Erro ao criar ordem de entrega' });
  }
});

// Basic Route
router.get('/', (req, res) => {
  res.send('Api is running');
});

// User Routes
router.get('/users', (req, res) => {
  res.send('Returns all users');
});

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Returns user with ID: ${userId}`);
});

router.post('/users', (req, res) => {
  res.send('Creates a new user');
});

router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Updates user with ID: ${userId}`);
});

router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Deletes user with ID: ${userId}`);
});

router.post('/login', (req, res) => {
  res.send('Logs in a user');
});

router.post('/register', (req, res) => {
  res.send('Registers a new user');
});

router.post('/reset-password', (req, res) => {
  res.send('Resets a user\'s password');
});

// Page Routes
router.get('/terms', (req, res) => {
  res.send('Returns the terms of use');
});

// Marketplace Routes
router.get('/marketplace', (req, res) => {
  res.send('Returns all products from the marketplace');
});

router.get('/marketplace/:id', (req, res) => {
  const productId = req.params.id;
  res.send(`Returns product with ID: ${productId}`);
});

router.post('/marketplace', (req, res) => {
  res.send('Creates a new product in the marketplace');
});

router.put('/marketplace/:id', (req, res) => {
  const productId = req.params.id;
  res.send(`Updates product with ID: ${productId}`);
});

router.delete('/marketplace/:id', (req, res) => {
  const productId = req.params.id;
  res.send(`Deletes product with ID: ${productId}`);
});

// Crowdfunding Routes
router.post('/crowdfunding/create', (req, res) => {
  res.send('Creates a new crowdfunding campaign');
});

router.get('/crowdfunding', (req, res) => {
  res.send('Returns all crowdfunding campaigns');
});

router.get('/crowdfunding/:id', (req, res) => {
  const campaignId = req.params.id;
  res.send(`Returns crowdfunding campaign with ID: ${campaignId}`);
});

router.put('/crowdfunding/:id', (req, res) => {
  const campaignId = req.params.id;
  res.send(`Updates crowdfunding campaign with ID: ${campaignId}`);
});

router.delete('/crowdfunding/:id', (req, res) => {
  const campaignId = req.params.id;
  res.send(`Deletes crowdfunding campaign with ID: ${campaignId}`);
});

// Other Routes
router.get('/profile', (req, res) => {
  res.send('Returns the user profile');
});

router.get('/dashboard', (req, res) => {
  res.send('Returns the user dashboard');
});

router.get('/admin/*', (req, res) => {
  res.send('Returns the admin panel');
});

router.get('/store/dashboard', (req, res) => {
  res.send('Returns the store dashboard');
});

module.exports = router;
