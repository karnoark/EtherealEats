import * as Location from 'expo-location';
import { createContext, Dispatch, SetStateAction } from 'react';

// import { Address } from '@/types/common';

export interface AddressContext {
  address: Location.LocationGeocodedAddress[] | null;
  setAddress: Dispatch<
    SetStateAction<Location.LocationGeocodedAddress[] | null>
  >;
}

export const UserReversedGeoCode = createContext<AddressContext | null>(null);
