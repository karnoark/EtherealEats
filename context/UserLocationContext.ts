import * as Location from 'expo-location';
import { createContext } from 'react';
export const UserLocationContext = createContext<{
  location: Location.LocationObject | undefined;
  setLocation: (location: Location.LocationObject | undefined) => void;
} | null>(null);
