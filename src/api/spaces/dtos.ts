// ======================================================================
// Entity

export interface Space {
  id: string;
  user_id: string;
  building_id: string;
  name: string;
  description: string;
  img_urls?: string[];
}

// ======================================================================
// Create DTOs

export interface CreateSpaceRequest {
  place_id: string;
  name: string;
  description: string;
}

export interface CreateSpaceResponse {
  space: Space;
}

// ======================================================================
// Read DTOs

export interface ReadSpaceResponse {
  space: Space;
}

// ======================================================================
// List DTOs

export interface ListSpacesParams {
  offset_id?: number;
  limit?: number;
  building_id?: number;
  user?: boolean;
}

export interface ListSpacesResponse {
  spaces: Space[];
  next_offset_id?: number;
  limit: number;
}

// ======================================================================
// Update DTOs

export interface UpdateSpaceRequest {
  name?: string;
  description?: string;
}

export interface UpdateSpaceResponse {
  space: Space;
}
