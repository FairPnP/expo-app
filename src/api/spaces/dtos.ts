// ======================================================================
// Entity

export interface Space {
  id: number;
  user_id: string;
  building_id: number;
  name: string;
  description?: string;
  max_vehicle_size: string;
  coverage: string;
  height_clearance_cm?: number;
  access_restrictions?: string;
  parking_instructions?: string;
  img_urls?: string[];
}

// ======================================================================
// Create DTOs

export interface CreateSpaceRequest {
  building_id: number;
  name: string;
  description?: string;
  max_vehicle_size: string;
  coverage: string;
  height_clearance_cm?: number;
  access_restrictions?: string;
  parking_instructions?: string;
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
  max_vehicle_size?: string;
  coverage?: string;
  height_clearance_cm?: number;
  access_restrictions?: string;
  parking_instructions?: string;
}

export interface UpdateSpaceResponse {
  space: Space;
}

// ======================================================================
// Presigned URL DTOs

export interface PresignedUrl {
  space_image_id: number;
  slot_id: number;
  presigned_url: string;
}

export interface CreatePresignedUrlsResponse {
  data: PresignedUrl[];
}
