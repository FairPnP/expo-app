import {Building} from '@/buildings';

export * from './ManageSpotScreen';
export * from './EditParkingSpaceScreen';
// export * from './ViewParkingSpaceScreen';

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
