// ======================================================================
// Entity

export interface Reservation {
  id: number;
  space_id: number;
  start_date: Date;
  end_date: Date;
}

// ======================================================================
// Create DTOs

export interface CreateReservationRequest {
  space_id: number;
  start_date: string;
  end_date: string;
}

export interface CreateReservationResponse {
  reservation: Reservation;
}

// ======================================================================
// Read DTOs

export interface ReadReservationResponse {
  reservation: Reservation;
}

// ======================================================================
// List DTOs

export interface ListReservationsParams {
  offset_id?: number;
  limit?: number;
  space_id?: number;
  user?: boolean;
}

export interface ListHostReservationsParams {
  offset_id?: number;
  limit?: number;
}

export interface ListReservationsResponse {
  reservations: Reservation[];
  next_offset_id?: number;
  limit: number;
}

// ======================================================================
// Update DTOs

export interface UpdateReservationRequest {
  start_date?: string;
  end_date?: string;
}

export interface UpdateReservationResponse {
  reservation: Reservation;
}

// ======================================================================
// Chat Entity

export interface ChatMessage {
  id: number;
  sender_id: string;
  message: string;
  created_at: Date;
}

export interface ChatSummary {
  reservation_id: number;
  user_id: string;
  message_id: number;
  message: string;
  created_at: Date;
}

// ======================================================================
// Chat DTOs

export interface CreateChatMessageRequest {
  reservation_id: number;
  message: string;
}

export interface CreateChatMessageResponse {
  message: ChatMessage;
}

export interface ListChatMessagesParams {
  before_id?: number;
  after_id?: number;
  limit?: number;
}

export interface ListChatMessagesResponse {
  messages: ChatMessage[];
  reservation_id: number;
  next_offset_id?: number;
  limit: number;
}

// ======================================================================
// Conversation DTOs

export interface ListConversationsParams {
  offset_id?: number;
  limit?: number;
}

export interface ListConversationsResponse {
  conversations: ChatSummary[];
  next_offset_id?: number;
  limit: number;
}
