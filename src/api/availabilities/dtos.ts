// ======================================================================
// Entity

import {Building} from '../buildings';

export interface Availability {
  id: string;
  space_id: string;
  start_date: Date;
  end_date: Date;
  price: number;
}

// ======================================================================
// Create DTOs

export interface CreateAvailabilityRequest {
  space_id: string;
  start_date: string;
  end_date: string;
  price: number;
}

export interface CreateAvailabilityResponse {
  availability: Availability;
}

// ======================================================================
// Read DTOs

export interface ReadAvailabilityResponse {
  availability: Availability;
}

// ======================================================================
// List DTOs

export interface ListAvailabilityParams {
  offset_id?: string;
  limit?: number;
  user?: boolean;
  space_id?: string;
}

export interface ListAvailabilityResponse {
  availability: Availability[];
  next_offset_id?: number;
  limit: number;
}

// ======================================================================
// Update DTOs

export interface UpdateAvailabilityRequest {
  start_date?: string;
  end_date?: string;
  price?: number;
}

export interface UpdateAvailabilityResponse {
  availability: Availability;
}

// ======================================================================
// Search DTOs

export interface SearchAvailabilityRequest {
  start_date: string;
  end_date: string;
  latitude: number;
  longitude: number;
  lat_delta: number;
  long_delta: number;
}

export interface SpaceResult {
  id: string;
  building_id: string;
}

export interface SearchAvailabilityResponse {
  buildings: Building[];
  spaces: SpaceResult[];
  availabilities: Availability[];
}
