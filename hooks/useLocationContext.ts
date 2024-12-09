import { useContext } from 'react';

import { UserLocationContext } from '@/context/UserLocationContext';

const useLocationContext = () => {
  const context = useContext(UserLocationContext);
  if (!context) {
    throw new Error(
      'useLocationContext must be used within LocationProvider. ' +
        'Maybe you fogot to wrap your app with <LocationProvider>?',
    );
  }
  return context;
};

export default useLocationContext;
