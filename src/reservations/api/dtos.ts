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
