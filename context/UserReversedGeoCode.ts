import * as Location from 'expo-location';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';

// import { Address } from '@/types/common';

// Define a comprehensive interface for the address context that includes
// loading and error states, similar to the location context
export interface AddressContextType {
  // The current address data
  address: Location.LocationGeocodedAddress[] | null;
  // Function to update the address
  setAddress: (address: Location.LocationGeocodedAddress[] | null) => void;
  // Loading state for address operations
  // isLoading: boolean;
  // Error message if address lookup fails
  // error: string | null;
  // Function to retry getting address
  // retry: () => Promise<void>;
}

// Define props type for the context provider component
interface AddressProviderProps {
  children: ReactNode;
}

// export interface AddressContext {
//   address: Location.LocationGeocodedAddress[] | null;
//   setAddress: Dispatch<
//     SetStateAction<Location.LocationGeocodedAddress[] | null>
//   >;
// }

export const UserReversedGeoCode = createContext<AddressContextType>({
  address: null,
  setAddress: () => {
    console.warn(
      'AddressContext: setAddress was called before Provider was set up',
    );
  },
  // isLoading: false,
  // error: null,
  // retry: async () => {
  // console.warn('AddressContext: retry was called before Provider was set up');
  // },
});

// Create a custom hook to ensure context is used within provider
// This provides better error messages and type safety
export function useAddressContext(): AddressContextType {
  const context = useContext(UserReversedGeoCode);

  if (context === undefined) {
    throw new Error('useAddressContext must be used within an AddressProvider');
  }
  return context;
}

// Export the provider component name for cleaner imports
export const { Provider: AddressProvider } = UserReversedGeoCode;
