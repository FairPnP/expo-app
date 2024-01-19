// ======================================================================
// Entity

export interface Building {
  id: number;
  name: string;
  place_id: string;
  latitude: number;
  longitude: number;
}

// ======================================================================
// Create DTOs

export interface CreateBuildingRequest {
  name: string;
  place_id: string;
  latitude: number;
  longitude: number;
}

export interface CreateBuildingResponse {
  building: Building;
}

// ======================================================================
// Read DTOs

export interface ReadBuildingResponse {
  building: Building;
}

export interface ListBuildingsParams {
  offset_id?: number;
  limit?: number;
  place_id?: string;
  ids?: number[];
}

export interface ListBuildingsResponse {
  buildings: Building[];
  next_offset_id?: number;
  limit: number;
}

// ======================================================================
// Update DTOs

export interface UpdateBuildingRequest {
  name?: string;
  place_id?: string;
  latitude?: string;
  longitude?: string;
}

export interface UpdateBuildingResponse {
  building: Building;
}
