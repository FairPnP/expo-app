// ======================================================================
// Entity

import {Building} from '../buildings';

export interface Availability {
  id: number;
  space_id: number;
  start_date: Date;
  end_date: Date;
  hourly_rate: number;
}

// ======================================================================
// Create DTOs

export interface CreateAvailabilityRequest {
  space_id: number;
  start_date: string;
  end_date: string;
  hourly_rate: number;
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
  offset_id?: number;
  limit?: number;
  user?: boolean;
  space_id?: number;
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
  hourly_rate?: number;
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
  id: number;
  building_id: number;
}

export interface SearchAvailabilityResponse {
  buildings: Building[];
  spaces: SpaceResult[];
  availabilities: Availability[];
}
