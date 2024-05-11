// ======================================================================
// Entity

export interface Reservation {
  id: string;
  space_id: string;
  availability_id: string;
  status: string;
  start_date: Date;
  end_date: Date;
}

// ======================================================================
// Create DTOs

export interface CreateReservationRequest {
  availability_id: string;
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
  cancel?: boolean;
}

export interface UpdateReservationResponse {
  reservation: Reservation;
}

// ======================================================================
// Chat Entity

export interface ChatMessage {
  id: string;
  sender_id: string;
  message: string;
  created_at: Date;
}

export interface ChatSummary {
  reservation_id: string;
  user_id: string;
  message_id: string;
  message: string;
  created_at: Date;
}

// ======================================================================
// Chat DTOs

export interface CreateChatMessageRequest {
  reservation_id: string;
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
  reservation_id: string;
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
