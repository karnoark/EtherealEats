import { createContext } from 'react';

import { Address } from '@/types/common';

export const UserReversedGeoCode = createContext<{
  address: Address | null;
  setAddress: (address: Address) => void;
} | null>(null);
