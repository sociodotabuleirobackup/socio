import { API_ENDPOINTS, PAYMENT_SPLIT } from './constants';  // Caminho relativo ao mesmo diretório


const isDev = process.env.NODE_ENV !== 'production'

/**
 * Helper para calcular o split de pagamento.
 */
export function getSplitArray(amount, wallets) {
  const ownerAmount = Number((amount * PAYMENT_SPLIT.OWNER_SHARE).toFixed(2))
  const platformAmount = Number((amount * PAYMENT_SPLIT.PLATFORM_SHARE).toFixed(2))
  const logisticFee = Number(wallets.logisticFee || PAYMENT_SPLIT.LOGISTIC_FEE)
  const platformFixed = Number(PAYMENT_SPLIT.PLATFORM_FIXED_FEE)

  return [
    {
      walletId: wallets.sellerWalletId,
      fixedValue: ownerAmount
    },
    {
      walletId: wallets.logisticWalletId,
      fixedValue: logisticFee
    },
    {
      walletId: wallets.socioWalletId,
      fixedValue: platformAmount
    },
    {
      walletId: wallets.socioFixoWalletId,
      fixedValue: platformFixed
    }
  ]
}

/**
 * Envia requisição real para o Asaas.
 */
export async function createPayment({ customer, amount, description, wallets }) {
  try {
    const response = await fetch(`${API_ENDPOINTS.ASAAS.BASE_URL}${API_ENDPOINTS.ASAAS.SPLIT_PAYMENT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: process.env.ASAAS_API_KEY
      },
      body: JSON.stringify({
        customer: customer.id,
        billingType: 'CREDIT_CARD',
        value: amount,
        description,
        split: getSplitArray(amount, wallets)
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.description || data.message || 'Erro ao processar pagamento')
    }

    return data
  } catch (error) {
    console.error('❌ Erro na integração Asaas:', error.message)
    throw error
  }
}

/**
 * Mock para simulação de pagamentos em dev/sandbox.
 */
export async function mockCreatePayment({ customer, amount, description, wallets }) {
  console.log('🔁 [Mock] Simulando pagamento com os dados:')
  console.table({
    customerId: customer.id,
    amount,
    description,
    split: getSplitArray(amount, wallets)
  })

  await new Promise(res => setTimeout(res, 1000))

  return {
    id: 'mocked_payment_id_12345',
    status: 'MOCKED_SUCCESS',
    value: amount,
    customer: customer.id,
    split: getSplitArray(amount, wallets),
    createdAt: new Date().toISOString()
  }
}

/**
 * Wrapper inteligente que escolhe real ou mock.
 */
export async function createPaymentWithEnvSwitch(params) {
  if (isDev) {
    return await mockCreatePayment(params)
  } else {
    return await createPayment(params)
  }
}
