// ======================================================================
// Entity

import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";

export interface Building {
  id: number;
  name: string;
  place_id: string;
  latitude: number;
  longitude: number;
  street_number: string;
  street_name: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

// ======================================================================
// Create DTOs

export interface CreateBuildingRequest {
  name: string;
  place_id: string;
  latitude: number;
  longitude: number;
  street_number: string;
  street_name: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface CreateBuildingResponse {
  building: Building;
}

export function toBuildingData(data: GooglePlaceData, detail: GooglePlaceDetail): CreateBuildingRequest {
  let building = {
    name: detail.name,
    place_id: data.place_id,
    latitude: detail.geometry.location.lat,
    longitude: detail.geometry.location.lng,
  } as any;

  detail.address_components.forEach(component => {
    // Check the types to determine the component type
    if (component.types.includes('street_number')) {
      building.street_number = component.long_name;
    } else if (component.types.includes('route')) {
      building.street_name = component.long_name;
    } else if (component.types.includes('locality') || component.types.includes('sublocality')) {
      building.city = component.long_name;
    } else if (component.types.includes('administrative_area_level_1')) {
      building.state = component.long_name;
    } else if (component.types.includes('country')) {
      building.country = component.long_name;
    } else if (component.types.includes('postal_code')) {
      building.postal_code = component.long_name;
    }
  });

  return building;
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
