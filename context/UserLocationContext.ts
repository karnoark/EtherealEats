import * as Location from 'expo-location';
import { createContext, ReactNode, useContext, useState } from 'react';

// Define the types for location context state and functions
interface LocationContextType {
  // Current location data
  location: Location.LocationObject | null;
  // Function to update location
  setLocation: (location: Location.LocationObject | null) => void;
  // Loading state for location operations
  isLoading: boolean;
  // Error message if location fetch fails
  error: string | null;
  // Function to retry getting location
  retry: () => Promise<void>;
}

// Props type for the context provider component
interface LocationProviderProps {
  children: ReactNode;
}

// Create context with a default value that matches the interface
// We provide meaningful default values and no-op functions to prevent runtime errors
export const UserLocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {
    console.warn(
      'UserLocationContext: setLocation was called before Provider was set up',
    );
  },
  isLoading: false,
  error: null,
  retry: async () => {
    console.warn(
      'UserLocationContext: retry was called before Provider was set up',
    );
  },
});

// Helper hook to ensure context is used within provider
export function useLocationContext(): LocationContextType {
  const context = useContext(UserLocationContext);

  if (context === undefined) {
    throw new Error(
      'useLocationContext must be used within a LocationProvider',
    );
  }

  return context;
}

// Export the provider's name for easier imports
export const { Provider: LocationProvider } = UserLocationContext;
