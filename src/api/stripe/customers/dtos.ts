// ======================================================================
// Payment Intent DTOs

export interface CreatePaymentIntentRequest {
  amount: number;
}

export interface CreatePaymentIntentResponse {
  customer_id: string;
  client_secret: string;
  ephemeral_key: string;
}
