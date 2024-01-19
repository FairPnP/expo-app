// ======================================================================
// Dashboard DTOs

export interface ShowDashboardResponse {
  link: string;
}

// ======================================================================
// Validate Account DTOs

export interface ValidateAccountResponse {
  is_valid: boolean;
}

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

// ======================================================================
// Read DTOs

export interface ReadAccountResponse {
  account_id: String;
}
