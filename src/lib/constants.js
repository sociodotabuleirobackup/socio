export const API_ENDPOINTS = {
  ASAAS: {
    BASE_URL: "https://api.asaas.com/v3",
    SPLIT_PAYMENT: "/payments"
  },
  LALAMOVE: {
    BASE_URL: "https://rest.lalamove.com",
    QUOTATION: "/v3/quotation",
    ORDERS: "/v3/orders"
  },
  ZAPSIGN: {
    BASE_URL: "https://api.zapsign.com.br",
    DOCUMENTS: "/api/v1/models"
  }
}

export const PAYMENT_SPLIT = {
  OWNER_SHARE: 0.85,             // 85% para quem locou ou financiamento
  PLATFORM_SHARE: 0.15,          // 15% para a conta da Sócio do Tabuleiro
  LOGISTIC_FEE: 10.00,           // Valor fixo para logística (Lalamove ou outro)
  PLATFORM_FIXED_FEE: 5.00       // R$5,00 para subconta da Sócio do Tabuleiro
}

export const USER_TYPES = {
  RENTER: 'renter',
  OWNER: 'owner',
  ADMIN: 'admin'
}

// ⚠️ Recomendado: mover essa key para .env em produção
export const GOOGLE_MAPS_API_KEY = "AIzaSyD1_SP_0qjllKecO4u0CrKHAFSzUKwYAts"
