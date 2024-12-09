import { useContext } from 'react';

import { UserReversedGeoCode } from '@/context/UserReversedGeoCode';

const useReversedGeoCodeContext = () => {
  const context = useContext(UserReversedGeoCode);

  if (!context) {
    throw new Error(
      'useLocationContext must be used within LocationProvider. ' +
        'Maybe you fogot to wrap your app with <LocationProvider>?',
    );
  }
  return context;
};

export default useReversedGeoCodeContext;
