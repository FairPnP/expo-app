// ======================================================================
// Payment Intent DTOs

export interface CreatePaymentIntentRequest {
  // TODO: replace with space/availability and have the server calculate the amountj
  dest_account: string;
  amount: number;
}

export interface CreatePaymentIntentResponse {
  customer_id: string;
  client_secret: string;
  ephemeral_key: string;
}

