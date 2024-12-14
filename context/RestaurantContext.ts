import { createContext, useContext } from 'react';

import { Restaurant } from '@/constants/uidata';

export interface RestaurantContextType {
  restaurantObj: Restaurant | null;
  setRestaurantObj: React.Dispatch<React.SetStateAction<Restaurant | null>>;
}

const RestaurantContext = createContext<RestaurantContextType>({
  restaurantObj: null,
  setRestaurantObj: () => {
    console.warn(
      'RestaurantContext: setRestaurantObj was called before Provider was set up',
    );
  },
});

export function useRestaurantContext() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error(
      'useRestaurantContext must be used within a RestaurantProvider',
    );
  }
  return context;
}

export const { Provider: RestaurantProvider } = RestaurantContext;
