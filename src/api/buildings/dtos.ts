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
