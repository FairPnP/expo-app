import type {Building} from '@/buildings';

export type ParkingSpaceViewData = {
  building: Building;
  name: string;
  description: string;
  picture: string;
  max_vehicle_size: string;
  indoor: boolean;
  height_clearance?: number;
  access_restriction?: string;
  parking_instructions: string;
};
