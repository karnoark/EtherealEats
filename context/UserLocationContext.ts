import * as Location from 'expo-location';
import { createContext, ReactNode, useState } from 'react';

// Define the types
type LocationContextType = {
  location: Location.LocationObject | null;
  setLocation: (location: Location.LocationObject | null) => void;
};

// Create the context
export const UserLocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {}, // No-op default
});
